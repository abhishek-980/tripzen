const {
  default: makeWASocket,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  fetchLatestBaileysVersion,
  Browsers,
  delay,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const SESSION_DIR = path.join(__dirname, '..', 'data', 'auth_info_baileys');
const BACKUP_SESSION_DIR = path.join(__dirname, '..', 'data', 'whatsapp_session_backup');

let sock = null;
let connectionState = 'disconnected'; // 'disconnected' | 'connecting' | 'pairing' | 'connected'
let currentPairingCode = '';
let pairingCodeTimestamp = 0;
let currentQrDataUrl = '';
let linkedPhoneNumber = '918920632874';
let targetPhoneNumber = process.env.TRIPZEN_OFFICIAL_WHATSAPP || '+91 89206 32874';
let isInitializing = false;
let reconnectTimeout = null;

function getCleanPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 10) return '91' + digits;
  return digits;
}

function isSessionRegistered() {
  const credsPath = path.join(SESSION_DIR, 'creds.json');
  if (fs.existsSync(credsPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
      if (data && data.registered === true) return true;
    } catch (e) {}
  }
  const backupCredsPath = path.join(BACKUP_SESSION_DIR, 'creds.json');
  if (fs.existsSync(backupCredsPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(backupCredsPath, 'utf8'));
      if (data && data.registered === true) return true;
    } catch (e) {}
  }
  return sock?.authState?.creds?.registered === true;
}

// Ensure session directory and restore from persistent backup if needed
function ensureSessionDir() {
  if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_SESSION_DIR)) {
    fs.mkdirSync(BACKUP_SESSION_DIR, { recursive: true });
  }

  const credsPath = path.join(SESSION_DIR, 'creds.json');
  const backupCredsPath = path.join(BACKUP_SESSION_DIR, 'creds.json');

  // Restore creds.json from backup if missing in main session
  if (!fs.existsSync(credsPath) && fs.existsSync(backupCredsPath)) {
    try {
      console.log('[WhatsApp Service] Restoring WhatsApp credentials from persistent backup...');
      fs.copyFileSync(backupCredsPath, credsPath);
    } catch (e) {
      console.warn('[WhatsApp Service] Could not restore backup creds:', e.message);
    }
  } else if (fs.existsSync(credsPath) && !fs.existsSync(backupCredsPath)) {
    // Back up creds.json immediately
    try {
      fs.copyFileSync(credsPath, backupCredsPath);
    } catch (e) {}
  }
}

async function initWhatsAppService(customPhone) {
  if (customPhone) {
    targetPhoneNumber = customPhone;
  }
  if (isInitializing) return;
  isInitializing = true;

  ensureSessionDir();

  // Clean up any stale or half-open socket
  if (sock) {
    try { sock.ev.removeAllListeners(); } catch (e) {}
    try { sock.ws?.close(); } catch (e) {}
    try { sock.end(); } catch (e) {}
    sock = null;
  }

  try {
    const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);
    const { version } = await fetchLatestBaileysVersion();
    const logger = pino({ level: 'silent' });

    connectionState = 'connecting';

    sock = makeWASocket({
      version,
      logger,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger),
      },
      printQRInTerminal: false,
      browser: Browsers.ubuntu('Chrome'), // Ubuntu Chrome signature is most stable for Node server persistence
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 60000,
      keepAliveIntervalMs: 30000,
      retryRequestDelayMs: 2500,
      maxRetries: 5,
      syncFullHistory: false,
      markOnlineOnConnect: true,
    });

    const persistCreds = async () => {
      await saveCreds();
      try {
        const credsPath = path.join(SESSION_DIR, 'creds.json');
        const backupCredsPath = path.join(BACKUP_SESSION_DIR, 'creds.json');
        if (fs.existsSync(credsPath)) {
          fs.copyFileSync(credsPath, backupCredsPath);
        }
      } catch (e) {}
    };

    sock.ev.on('creds.update', persistCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr && !isSessionRegistered()) {
        try {
          currentQrDataUrl = await QRCode.toDataURL(qr, { width: 320, margin: 2 });
          console.log('[WhatsApp Service] 📷 Fresh QR Code generated for scanning.');
          if (connectionState !== 'connected') {
            connectionState = 'pairing';
          }
        } catch (e) {
          console.error('[WhatsApp Service] QR generation failed:', e.message);
        }
      }

      if (connection === 'open') {
        connectionState = 'connected';
        currentPairingCode = '';
        currentQrDataUrl = '';
        const userJid = sock.user?.id || '';
        linkedPhoneNumber = userJid.split(':')[0] || userJid.split('@')[0] || getCleanPhone(targetPhoneNumber);
        console.log(`[WhatsApp Service] 🟢 WhatsApp Bot Connected permanently as +${linkedPhoneNumber}!`);
      } else if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        console.log(`[WhatsApp Service] Connection closed (code: ${statusCode}). Reconnecting: ${shouldReconnect}`);
        connectionState = 'disconnected';

        // NOTE: We NEVER wipe SESSION_DIR on disconnect!
        // Accidental 401, 408, or 428 socket drops should NEVER unlink the bot number.
        // Wipe is ONLY permitted when admin explicitly calls logoutWhatsApp().

        if (shouldReconnect) {
          if (reconnectTimeout) clearTimeout(reconnectTimeout);
          reconnectTimeout = setTimeout(() => {
            isInitializing = false;
            initWhatsAppService();
          }, 4500);
        }
      }
    });

    // If session is completely fresh (never paired) and has no creds, auto-generate pairing code
    if (!isSessionRegistered() && !currentPairingCode) {
      connectionState = 'pairing';
      const cleanPhone = getCleanPhone(targetPhoneNumber);

      setTimeout(async () => {
        try {
          if (sock && !isSessionRegistered() && !currentPairingCode) {
            console.log(`[WhatsApp Service] Requesting fresh Pairing Code for +${cleanPhone}...`);
            const code = await sock.requestPairingCode(cleanPhone);
            currentPairingCode = code;
            pairingCodeTimestamp = Date.now();
            console.log(`[WhatsApp Service] 📲 Pairing Code generated for +${cleanPhone}: ${code}`);
          }
        } catch (err) {
          console.warn('[WhatsApp Service] Pairing code request note:', err.message);
        }
      }, 4000);
    }
  } catch (err) {
    console.error('[WhatsApp Service] Initialization error:', err.message);
    connectionState = 'disconnected';
  } finally {
    isInitializing = false;
  }
}

