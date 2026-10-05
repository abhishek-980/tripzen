const {
  default: makeWASocket,
  useMultiFileAuthState,
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

let sock = null;
let connectionState = 'disconnected'; // 'disconnected' | 'connecting' | 'pairing' | 'connected'
let currentPairingCode = '';
let currentQrDataUrl = '';
let linkedPhoneNumber = '';
let targetPhoneNumber = process.env.TRIPZEN_OFFICIAL_WHATSAPP || '+91 89206 32874';
let isInitializing = false;
let reconnectTimeout = null;

function getCleanPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 10) return '91' + digits;
  return digits;
}

async function initWhatsAppService(customPhone) {
  if (customPhone) {
    targetPhoneNumber = customPhone;
  }
  if (isInitializing) return;
  isInitializing = true;

  if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
  }

  try {
    const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);
    const { version } = await fetchLatestBaileysVersion();

    connectionState = 'connecting';

    sock = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      browser: Browsers.ubuntu('Chrome'),
      connectTimeoutMs: 60000,
      keepAliveIntervalMs: 25000,
      syncFullHistory: false,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
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
        linkedPhoneNumber = userJid.split(':')[0] || userJid.split('@')[0] || targetPhoneNumber;
        console.log(`[WhatsApp Service] 🟢 WhatsApp Bot Connected successfully as +${linkedPhoneNumber}!`);
      } else if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        console.log(`[WhatsApp Service] Connection closed (code: ${statusCode}). Reconnect: ${shouldReconnect}`);
        connectionState = 'disconnected';
        currentPairingCode = '';

        if (statusCode === DisconnectReason.loggedOut || statusCode === 401 || statusCode === 403) {
          console.log('[WhatsApp Service] Device unlinked/logged out. Resetting auth...');
          try {
            fs.rmSync(SESSION_DIR, { recursive: true, force: true });
          } catch (e) {}
        }

        if (shouldReconnect) {
          if (reconnectTimeout) clearTimeout(reconnectTimeout);
          reconnectTimeout = setTimeout(() => {
            isInitializing = false;
            initWhatsAppService();
          }, 4000);
        }
      }
    });

    // If session is not registered, request a fresh pairing code
    if (!sock.authState.creds.registered) {
      connectionState = 'pairing';
      const cleanPhone = getCleanPhone(targetPhoneNumber);

      setTimeout(async () => {
        try {
          if (sock && !sock.authState.creds.registered) {
            console.log(`[WhatsApp Service] Requesting fresh Pairing Code for +${cleanPhone}...`);
            const code = await sock.requestPairingCode(cleanPhone);
            currentPairingCode = code;
            console.log(`[WhatsApp Service] 📲 Pairing Code generated for +${cleanPhone}: ${code}`);
          }
        } catch (err) {
          console.warn('[WhatsApp Service] Pairing code request notice:', err.message);
        }
      }, 3000);
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

  // If previous socket is stale, reset it
  if (!sock || !sock.authState.creds.registered) {
    try {
      if (sock) {
        try { sock.end(); } catch (e) {}
      }
      fs.rmSync(SESSION_DIR, { recursive: true, force: true });
    } catch (e) {}
    isInitializing = false;
    await initWhatsAppService(phoneToUse);
    await delay(3500);
  }

  if (sock && !sock.authState.creds.registered) {
    try {
      const code = await sock.requestPairingCode(cleanPhone);
      currentPairingCode = code;
      connectionState = 'pairing';
      return { success: true, pairingCode: code, phone: cleanPhone, qrCodeDataUrl: currentQrDataUrl };
    } catch (err) {
      console.error('[WhatsApp Service] Failed to request new pairing code:', err.message);
      return { success: false, error: err.message };
    }
  } else if (connectionState === 'connected') {
    return { success: false, error: 'Already connected as +' + linkedPhoneNumber };
  } else {
    return { success: false, error: 'Initializing socket. Please click again in 2 seconds.' };
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
        senderNumber: '+' + linkedPhoneNumber,
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

  return {
    status: connectionState,
    officialNumber: targetPhoneNumber,
    linkedNumber: linkedPhoneNumber ? '+' + linkedPhoneNumber : null,
    pairingCode: currentPairingCode,
    formattedPairingCode,
    qrCodeDataUrl: currentQrDataUrl,
    isRegistered: sock?.authState?.creds?.registered || false,
  };
}

async function logoutWhatsApp() {
  try {
    if (sock) {
      await sock.logout();
    }
  } catch (e) {}
  try {
    fs.rmSync(SESSION_DIR, { recursive: true, force: true });
  } catch (e) {}
  sock = null;
  connectionState = 'disconnected';
  currentPairingCode = '';
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
};