async function requestNewPairingCode(phoneNumber) {
  const phoneToUse = phoneNumber || targetPhoneNumber;
  const cleanPhone = getCleanPhone(phoneToUse);

  if (connectionState === 'connected' || isSessionRegistered()) {
    return {
      success: false,
      error: `WhatsApp Bot is already permanently linked as +${linkedPhoneNumber || cleanPhone}! No need to reconnect.`,
      isRegistered: true,
      linkedNumber: linkedPhoneNumber || cleanPhone,
    };
  }

  // If a valid code was generated in the last 45 seconds, return it immediately without breaking socket
  if (currentPairingCode && (Date.now() - pairingCodeTimestamp < 45000)) {
    return {
      success: true,
      pairingCode: currentPairingCode,
      phone: cleanPhone,
      qrCodeDataUrl: currentQrDataUrl,
    };
  }

  // Ensure socket is alive
  if (!sock) {
    isInitializing = false;
    await initWhatsAppService(phoneToUse);
    await delay(2500);
  }

  if (sock && !isSessionRegistered()) {
    try {
      const code = await sock.requestPairingCode(cleanPhone);
      currentPairingCode = code;
      pairingCodeTimestamp = Date.now();
      connectionState = 'pairing';
      console.log(`[WhatsApp Service] 📲 Fresh Pairing Code requested: ${code} for +${cleanPhone}`);
      return {
        success: true,
        pairingCode: code,
        phone: cleanPhone,
        qrCodeDataUrl: currentQrDataUrl,
      };
    } catch (err) {
      console.error('[WhatsApp Service] Failed to request pairing code:', err.message);
      return {
        success: false,
        error: err.message,
        qrCodeDataUrl: currentQrDataUrl,
      };
    }
  } else {
    return {
      success: false,
      error: 'WhatsApp Bot is already registered or connecting. Please try in a few seconds.',
      qrCodeDataUrl: currentQrDataUrl,
    };
  }
}

async function sendWhatsAppMessage(recipientPhone, messageText) {
  const cleanRecipient = getCleanPhone(recipientPhone);
  if (!cleanRecipient) {
    return { success: false, error: 'Invalid recipient phone number' };
  }

  const jid = `${cleanRecipient}@s.whatsapp.net`;

  if (sock && connectionState === 'connected') {
    try {
      console.log(`[WhatsApp Service] 🚀 Sending real WhatsApp message to +${cleanRecipient} from official bot...`);
      const sent = await sock.sendMessage(jid, { text: messageText });
      console.log(`[WhatsApp Service] ✅ Message delivered to +${cleanRecipient}! Message ID:`, sent?.key?.id);
      return {
        success: true,
        channel: 'WhatsApp Web Multi-Device Bot',
        messageId: sent?.key?.id,
        senderNumber: '+' + (linkedPhoneNumber || '918920632874'),
        recipientNumber: '+' + cleanRecipient,
      };
    } catch (err) {
      console.error('[WhatsApp Service] Error sending message via socket:', err.message);
      return {
        success: false,
        error: err.message,
        channel: 'WhatsApp Web Multi-Device Bot',
      };
    }
  }

  return {
    success: false,
    reason: 'WhatsApp socket not connected yet',
    connectionState,
    pairingCode: currentPairingCode,
    targetPhoneNumber,
  };
}

function getServiceStatus() {
  const formattedPairingCode = currentPairingCode && currentPairingCode.length === 8
    ? `${currentPairingCode.slice(0, 4)} - ${currentPairingCode.slice(4)}`
    : currentPairingCode;

  const registered = isSessionRegistered();

  return {
    status: connectionState,
    officialNumber: targetPhoneNumber,
    linkedNumber: linkedPhoneNumber ? '+' + linkedPhoneNumber : (registered ? '+' + getCleanPhone(targetPhoneNumber) : null),
    pairingCode: currentPairingCode,
    formattedPairingCode,
    qrCodeDataUrl: currentQrDataUrl,
    isRegistered: registered,
  };
}

async function logoutWhatsApp() {
  try {
    if (sock) {
      try { await sock.logout(); } catch (e) {}
      try { sock.end(); } catch (e) {}
    }
  } catch (e) {}
  try {
    fs.rmSync(SESSION_DIR, { recursive: true, force: true });
  } catch (e) {}
  try {
    fs.rmSync(BACKUP_SESSION_DIR, { recursive: true, force: true });
  } catch (e) {}
  sock = null;
  connectionState = 'disconnected';
  currentPairingCode = '';
  pairingCodeTimestamp = 0;
  currentQrDataUrl = '';
  linkedPhoneNumber = '';
  isInitializing = false;
  setTimeout(() => {
    initWhatsAppService();
  }, 1500);
  return { success: true };
}

module.exports = {
  initWhatsAppService,
  requestNewPairingCode,
  sendWhatsAppMessage,
  getServiceStatus,
  logoutWhatsApp,
  isSessionRegistered,
};
