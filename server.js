const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');
const whatsappService = require('./services/whatsappService');

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath) === false) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, '');
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

loadEnvFile();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'tripzen-admin-123';
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_TUU1LQBZyK1Got';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'f0pSoN9Z71e6d1S2jzNXTnjt';
const TRIPZEN_OFFICIAL_WHATSAPP = process.env.TRIPZEN_OFFICIAL_WHATSAPP || '+91 89206 32874';
const TRIPZEN_OFFICIAL_SENDER_NAME = process.env.TRIPZEN_OFFICIAL_SENDER_NAME || 'TripZen Expeditions Official';

const DATA_FILE = path.join(__dirname, 'data', 'store.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
const DEFAULT_STORE = {
  users: [],
  profiles: [],
  bookings: [],
  conversations: [],
  messages: [],
  packageSelections: [],
  tripGroups: [],
  joinRequests: [],
  packageBookingRequests: [],
  payments: [],
  whatsappLogs: [],
};

const DESTINATIONS = [
  'Chopta Tungnath',
  'Madmaheshwar Ji',
  'Yulla Kanda',
  'Hampta Pass & Chandratal',
  'Valley of Flowers',
  'Kareri Lake',
  'Jibhi & Tirthan Valley',
  'Rudranath & Kalpeshwar',
  'Kedarnath Dham',
  'Kedarkantha',
  'Triund & Dharamshala',
  'Nag Tibba',
  'Annapurna Base Camp (ABC)',
  'Everest Base Camp (EBC)',
  'Kasol & Parvati Valley',
];

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { etag: false, maxAge: 0 }));
app.use('/uploads', express.static(UPLOADS_DIR));

function loadStore() {
  try {
    if (fs.existsSync(DATA_FILE) === false) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_STORE, null, 2));
      return {
        users: [],
        profiles: [],
        bookings: [],
        conversations: [],
        messages: [],
        packageSelections: [],
        tripGroups: [],
        joinRequests: [],
        packageBookingRequests: [],
        payments: [],
        whatsappLogs: [],
      };
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      profiles: Array.isArray(parsed.profiles) ? parsed.profiles : [],
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
      conversations: Array.isArray(parsed.conversations) ? parsed.conversations : [],
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
      packageSelections: Array.isArray(parsed.packageSelections) ? parsed.packageSelections : [],
      tripGroups: Array.isArray(parsed.tripGroups) ? parsed.tripGroups : [],
      joinRequests: Array.isArray(parsed.joinRequests) ? parsed.joinRequests : [],
      packageBookingRequests: Array.isArray(parsed.packageBookingRequests) ? parsed.packageBookingRequests : [],
      payments: Array.isArray(parsed.payments) ? parsed.payments : [],
      whatsappLogs: Array.isArray(parsed.whatsappLogs) ? parsed.whatsappLogs : [],
    };
  } catch (error) {
    console.error('Failed to read store:', error.message);
    return {
      users: [],
      profiles: [],
      bookings: [],
      conversations: [],
      messages: [],
      packageSelections: [],
      tripGroups: [],
      joinRequests: [],
      packageBookingRequests: [],
      payments: [],
      whatsappLogs: [],
    };
  }
}

function saveStore(store) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

let db = loadStore();

function uid(prefix) {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

function normalizeText(value) {
  return String(value || '').trim();
}

function persistProfileImage(value, seed = 'tripzen-user') {
  const text = normalizeText(value);
  if (!text) {
    return '';
  }

  if (text.startsWith('/uploads/')) {
    return text;
  }

  const dataUrlMatch = text.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!dataUrlMatch) {
    return text;
  }

  const mimeType = dataUrlMatch[1].toLowerCase();
  const extensionMap = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'image/heic': 'heic',
    'image/heif': 'heif',
    'image/avif': 'avif',
  };
  const extension = extensionMap[mimeType] || mimeType.split('/')[1] || 'jpg';

  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  const fileName = `${seed}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${extension}`;
  const absoluteFilePath = path.join(UPLOADS_DIR, fileName);
  fs.writeFileSync(absoluteFilePath, Buffer.from(dataUrlMatch[2], 'base64'));
  return `/uploads/${fileName}`;
}

function normalizeInterests(interests) {
  if (Array.isArray(interests)) {
    return interests
      .map((item) => String(item).trim().toLowerCase())
      .filter(Boolean);
  }

  if (typeof interests === 'string') {
    return interests
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
  }

  return [];
}

function normalizeDestination(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function parseBudgetValue(value) {
  const text = normalizeText(value).replace(/,/g, '');
  if (!text) return 0;

  const rangeMatch = text.match(/(\d+)\D+(\d+)/);
  if (rangeMatch) {
    return (Number(rangeMatch[1]) + Number(rangeMatch[2])) / 2;
  }

  const numericMatch = text.match(/(\d+)/);
  return numericMatch ? Number(numericMatch[1]) : 0;
}

function parseDate(value) {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

function dateWindowInfo(startA, endA, startB, endB) {
  const startOne = parseDate(startA);
  const endOne = parseDate(endA);
  const startTwo = parseDate(startB);
  const endTwo = parseDate(endB);

  if (!startOne || !endOne || !startTwo || !endTwo) {
    return { overlaps: false, gapDays: 999 };
  }

  const overlapStart = Math.max(startOne, startTwo);
  const overlapEnd = Math.min(endOne, endTwo);
  if (overlapStart <= overlapEnd) {
    return { overlaps: true, gapDays: 0 };
  }

  const gap = startOne > endTwo ? startOne - endTwo : startTwo - endOne;
  const gapDays = Math.ceil(gap / (1000 * 60 * 60 * 24));
  return { overlaps: false, gapDays };
}

function isDateCompatible(base, candidate) {
  const info = dateWindowInfo(base.startDate, base.endDate, candidate.startDate, candidate.endDate);
  return info.overlaps || info.gapDays <= 3;
}



// avatar for user 




function avatarForUser(user) {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    user.fullName || user.email || user.id
  )}`;
}

function latestProfilesPerUser() {
  const sortedProfiles = [...db.profiles].sort((a, b) => {
    return new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime();
  });

  const seen = new Set();
  return sortedProfiles.filter((profile) => {
    if (seen.has(profile.userId)) {
      return false;
    }

    seen.add(profile.userId);
    return true;
  });
}



// scoring karna match ko



function compatibilityScore(base, candidate) {
  let score = 0;
  const breakdown = {
    destination: 0,
    dates: 0,
    style: 0,
    budget: 0,
    interests: 0,
  };

  if (normalizeDestination(base.destination) === normalizeDestination(candidate.destination)) {
    score += 45;
    breakdown.destination = 45;
  }

  const dateInfo = dateWindowInfo(base.startDate, base.endDate, candidate.startDate, candidate.endDate);
  if (dateInfo.overlaps) {
    score += 25;
    breakdown.dates = 25;
  } else if (dateInfo.gapDays <= 3) {
    breakdown.dates = Math.max(10, 22 - dateInfo.gapDays * 4);
    score += breakdown.dates;
  }

  const baseStyle = normalizeText(base.travelStyle).toLowerCase();
  const candidateStyle = normalizeText(candidate.travelStyle).toLowerCase();
  if (baseStyle && candidateStyle && baseStyle === candidateStyle) {
    score += 10;
    breakdown.style = 10;
  }

  const baseBudget = parseBudgetValue(base.budgetRange);
  const candidateBudget = parseBudgetValue(candidate.budgetRange);
  if (baseBudget && candidateBudget) {
    const diff = Math.abs(baseBudget - candidateBudget);
    breakdown.budget = Math.max(0, 14 - Math.min(14, Math.floor(diff / 1500) * 2));
    score += breakdown.budget;
  }

  const sharedInterests = normalizeInterests(base.interests).filter((interest) =>
    normalizeInterests(candidate.interests).includes(interest)
  );
  breakdown.interests = Math.min(sharedInterests.length * 7, 20);
  score += breakdown.interests;

  return {
    score: Math.min(score, 99),
    sharedInterests,
    dateInfo,
    breakdown,
  };
}


// sanitize user data before sending to client


function sanitizeUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    age: user.age || '',
    gender: user.gender || '',
    city: user.city || '',
    interests: normalizeInterests(user.interests),
    travelStyle: user.travelStyle || '',
    pastTrips: user.pastTrips || '',
    budgetRange: user.budgetRange || '',
    verified: user.verified !== false,
    profileCompleteness: user.profileCompleteness || 0,
    profileImage: user.profileImage || avatarForUser(user),
    createdAt: user.createdAt,
  };
}

function sanitizeProfile(profile) {
  if (!profile) return null;

  return {
    id: profile.id,
    userId: profile.userId,
    destination: profile.destination,
    startDate: profile.startDate,
    endDate: profile.endDate,
    travelStyle: profile.travelStyle || '',
    budgetRange: profile.budgetRange || '',
    genderPreference: profile.genderPreference || '',
    interests: normalizeInterests(profile.interests),
    bio: profile.bio || '',
    pastTrips: profile.pastTrips || '',
    updatedAt: profile.updatedAt || profile.createdAt,
  };
}

function calculateProfileCompleteness(user, profile) {
  const checks = [
    normalizeText(user.fullName),
    normalizeText(user.age),
    normalizeText(user.gender),
    normalizeInterests(user.interests).length > 0,
    normalizeText(user.travelStyle),
    normalizeText(user.pastTrips),
    normalizeText(user.budgetRange),
    profile && normalizeText(profile.destination),
    profile && normalizeText(profile.startDate),
    profile && normalizeText(profile.endDate),
    profile && normalizeText(profile.bio),
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}

function doesGenderPreferenceMatch(baseProfile, baseUser, candidateProfile, candidateUser) {
  const desiredByBase = normalizeText(baseProfile.genderPreference).toLowerCase();
  const desiredByCandidate = normalizeText(candidateProfile.genderPreference).toLowerCase();
  const candidateGender = normalizeText(candidateUser ? candidateUser.gender : '').toLowerCase();
  const baseGender = normalizeText(baseUser ? baseUser.gender : '').toLowerCase();

  const baseAllowsCandidate =
    !desiredByBase || desiredByBase === 'any' || desiredByBase === candidateGender;
  const candidateAllowsBase =
    !desiredByCandidate || desiredByCandidate === 'any' || desiredByCandidate === baseGender;

  return baseAllowsCandidate && candidateAllowsBase;
}

function buildTripGroupView(group, viewerProfileId) {
  const organizerProfile = db.profiles.find((profile) => profile.id === group.organizerProfileId);
  const organizerUser = organizerProfile
    ? db.users.find((user) => user.id === organizerProfile.userId)
    : null;
  const memberProfileIds = Array.isArray(group.memberProfileIds) ? group.memberProfileIds : [];
  const memberCount = memberProfileIds.length;
  const maxMembers = Math.max(2, Number(group.maxMembers || 4));
  const pricePerPerson = Number(group.pricePerPerson || 0) || (group.estimatedTotalCost ? Math.round(group.estimatedTotalCost / maxMembers) : 4999);
  const estimatedTotalCost = Number(group.estimatedTotalCost || (pricePerPerson * maxMembers));
  const splitCost = pricePerPerson;
  const savings = Math.max(0, Math.round(pricePerPerson * 0.35));

  const remainingSeats = Math.max(0, maxMembers - memberCount);
  const isFull = memberCount >= maxMembers || group.status === 'full' || group.status === 'closed';

  // Build member avatar / user list
  const members = memberProfileIds.map((pId) => {
    const p = db.profiles.find((prof) => prof.id === pId);
    const u = p ? db.users.find((user) => user.id === p.userId) : null;
    return {
      profileId: pId,
      fullName: u ? u.fullName : (p ? p.destination + ' Traveler' : 'Adventurer'),
      profileImage: u ? (u.profileImage || avatarForUser(u)) : avatarForUser({ fullName: 'Traveler', id: pId }),
      isOrganizer: pId === group.organizerProfileId,
    };
  });

  const pendingRequests = db.joinRequests.filter((request) => request.groupId === group.id && request.status === 'pending');
  const viewerRequest = pendingRequests.find((request) => request.requesterProfileId === viewerProfileId) || null;
  const isOrganizer = Boolean(
    viewerProfileId && (
      group.organizerProfileId === viewerProfileId ||
      (organizerProfile && organizerProfile.id === viewerProfileId)
    )
  );

  return {
    id: group.id,
    title: group.title,
    agencyName: group.agencyName || (organizerUser ? organizerUser.fullName : 'Himalayan Tour Agency'),
    agencyVerified: group.agencyVerified !== undefined ? group.agencyVerified : true,
    destination: group.destination,
    batchDates: group.batchDates || (group.startDate && group.endDate ? `${group.startDate} to ${group.endDate}` : 'Upcoming Weekend'),
    startDate: group.startDate,
    endDate: group.endDate,
    pricePerPerson,
    estimatedTotalCost,
    splitCost,
    savings,
    maxMembers,
    memberCount,
    remainingSeats,
    isFull,
    inclusions: group.inclusions || 'Stay in Swiss Tents + All Meals + Trek Guide + Forest Permits',
    contactPhone: group.contactPhone || (organizerUser ? organizerUser.phone : '+91 89206 32874'),
    memberProfileIds,
    members,
    conversationId: group.conversationId || '',
    organizerProfileId: group.organizerProfileId,
    organizer: organizerUser
      ? {
          fullName: organizerUser.fullName,
          profileImage: organizerUser.profileImage || avatarForUser(organizerUser),
          verified: Boolean(organizerUser.verified),
        }
      : {
          fullName: group.agencyName || 'Tour Agency',
          profileImage: avatarForUser({ fullName: group.agencyName || 'Tour Agency', id: group.id }),
          verified: true,
        },
    pendingRequests: pendingRequests.map((request) => {
      const requesterProfile = db.profiles.find((profile) => profile.id === request.requesterProfileId);
      const requesterUser = requesterProfile
        ? db.users.find((user) => user.id === requesterProfile.userId)
        : null;

      return {
        id: request.id,
        requesterProfileId: request.requesterProfileId,
        requesterName: requesterUser ? requesterUser.fullName : 'Traveler',
      };
    }),
    viewerRequestStatus: viewerRequest ? viewerRequest.status : '',
    viewerIsMember: Boolean(viewerProfileId && memberProfileIds.includes(viewerProfileId)),
    isOrganizer,
    status: isFull ? 'full' : (group.status || 'open'),
  };
}

function findLatestProfileByUserId(userId) {
  return latestProfilesPerUser().find((profile) => profile.userId === userId) || null;
}


// two layer conersation find karna dono profile ke beech me


function getConversationForProfiles(profileOneId, profileTwoId) {
  return (
    db.conversations.find((conversation) => {
      const members = Array.isArray(conversation.memberProfileIds)
        ? conversation.memberProfileIds
        : [];

      return members.includes(profileOneId) && members.includes(profileTwoId);
    }) || null
  );
}

// conversation view prepare karna client ke liye with latest message and partner info



function getConversationView(conversation, viewerProfileId) {
  const memberProfiles = (conversation.memberProfileIds || [])
    .map((profileId) => db.profiles.find((profile) => profile.id === profileId))
    .filter(Boolean);

  const isGroupConversation = conversation.type === 'group';
  const otherProfile =
    memberProfiles.find((profile) => profile.id !== viewerProfileId) || memberProfiles[0] || null;
  const otherUser = otherProfile
    ? db.users.find((user) => user.id === otherProfile.userId)
    : null;

  const latestMessage =
    db.messages
      .filter((message) => message.conversationId === conversation.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null;
  const lastReadAtByProfileId =
    conversation.lastReadAtByProfileId && typeof conversation.lastReadAtByProfileId === 'object'
      ? conversation.lastReadAtByProfileId
      : {};
  const lastReadAt = lastReadAtByProfileId[viewerProfileId] || '';
  const unreadCount = db.messages.filter((message) => {
    if (message.conversationId !== conversation.id) return false;
    if (message.senderProfileId === viewerProfileId) return false;
    if (!lastReadAt) return true;
    return new Date(message.createdAt).getTime() > new Date(lastReadAt).getTime();
  }).length;

  return {
    id: conversation.id,
    memberProfileIds: conversation.memberProfileIds || [],
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt || conversation.createdAt,
    type: conversation.type || 'direct',
    title: conversation.title || '',
    destination: conversation.destination || (otherProfile ? otherProfile.destination : ''),
    partner: isGroupConversation
      ? {
          id: conversation.id,
          fullName: conversation.title || 'Trip Group',
          city: `${memberProfiles.length} travelers`,
          profileImage: avatarForUser({
            fullName: conversation.title || 'Trip Group',
            id: conversation.id,
          }),
        }
      : otherUser
        ? {
            id: otherUser.id,
            fullName: otherUser.fullName,
            city: otherUser.city || 'India',
            profileImage: otherUser.profileImage || avatarForUser(otherUser),
          }
        : {
            id: otherProfile ? otherProfile.userId : '',
            fullName: 'Traveler',
            city: 'India',
            profileImage: avatarForUser({
              fullName: 'Traveler',
              id: otherProfile ? otherProfile.userId : conversation.id,
            }),
          },
    latestMessage: latestMessage
      ? {
          id: latestMessage.id,
          text: latestMessage.text,
          senderProfileId: latestMessage.senderProfileId,
          createdAt: latestMessage.createdAt,
        }
      : null,
    unreadCount,
    memberCount: memberProfiles.length,
  };
}

function markConversationRead(conversation, profileId) {
  if (!conversation || !profileId) return;

  if (!conversation.lastReadAtByProfileId || typeof conversation.lastReadAtByProfileId !== 'object') {
    conversation.lastReadAtByProfileId = {};
  }

  conversation.lastReadAtByProfileId[profileId] = new Date().toISOString();
  conversation.updatedAt = conversation.updatedAt || conversation.createdAt;
}

function getPackageSelectionView(selection) {
  return {
    id: selection.id,
    conversationId: selection.conversationId,
    packageId: selection.packageId,
    packageName: selection.packageName,
    company: selection.company,
    destination: selection.destination,
    facilityType: selection.facilityType,
    agreedBudget: selection.agreedBudget || '',
    preferredMonth: selection.preferredMonth || '',
    selectedByProfileId: selection.selectedByProfileId,
    status: selection.status || 'shortlisted',
    createdAt: selection.createdAt,
  };
}

function razorpayRequest(method, apiPath, payload) {
  return new Promise((resolve, reject) => {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      reject(new Error('Razorpay keys are not configured on the server.'));
      return;
    }

    const body = payload ? JSON.stringify(payload) : '';
    const request = https.request(
      {
        hostname: 'api.razorpay.com',
        path: apiPath,
        method,
        auth: `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (response) => {
        let raw = '';
        response.on('data', (chunk) => {
          raw += chunk;
        });
        response.on('end', () => {
          const parsed = raw ? JSON.parse(raw) : {};
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(parsed);
            return;
          }
          reject(new Error(parsed.error?.description || 'Razorpay request failed.'));
        });
      }
    );

    request.on('error', reject);
    if (body) {
      request.write(body);
    }
    request.end();
  });
}

function verifyRazorpaySignature(orderId, paymentId, receivedSignature) {
  if (!RAZORPAY_KEY_SECRET || !orderId || !paymentId || !receivedSignature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const receivedBuffer = Buffer.from(receivedSignature, 'hex');
  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

function buildTripzenWhatsAppMessage({
  leadName,
  bookingRef,
  packageName,
  destination,
  company,
  travelerCount,
  preferredMonth,
  bookingTime,
  amount,
  paymentId,
  itineraryUrl,
}) {
  return [
    `🏔️ *TRIPZEN OFFICIAL BOOKING CONFIRMATION* 🏔️`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Hi *${leadName || 'Traveler'}*, your Himalayan trek booking is confirmed! 🎉`,
    ``,
    `📋 *TRIP & BOOKING DETAILS:*`,
    `• *Booking Ref:* ${bookingRef}`,
    `• *Trek / Package:* ${packageName}`,
    `• *Destination:* ${destination}`,
    `• *Operator:* ${company}`,
    `• *Travelers:* ${travelerCount} Person(s)`,
    `• *Departure Batch:* ${preferredMonth || 'Upcoming Weekend'}`,
    `• *Booking Date & Time:* ${bookingTime}`,
    ``,
    `💳 *PAYMENT SUMMARY:*`,
    `• *Total Amount Paid:* INR ${Number(amount).toLocaleString('en-IN')}`,
    `• *Razorpay Payment ID:* ${paymentId || 'VERIFIED'}`,
    `• *Payment Status:* 🔒 100% Verified & Confirmed`,
    ``,
    `📄 *OFFICIAL ITINERARY & GEAR GUIDE:*`,
    `${itineraryUrl}`,
    ``,
    `📞 *24x7 TRIPZEN HIMALAYAN DESK:*`,
    `Need help or preparation tips? Reply to this official WhatsApp message or call ${TRIPZEN_OFFICIAL_WHATSAPP}.`,
    ``,
    `See you on the mountains! 🥾⛺✨`,
    `_Tripzen Technologies Pvt. Ltd._`,
  ].join('\n');
}

async function dispatchAutomatedTripzenWhatsApp({ to, recipientName, message, bookingRef, metadata = {} }) {
  const cleanPhone = String(to || '').replace(/\D/g, '');
  const formattedPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
  const deliveryId = 'TZ-WA-' + Date.now().toString().slice(-6).toUpperCase();
  const deliveredAt = new Date().toISOString();

  let provider = 'TripZen Official Automated Business Gateway';
  let providerResponse = null;
  let isRealSocketDelivered = false;

  // 1. Try real WhatsApp Web / Baileys socket connected to 8920632874
  try {
    const socketResult = await whatsappService.sendWhatsAppMessage(formattedPhone, message);
    if (socketResult && socketResult.success) {
      provider = 'WhatsApp Official Multi-Device Bot (+91 89206 32874)';
      providerResponse = { messageId: socketResult.messageId };
      isRealSocketDelivered = true;
      console.log(`[WhatsApp Real Dispatch] ✅ Message successfully delivered to +${formattedPhone} from official number (+91 89206 32874)!`);
    } else {
      console.log(`[WhatsApp Socket Notice] ${socketResult?.reason || socketResult?.error || 'Socket not connected'}`);
    }
  } catch (err) {
    console.error('[WhatsApp Socket Error]:', err.message);
  }

  // 2. Meta WhatsApp Cloud API if configured in .env
  if (!isRealSocketDelivered && process.env.WHATSAPP_API_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: { body: message },
        }),
      });
      providerResponse = await response.json();
      provider = 'Meta WhatsApp Cloud API';
      isRealSocketDelivered = true;
    } catch (err) {
      console.error('[WhatsApp Cloud API Error]:', err.message);
    }
  }

  // 3. Twilio WhatsApp Gateway if configured in .env
  if (!isRealSocketDelivered && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const twilioAuth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
      const params = new URLSearchParams();
      params.append('From', `whatsapp:${process.env.TWILIO_WHATSAPP_FROM || '+14155238886'}`);
      params.append('To', `whatsapp:+${formattedPhone}`);
      params.append('Body', message);

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${twilioAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
      providerResponse = await response.json();
      provider = 'Twilio WhatsApp Gateway';
      isRealSocketDelivered = true;
    } catch (err) {
      console.error('[Twilio WhatsApp Error]:', err.message);
    }
  }

  const logEntry = {
    id: uid('wa_log'),
    deliveryId,
    channel: provider,
    senderName: TRIPZEN_OFFICIAL_SENDER_NAME,
    senderNumber: TRIPZEN_OFFICIAL_WHATSAPP,
    recipientNumber: '+' + formattedPhone,
    recipientName: recipientName || 'Traveler',
    bookingRef,
    status: isRealSocketDelivered ? 'delivered_realtime' : 'dispatched_simulated',
    deliveredAt,
    messageText: message,
    providerResponse,
    metadata,
  };

  if (!Array.isArray(db.whatsappLogs)) {
    db.whatsappLogs = [];
  }
  db.whatsappLogs.push(logEntry);
  saveStore(db);

  const botStatus = whatsappService.getServiceStatus();

  console.log(`[WhatsApp Dispatch] Automated confirmation recorded for +${formattedPhone} (Booking Ref: ${bookingRef}, DeliveryID: ${deliveryId}) via ${provider}`);

  return {
    automated: true,
    status: isRealSocketDelivered ? 'delivered_realtime' : 'dispatched_simulated',
    deliveryId,
    deliveredAt,
    senderName: TRIPZEN_OFFICIAL_SENDER_NAME,
    senderNumber: TRIPZEN_OFFICIAL_WHATSAPP,
    recipientNumber: '+' + formattedPhone,
    recipientName: recipientName || 'Traveler',
    channel: provider,
    message,
    bookingRef,
    directSendUrl: `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`,
    supportChatUrl: `https://api.whatsapp.com/send?phone=${TRIPZEN_OFFICIAL_WHATSAPP.replace(/\D/g, '') || '918920632874'}&text=${encodeURIComponent('Hi Tripzen Support, I need assistance regarding my booking ' + bookingRef)}`,
    botStatus,
  };
}

// WHATSAPP PAIRING & STATUS ENDPOINTS
app.get('/api/whatsapp/status', (req, res) => {
  res.json({
    success: true,
    ...whatsappService.getServiceStatus(),
  });
});

app.post('/api/whatsapp/request-code', async (req, res) => {
  const { phoneNumber } = req.body || {};
  const result = await whatsappService.requestNewPairingCode(phoneNumber);
  res.json(result);
});

app.post('/api/whatsapp/send-test', async (req, res) => {
  const { to, message } = req.body || {};
  const testMsg = message || `🏔️ *TRIPZEN OFFICIAL BOT TEST*\nConnection to +91 89206 32874 verified at ${new Date().toLocaleTimeString('en-IN')}.`;
  const result = await whatsappService.sendWhatsAppMessage(to || '917982307329', testMsg);
  res.json(result);
});

app.post('/api/whatsapp/logout', async (req, res) => {
  const result = await whatsappService.logoutWhatsApp();
  res.json(result);
});



function requireAdmin(req, res, next) {
  const adminPassword = req.header('x-admin-password');

  if (!adminPassword || adminPassword !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: 'Admin access denied.',
    });
  }

  next();
}

function sanitizeAdminUser(user) {
  const safeUser = sanitizeUser(user);
  return {
    ...safeUser,
    hasPassword: Boolean(user.password),
  };
}

// --- API Endpoints ---

app.get('/api/health', (req, res) => {
  res.json({ ok: true, app: 'Tripzen', destinations: DESTINATIONS });
});

app.post('/api/register', (req, res) => {
  const { fullName, email, password, age, gender, interests, city, travelStyle, pastTrips, budgetRange, profileImage } = req.body;

  if (!normalizeText(fullName) || !normalizeText(email) || !normalizeText(password)) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required.',
    });
  }

  const normalizedEmail = normalizeText(email).toLowerCase();
  const existingUser = db.users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'A user with this email already exists.',
    });
  }

  const user = {
    id: uid('usr'),
    fullName: normalizeText(fullName),
    email: normalizedEmail,
    password: String(password),
    age: normalizeText(age),
    gender: normalizeText(gender),
    city: normalizeText(city),
    interests: normalizeInterests(interests),
    travelStyle: normalizeText(travelStyle),
    pastTrips: normalizeText(pastTrips),
    budgetRange: normalizeText(budgetRange),
    verified: true,
    profileCompleteness: 0,
    profileImage:
      persistProfileImage(profileImage, normalizedEmail.replace(/[^a-z0-9]/gi, '_')) ||
      avatarForUser({ fullName, email: normalizedEmail, id: normalizedEmail }),
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  saveStore(db);

  return res.status(201).json({
    success: true,
    message: 'Registration completed.',
    user: sanitizeUser(user),
    hasPreferences: false,
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const rawPassword = String(password || '').trim();

  const user = db.users.find((item) => String(item.email || '').trim().toLowerCase() === normalizedEmail);

  if (!user || String(user.password || '').trim() !== rawPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const profile = latestProfilesPerUser().find((item) => item.userId === user.id);
  user.profileCompleteness = calculateProfileCompleteness(user, profile);
  saveStore(db);

  return res.json({
    success: true,
    message: 'Login successful.',
    user: sanitizeUser(user),
    profile: sanitizeProfile(profile),
    hasPreferences: Boolean(profile),
  });
});

app.get('/api/session/:userId', (req, res) => {
  const user = db.users.find((item) => item.id === req.params.userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  const profile = latestProfilesPerUser().find((item) => item.userId === user.id);
  user.profileCompleteness = calculateProfileCompleteness(user, profile);
  saveStore(db);

  return res.json({
    success: true,
    user: sanitizeUser(user),
    profile: sanitizeProfile(profile),
    hasPreferences: Boolean(profile),
  });
});

app.post('/api/preferences', (req, res) => {
  const { userId, fullName, destination, startDate, endDate, travelStyle, interests, bio, budgetRange, genderPreference, profileImage } = req.body;

  if (!normalizeText(userId) || !normalizeText(destination) || !normalizeText(startDate) || !normalizeText(endDate)) {
    return res.status(400).json({
      success: false,
      message: 'User, destination, start date, and end date are required.',
    });
  }

  const user = db.users.find((item) => item.id === userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found. Please sign up again.',
    });
  }

  if (normalizeText(fullName)) {
    user.fullName = normalizeText(fullName);
  }

  const startTimestamp = parseDate(startDate);
  const endTimestamp = parseDate(endDate);
  if (!startTimestamp || !endTimestamp || startTimestamp > endTimestamp) {
    return res.status(400).json({
      success: false,
      message: 'Please select a valid travel date range.',
    });
  }

  const existingProfiles = db.profiles.filter((item) => item.userId === userId);
  const previous = existingProfiles.sort((a, b) => {
    return new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime();
  })[0] || null;
  const timestamp = new Date().toISOString();

  const profile = {
    id: previous ? previous.id : uid('prf'),
    userId,
    destination: normalizeText(destination),
    startDate: normalizeText(startDate),
    endDate: normalizeText(endDate),
    travelStyle: normalizeText(travelStyle) || 'Solo',
    budgetRange: normalizeText(budgetRange) || normalizeText(user.budgetRange) || '5000-9000',
    genderPreference: normalizeText(genderPreference) || 'Any',
    interests: normalizeInterests(normalizeText(interests) ? interests : user.interests),
    bio: normalizeText(bio),
    pastTrips: normalizeText(user.pastTrips),
    createdAt: previous ? previous.createdAt : timestamp,
    updatedAt: timestamp,
  };

  db.profiles = db.profiles.filter((item) => item.userId !== userId);
  db.profiles.push(profile);
  const savedProfileImage = persistProfileImage(profileImage, user.id);
  if (savedProfileImage) {
    user.profileImage = savedProfileImage;
  }
  user.profileCompleteness = calculateProfileCompleteness(user, profile);

  saveStore(db);

  return res.status(201).json({
    success: true,
    message: 'Preferences saved.',
    user: sanitizeUser(user),
    profile: sanitizeProfile(profile),
  });
});

app.post('/api/profile', (req, res) => {
  const { userId, fullName, age, gender, city, bio, travelStyle, interests, pastTrips, budgetRange, profileImage } = req.body;

  if (!normalizeText(userId)) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required.',
    });
  }

  const user = db.users.find((item) => item.id === userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  if (normalizeText(fullName)) user.fullName = normalizeText(fullName);
  if (normalizeText(age)) user.age = normalizeText(age);
  if (normalizeText(gender)) user.gender = normalizeText(gender);
  if (normalizeText(city)) user.city = normalizeText(city);
  if (normalizeText(travelStyle)) user.travelStyle = normalizeText(travelStyle);
  if (interests) user.interests = normalizeInterests(interests);
  if (normalizeText(pastTrips)) user.pastTrips = normalizeText(pastTrips);
  if (normalizeText(budgetRange)) user.budgetRange = normalizeText(budgetRange);

  if (profileImage) {
    const savedUrl = persistProfileImage(profileImage, user.id);
    if (savedUrl) user.profileImage = savedUrl;
  }

  const profile = latestProfilesPerUser().find((item) => item.userId === user.id);
  if (profile) {
    if (bio !== undefined) profile.bio = normalizeText(bio);
    if (interests) profile.interests = normalizeInterests(interests);
    if (travelStyle) profile.travelStyle = normalizeText(travelStyle);
    if (pastTrips) profile.pastTrips = normalizeText(pastTrips);
    if (budgetRange) profile.budgetRange = normalizeText(budgetRange);
    profile.updatedAt = new Date().toISOString();
  }

  user.profileCompleteness = calculateProfileCompleteness(user, profile);
  saveStore(db);

  return res.json({
    success: true,
    message: 'Profile saved successfully.',
    user: sanitizeUser(user),
    profile: sanitizeProfile(profile),
  });
});

app.post('/api/upload-avatar', (req, res) => {
  const { userId, image } = req.body;
  if (!normalizeText(userId) || !normalizeText(image)) {
    return res.status(400).json({
      success: false,
      message: 'User ID and image are required.',
    });
  }

  const user = db.users.find((item) => item.id === userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  const savedUrl = persistProfileImage(image, user.id);
  if (!savedUrl) {
    return res.status(400).json({
      success: false,
      message: 'Could not process image format.',
    });
  }

  user.profileImage = savedUrl;
  saveStore(db);

  return res.json({
    success: true,
    message: 'Profile photo updated.',
    profileImage: savedUrl,
    user: sanitizeUser(user),
  });
});


app.get('/api/matches', (req, res) => {
  const allProfiles = latestProfilesPerUser();
  const mockScores = [96, 94, 92, 89, 87, 85, 83, 80];

  const matches = allProfiles.map((candidate, idx) => {
    const user = db.users.find((item) => item.id === candidate.userId);
    const score = mockScores[idx % mockScores.length];

    return {
      matchProfileId: candidate.id,
      destination: candidate.destination,
      startDate: candidate.startDate,
      endDate: candidate.endDate,
      travelStyle: candidate.travelStyle,
      bio: candidate.bio,
      budgetRange: candidate.budgetRange || (user ? user.budgetRange || '' : ''),
      sharedInterests: normalizeInterests(candidate.interests || (user ? user.interests : [])),
      score,
      scoreBreakdown: { destination: 45, dates: 25, style: 12, budget: 10, interests: 4 },
      dateCompatibility: 'Upcoming 2026 trip',
      traveler: user
        ? {
            id: user.id,
            fullName: user.fullName,
            city: user.city || 'India',
            age: user.age || '',
            gender: user.gender || '',
            verified: Boolean(user.verified),
            travelStyle: user.travelStyle || candidate.travelStyle || '',
            budgetRange: user.budgetRange || candidate.budgetRange || '',
            pastTrips: user.pastTrips || candidate.pastTrips || '',
            profileCompleteness: user.profileCompleteness || 85,
            profileImage: user.profileImage || avatarForUser(user),
          }
        : {
            id: candidate.userId,
            fullName: 'Traveler',
            city: 'India',
            age: '',
            gender: '',
            verified: false,
            travelStyle: candidate.travelStyle || '',
            budgetRange: candidate.budgetRange || '',
            pastTrips: candidate.pastTrips || '',
            profileCompleteness: 50,
            profileImage: avatarForUser({ fullName: 'Traveler', id: candidate.userId }),
          },
    };
  }).sort((a, b) => b.score - a.score);

  return res.json({
    success: true,
    count: matches.length,
    matches,
  });
});

app.get('/api/matches/:userId', (req, res) => {
  const userId = req.params.userId;
  const baseProfile = latestProfilesPerUser().find((profile) => profile.userId === userId);
  const baseUser = db.users.find((user) => user.id === userId);

  const allCandidates = latestProfilesPerUser().filter((candidate) => candidate.userId !== userId);

  let matches = [];

  if (baseProfile) {
    matches = allCandidates
      .map((candidate) => {
        const user = db.users.find((item) => item.id === candidate.userId);
        const scoreInfo = compatibilityScore(baseProfile, candidate);
        const isSameDestination = normalizeDestination(candidate.destination) === normalizeDestination(baseProfile.destination);
        const score = isSameDestination ? scoreInfo.score : Math.max(72, scoreInfo.score);

        return {
          matchProfileId: candidate.id,
          destination: candidate.destination,
          startDate: candidate.startDate,
          endDate: candidate.endDate,
          travelStyle: candidate.travelStyle,
          bio: candidate.bio,
          budgetRange: candidate.budgetRange || (user ? user.budgetRange || '' : ''),
          sharedInterests: scoreInfo.sharedInterests.length ? scoreInfo.sharedInterests : normalizeInterests(candidate.interests || []),
          score,
          scoreBreakdown: scoreInfo.breakdown,
          dateCompatibility: scoreInfo.dateInfo.overlaps ? 'Overlapping dates' : 'Similar travel window',
          traveler: user
            ? {
                id: user.id,
                fullName: user.fullName,
                city: user.city || 'India',
                age: user.age || '',
                gender: user.gender || '',
                verified: Boolean(user.verified),
                travelStyle: user.travelStyle || candidate.travelStyle || '',
                budgetRange: user.budgetRange || candidate.budgetRange || '',
                pastTrips: user.pastTrips || candidate.pastTrips || '',
                profileCompleteness: user.profileCompleteness || calculateProfileCompleteness(user, candidate),
                profileImage: user.profileImage || avatarForUser(user),
              }
            : {
                id: candidate.userId,
                fullName: 'Traveler',
                city: 'India',
                age: '',
                gender: '',
                verified: false,
                travelStyle: candidate.travelStyle || '',
                budgetRange: candidate.budgetRange || '',
                pastTrips: candidate.pastTrips || '',
                profileCompleteness: 0,
                profileImage: avatarForUser({ fullName: 'Traveler', id: candidate.userId }),
              },
        };
      })
      .sort((a, b) => b.score - a.score);
  } else {
    // If user has not created a trip yet, show all available candidates with high baseline score
    const mockScores = [96, 94, 91, 88, 86, 84, 82, 80];
    matches = allCandidates.map((candidate, idx) => {
      const user = db.users.find((item) => item.id === candidate.userId);
      const score = mockScores[idx % mockScores.length];

      return {
        matchProfileId: candidate.id,
        destination: candidate.destination,
        startDate: candidate.startDate,
        endDate: candidate.endDate,
        travelStyle: candidate.travelStyle,
        bio: candidate.bio,
        budgetRange: candidate.budgetRange || (user ? user.budgetRange || '' : ''),
        sharedInterests: normalizeInterests(candidate.interests || (user ? user.interests : [])),
        score,
        scoreBreakdown: { destination: 45, dates: 25, style: 10, budget: 10, interests: 6 },
        dateCompatibility: 'Upcoming 2026 trip',
        traveler: user
          ? {
              id: user.id,
              fullName: user.fullName,
              city: user.city || 'India',
              age: user.age || '',
              gender: user.gender || '',
              verified: Boolean(user.verified),
              travelStyle: user.travelStyle || candidate.travelStyle || '',
              budgetRange: user.budgetRange || candidate.budgetRange || '',
              pastTrips: user.pastTrips || candidate.pastTrips || '',
              profileCompleteness: user.profileCompleteness || 90,
              profileImage: user.profileImage || avatarForUser(user),
            }
          : {
              id: candidate.userId,
              fullName: 'Traveler',
              city: 'India',
              age: '',
              gender: '',
              verified: false,
              travelStyle: candidate.travelStyle || '',
              budgetRange: candidate.budgetRange || '',
              pastTrips: candidate.pastTrips || '',
              profileCompleteness: 0,
              profileImage: avatarForUser({ fullName: 'Traveler', id: candidate.userId }),
            },
      };
    }).sort((a, b) => b.score - a.score);
  }

  return res.json({
    success: true,
    count: matches.length,
    baseProfile: sanitizeProfile(baseProfile),
    matches,
  });
});

app.post('/api/booking', (req, res) => {
  const { requesterProfileId, targetProfileId, message, plannedDestination } = req.body;

  if (!normalizeText(requesterProfileId) || !normalizeText(targetProfileId) || !normalizeText(plannedDestination)) {
    return res.status(400).json({
      success: false,
      message: 'Requester, target, and destination are required.',
    });
  }

  const requester = db.profiles.find((profile) => profile.id === requesterProfileId);
  const target = db.profiles.find((profile) => profile.id === targetProfileId);

  if (!requester || !target) {
    return res.status(404).json({
      success: false,
      message: 'One of the selected travelers no longer has an active profile.',
    });
  }

  const booking = {
    id: uid('bkg'),
    requesterProfileId,
    targetProfileId,
    plannedDestination: normalizeText(plannedDestination),
    message: normalizeText(message),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  db.bookings.push(booking);
  let conversation = getConversationForProfiles(requesterProfileId, targetProfileId);

  if (!conversation) {
    conversation = {
      id: uid('cnv'),
      memberProfileIds: [requesterProfileId, targetProfileId],
      destination: normalizeText(plannedDestination),
      lastReadAtByProfileId: {
        [requesterProfileId]: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.conversations.push(conversation);
  }

  if (normalizeText(message)) {
    if (!conversation.lastReadAtByProfileId || typeof conversation.lastReadAtByProfileId !== 'object') {
      conversation.lastReadAtByProfileId = {};
    }

    db.messages.push({
      id: uid('msg'),
      conversationId: conversation.id,
      senderProfileId: requesterProfileId,
      text: normalizeText(message),
      createdAt: new Date().toISOString(),
    });
    conversation.lastReadAtByProfileId[requesterProfileId] = new Date().toISOString();
    conversation.updatedAt = new Date().toISOString();
  }

  saveStore(db);

  return res.status(201).json({
    success: true,
    message: 'Connection request sent.',
    booking,
    conversation: getConversationView(conversation, requesterProfileId),
  });
});

// conversations list for a user with latest message and partner info


app.get('/api/conversations/:userId', (req, res) => {
  const profile = findLatestProfileByUserId(req.params.userId);

  if (!profile) {
    return res.status(400).json({
      success: false,
      message: 'Save your travel preferences first to unlock chats.',
    });
  }

  const conversations = db.conversations
    .filter((conversation) => (conversation.memberProfileIds || []).includes(profile.id))
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
    )
    .map((conversation) => getConversationView(conversation, profile.id));

  return res.json({
    success: true,
    profileId: profile.id,
    conversations,
  });
});

app.get('/api/messages/:conversationId', (req, res) => {
  const conversation = db.conversations.find((item) => item.id === req.params.conversationId);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found.',
    });
  }

  const messages = db.messages
    .filter((message) => message.conversationId === conversation.id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((message) => {
      const senderProfile = db.profiles.find((profile) => profile.id === message.senderProfileId);
      const senderUser = senderProfile
        ? db.users.find((user) => user.id === senderProfile.userId)
        : null;

      return {
        id: message.id,
        conversationId: message.conversationId,
        senderProfileId: message.senderProfileId,
        text: message.text,
        createdAt: message.createdAt,
        senderName: senderUser ? senderUser.fullName : 'Traveler',
      };
    });

  return res.json({
    success: true,
    messages,
  });
});

app.post('/api/conversations/:conversationId/read', (req, res) => {
  const { profileId } = req.body;
  const conversation = db.conversations.find((item) => item.id === req.params.conversationId);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found.',
    });
  }

  if (!normalizeText(profileId) || (conversation.memberProfileIds || []).includes(profileId) === false) {
    return res.status(403).json({
      success: false,
      message: 'You are not allowed to mark this conversation as read.',
    });
  }

  markConversationRead(conversation, profileId);
  saveStore(db);

  return res.json({
    success: true,
    conversation: getConversationView(conversation, profileId),
  });
});

app.post('/api/messages', (req, res) => {
  const { conversationId, senderProfileId, text } = req.body;

  if (!normalizeText(conversationId) || !normalizeText(senderProfileId) || !normalizeText(text)) {
    return res.status(400).json({
      success: false,
      message: 'Conversation, sender, and message text are required.',
    });
  }

  const conversation = db.conversations.find((item) => item.id === conversationId);
  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found.',
    });
  }

  // ensure sender is part of the conversation


  if ((conversation.memberProfileIds || []).includes(senderProfileId) === false) {
    return res.status(403).json({
      success: false,
      message: 'You are not part of this conversation.',
    });
  }

  const message = {
    id: uid('msg'),
    conversationId,
    senderProfileId,
    text: normalizeText(text),
    createdAt: new Date().toISOString(),
  };

  db.messages.push(message);
  if (!conversation.lastReadAtByProfileId || typeof conversation.lastReadAtByProfileId !== 'object') {
    conversation.lastReadAtByProfileId = {};
  }
  conversation.lastReadAtByProfileId[senderProfileId] = message.createdAt;
  conversation.updatedAt = message.createdAt;
  saveStore(db);

  return res.status(201).json({
    success: true,
    message: {
      id: message.id,
      conversationId: message.conversationId,
      senderProfileId: message.senderProfileId,
      text: message.text,
      createdAt: message.createdAt,
    },
  });
});

app.get('/api/package-selections/:conversationId', (req, res) => {
  const conversation = db.conversations.find((item) => item.id === req.params.conversationId);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found.',
    });
  }

  const selections = db.packageSelections
    .filter((selection) => selection.conversationId === conversation.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(getPackageSelectionView);

  return res.json({
    success: true,
    selections,
  });
});

app.post('/api/package-selections', (req, res) => {
  const {
    conversationId,
    selectedByProfileId,
    packageId,
    packageName,
    company,
    destination,
    facilityType,
    agreedBudget,
    preferredMonth,
  } = req.body;

  if (
    !normalizeText(conversationId) ||
    !normalizeText(selectedByProfileId) ||
    !normalizeText(packageId) ||
    !normalizeText(packageName) ||
    !normalizeText(company)
  ) {
    return res.status(400).json({
      success: false,
      message: 'Conversation, traveler, package id, package name, and company are required.',
    });
  }

  const conversation = db.conversations.find((item) => item.id === conversationId);
  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found.',
    });
  }

  if ((conversation.memberProfileIds || []).includes(selectedByProfileId) === false) {
    return res.status(403).json({
      success: false,
      message: 'You are not part of this conversation.',
    });
  }

  const existingSelection = db.packageSelections.find((selection) => {
    return selection.conversationId === conversationId && selection.packageId === packageId;
  });

  const selection = existingSelection || {
    id: uid('pkgsel'),
    conversationId,
    createdAt: new Date().toISOString(),
  };

  selection.selectedByProfileId = selectedByProfileId;
  selection.packageId = normalizeText(packageId);
  selection.packageName = normalizeText(packageName);
  selection.company = normalizeText(company);
  selection.destination = normalizeText(destination);
  selection.facilityType = normalizeText(facilityType);
  selection.agreedBudget = normalizeText(agreedBudget);
  selection.preferredMonth = normalizeText(preferredMonth);
  selection.status = 'shortlisted';

  if (!existingSelection) {
    db.packageSelections.push(selection);
  }

  const summaryBits = [
    `Package shortlisted: ${selection.packageName}`,
    selection.company,
    selection.facilityType ? `${selection.facilityType} facility` : '',
    selection.agreedBudget ? `budget ${selection.agreedBudget}` : '',
    selection.preferredMonth ? `travel month ${selection.preferredMonth}` : '',
  ].filter(Boolean);

  const message = {
    id: uid('msg'),
    conversationId,
    senderProfileId: selectedByProfileId,
    text: summaryBits.join(' | '),
    createdAt: new Date().toISOString(),
  };

  db.messages.push(message);
  if (!conversation.lastReadAtByProfileId || typeof conversation.lastReadAtByProfileId !== 'object') {
    conversation.lastReadAtByProfileId = {};
  }
  conversation.lastReadAtByProfileId[selectedByProfileId] = message.createdAt;
  conversation.updatedAt = message.createdAt;
  saveStore(db);

  return res.status(201).json({
    success: true,
    selection: getPackageSelectionView(selection),
    message: {
      id: message.id,
      text: message.text,
      createdAt: message.createdAt,
    },
  });
});

app.post('/api/package-booking-requests', (req, res) => {
  const {
    conversationId,
    requestedByProfileId,
    packageId,
    packageName,
    company,
    destination,
    facilityType,
    price,
    travelerCount,
    agreedBudget,
    preferredMonth,
  } = req.body;

  if (
    !normalizeText(conversationId) ||
    !normalizeText(requestedByProfileId) ||
    !normalizeText(packageId) ||
    !normalizeText(packageName) ||
    !normalizeText(company)
  ) {
    return res.status(400).json({
      success: false,
      message: 'Conversation, traveler, package id, package name, and company are required.',
    });
  }

  const conversation = db.conversations.find((item) => item.id === conversationId);
  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found.',
    });
  }

  if ((conversation.memberProfileIds || []).includes(requestedByProfileId) === false) {
    return res.status(403).json({
      success: false,
      message: 'You are not part of this conversation.',
    });
  }

  const bookingRequest = {
    id: uid('pkgreq'),
    conversationId,
    requestedByProfileId,
    packageId: normalizeText(packageId),
    packageName: normalizeText(packageName),
    company: normalizeText(company),
    destination: normalizeText(destination),
    facilityType: normalizeText(facilityType),
    price: normalizeText(price),
    travelerCount: Math.max(2, Number(travelerCount || 2)),
    agreedBudget: normalizeText(agreedBudget),
    preferredMonth: normalizeText(preferredMonth),
    commissionRate: 12,
    status: 'requested',
    createdAt: new Date().toISOString(),
  };

  db.packageBookingRequests.push(bookingRequest);
  db.messages.push({
    id: uid('msg'),
    conversationId,
    senderProfileId: requestedByProfileId,
    text: `Booking request created for ${bookingRequest.packageName} by ${bookingRequest.company} | ${bookingRequest.price} | ${bookingRequest.travelerCount} travelers | TripZen commission 12%`,
    createdAt: bookingRequest.createdAt,
  });
  conversation.updatedAt = bookingRequest.createdAt;
  if (!conversation.lastReadAtByProfileId || typeof conversation.lastReadAtByProfileId !== 'object') {
    conversation.lastReadAtByProfileId = {};
  }
  conversation.lastReadAtByProfileId[requestedByProfileId] = bookingRequest.createdAt;
  saveStore(db);

  return res.status(201).json({
    success: true,
    bookingRequest,
  });
});

app.post('/api/payments/create-order', async (req, res) => {
  const {
    conversationId,
    profileId,
    packageId,
    packageName,
    company,
    destination,
    facilityType,
    price,
    priceValue,
    travelerCount,
    preferredMonth,
    leadName,
    leadPhone,
    slug,
  } = req.body;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return res.status(503).json({
      success: false,
      message: 'Razorpay is not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET, then restart the server.',
    });
  }

  const effectiveProfileId = normalizeText(profileId) || 'traveler-direct';

  if (
    !normalizeText(packageId) ||
    !normalizeText(packageName) ||
    !normalizeText(company)
  ) {
    return res.status(400).json({
      success: false,
      message: 'Package details and company are required for payment.',
    });
  }

  const normalizedConvId = normalizeText(conversationId);
  if (normalizedConvId) {
    const conversation = db.conversations.find((item) => item.id === normalizedConvId);
    if (!conversation || (conversation.memberProfileIds || []).includes(profileId) === false) {
      return res.status(403).json({
        success: false,
        message: 'Invalid conversation for this traveler profile.',
      });
    }
  }

  const parsedPrice = Number(priceValue || 0);
  const parsedTravelerCount = Math.max(1, Number(travelerCount || 1));
  if (!Number.isFinite(parsedPrice) || parsedPrice <= 0 || !Number.isFinite(parsedTravelerCount)) {
    return res.status(400).json({
      success: false,
      message: 'Package price and traveler count must be valid.',
    });
  }

  const amount = Math.round(parsedPrice * parsedTravelerCount);
  const amountPaise = amount * 100;
  const payment = {
    id: uid('pay'),
    conversationId,
    profileId: effectiveProfileId,
    packageId: normalizeText(packageId),
    packageName: normalizeText(packageName),
    company: normalizeText(company),
    destination: normalizeText(destination),
    facilityType: normalizeText(facilityType),
    price: normalizeText(price),
    priceValue: parsedPrice,
    travelerCount: parsedTravelerCount,
    amount,
    currency: 'INR',
    preferredMonth: normalizeText(preferredMonth),
    leadName: normalizeText(leadName) || 'Traveler',
    leadPhone: normalizeText(leadPhone) || '',
    slug: normalizeText(slug) || '',
    bookingRef: `TZ-${Date.now().toString().slice(-6).toUpperCase()}`,
    status: 'created',
    razorpayOrderId: '',
    razorpayPaymentId: '',
    razorpaySignature: '',
    createdAt: new Date().toISOString(),
    paidAt: '',
  };

  try {
    const order = await razorpayRequest('POST', '/v1/orders', {
      amount: amountPaise,
      currency: 'INR',
      receipt: payment.id.slice(0, 40),
      notes: {
        tripzenPaymentId: payment.id,
        packageId: payment.packageId,
        conversationId: payment.conversationId,
        leadPhone: payment.leadPhone,
      },
    });

    payment.razorpayOrderId = order.id;
    db.payments.push(payment);
    saveStore(db);

    return res.status(201).json({
      success: true,
      keyId: RAZORPAY_KEY_ID,
      orderId: order.id,
      payment: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        packageName: payment.packageName,
        company: payment.company,
        travelerCount: payment.travelerCount,
        bookingRef: payment.bookingRef,
      },
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: error.message,
    });
  }
});

app.post('/api/payments/verify', async (req, res) => {
  const { paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  const payment = db.payments.find((item) => item.id === paymentId);

  if (!payment || payment.razorpayOrderId !== razorpayOrderId) {
    return res.status(404).json({
      success: false,
      message: 'Payment order not found.',
    });
  }

  const hostUrl = `${req.protocol}://${req.get('host')}`;
  const itineraryUrl = `${hostUrl}/itineraries/${payment.slug || 'chopta-tungnath'}.html`;
  const bookingTimeFormatted = new Date(payment.paidAt || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  if (payment.status === 'paid') {
    const bookingRef = payment.bookingRef || `TZ-${payment.id.slice(-6).toUpperCase()}`;
    const whatsappMessage = buildTripzenWhatsAppMessage({
      leadName: payment.leadName,
      bookingRef,
      packageName: payment.packageName,
      destination: payment.destination,
      company: payment.company,
      travelerCount: payment.travelerCount,
      preferredMonth: payment.preferredMonth,
      bookingTime: bookingTimeFormatted,
      amount: payment.amount,
      paymentId: payment.razorpayPaymentId,
      itineraryUrl,
    });

    const dispatchResult = await dispatchAutomatedTripzenWhatsApp({
      to: payment.leadPhone,
      recipientName: payment.leadName,
      message: whatsappMessage,
      bookingRef,
      metadata: { paymentId: payment.id, amount: payment.amount },
    });

    return res.json({
      success: true,
      payment,
      whatsapp: {
        ...dispatchResult,
        itineraryUrl,
        bookingTime: bookingTimeFormatted,
      },
    });
  }

  const verified = verifyRazorpaySignature(payment.razorpayOrderId, razorpayPaymentId, razorpaySignature);
  if (!verified) {
    payment.status = 'failed';
    payment.failureReason = 'Razorpay signature mismatch';
    saveStore(db);
    return res.status(400).json({
      success: false,
      message: 'Payment verification failed.',
    });
  }

  payment.status = 'paid';
  payment.razorpayPaymentId = normalizeText(razorpayPaymentId);
  payment.razorpaySignature = normalizeText(razorpaySignature);
  payment.paidAt = new Date().toISOString();
  if (!payment.bookingRef) {
    payment.bookingRef = `TZ-${Date.now().toString().slice(-6).toUpperCase()}`;
  }

  const conversation = db.conversations.find((item) => item.id === payment.conversationId);
  if (conversation) {
    const timestamp = payment.paidAt;
    db.messages.push({
      id: uid('msg'),
      conversationId: conversation.id,
      senderProfileId: payment.profileId,
      text: `Payment completed for ${payment.packageName} by ${payment.company} | INR ${payment.amount} | ${payment.travelerCount} traveler(s)`,
      createdAt: timestamp,
    });
    conversation.updatedAt = timestamp;
  }

  const bookingRef = payment.bookingRef;
  const whatsappMessage = buildTripzenWhatsAppMessage({
    leadName: payment.leadName,
    bookingRef,
    packageName: payment.packageName,
    destination: payment.destination,
    company: payment.company,
    travelerCount: payment.travelerCount,
    preferredMonth: payment.preferredMonth,
    bookingTime: bookingTimeFormatted,
    amount: payment.amount,
    paymentId: payment.razorpayPaymentId,
    itineraryUrl,
  });

  const dispatchResult = await dispatchAutomatedTripzenWhatsApp({
    to: payment.leadPhone,
    recipientName: payment.leadName,
    message: whatsappMessage,
    bookingRef,
    metadata: { paymentId: payment.id, amount: payment.amount },
  });

  payment.whatsappDispatched = true;
  payment.whatsappDeliveryId = dispatchResult.deliveryId;
  saveStore(db);

  return res.json({
    success: true,
    payment,
    whatsapp: {
      ...dispatchResult,
      itineraryUrl,
      bookingTime: bookingTimeFormatted,
    },
  });
});

app.post('/api/payments/resend-whatsapp', async (req, res) => {
  const { paymentId, bookingRef } = req.body;
  const payment = db.payments.find((item) => (paymentId && item.id === paymentId) || (bookingRef && item.bookingRef === bookingRef));

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Booking record not found.',
    });
  }

  const hostUrl = `${req.protocol}://${req.get('host')}`;
  const itineraryUrl = `${hostUrl}/itineraries/${payment.slug || 'chopta-tungnath'}.html`;
  const bookingTimeFormatted = new Date(payment.paidAt || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const ref = payment.bookingRef || `TZ-${payment.id.slice(-6).toUpperCase()}`;
  const whatsappMessage = buildTripzenWhatsAppMessage({
    leadName: payment.leadName,
    bookingRef: ref,
    packageName: payment.packageName,
    destination: payment.destination,
    company: payment.company,
    travelerCount: payment.travelerCount,
    preferredMonth: payment.preferredMonth,
    bookingTime: bookingTimeFormatted,
    amount: payment.amount,
    paymentId: payment.razorpayPaymentId,
    itineraryUrl,
  });

  const dispatchResult = await dispatchAutomatedTripzenWhatsApp({
    to: payment.leadPhone,
    recipientName: payment.leadName,
    message: whatsappMessage,
    bookingRef: ref,
    metadata: { paymentId: payment.id, resend: true },
  });

  return res.json({
    success: true,
    message: `Official WhatsApp confirmation re-dispatched to ${dispatchResult.recipientNumber}!`,
    whatsapp: {
      ...dispatchResult,
      itineraryUrl,
      bookingTime: bookingTimeFormatted,
    },
  });
});

app.get('/api/bookings', (req, res) => {
  const hostUrl = `${req.protocol}://${req.get('host')}`;
  const paidBookings = (db.payments || [])
    .filter((item) => item.status === 'paid' || item.paidAt)
    .sort((a, b) => new Date(b.paidAt || b.createdAt) - new Date(a.paidAt || a.createdAt))
    .map((payment) => {
      const cleanPhone = String(payment.leadPhone || '').replace(/\D/g, '');
      const formattedPhone = cleanPhone.length === 10 ? '+91 ' + cleanPhone : '+' + cleanPhone;
      const rawCleanPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
      const ref = payment.bookingRef || `TZ-${payment.id.slice(-6).toUpperCase()}`;
      const itineraryUrl = `${hostUrl}/itineraries/${payment.slug || 'chopta-tungnath'}.html`;
      const bookingTime = new Date(payment.paidAt || payment.createdAt || Date.now()).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const whatsappMessage = buildTripzenWhatsAppMessage({
        leadName: payment.leadName,
        bookingRef: ref,
        packageName: payment.packageName,
        destination: payment.destination,
        company: payment.company,
        travelerCount: payment.travelerCount,
        preferredMonth: payment.preferredMonth,
        bookingTime,
        amount: payment.amount,
        paymentId: payment.razorpayPaymentId,
        itineraryUrl,
      });

      return {
        id: payment.id,
        bookingRef: ref,
        packageName: payment.packageName,
        destination: payment.destination,
        company: payment.company,
        facilityType: payment.facilityType,
        travelerCount: payment.travelerCount,
        amount: payment.amount,
        currency: payment.currency || 'INR',
        leadName: payment.leadName,
        leadPhone: payment.leadPhone,
        formattedPhone,
        rawCleanPhone,
        preferredMonth: payment.preferredMonth,
        bookingTime,
        paidAt: payment.paidAt,
        status: payment.status,
        razorpayPaymentId: payment.razorpayPaymentId,
        razorpayOrderId: payment.razorpayOrderId,
        slug: payment.slug,
        itineraryUrl,
        whatsappMessage,
        directSendUrl: `https://api.whatsapp.com/send?phone=${rawCleanPhone}&text=${encodeURIComponent(whatsappMessage)}`,
        supportChatUrl: `https://api.whatsapp.com/send?phone=${TRIPZEN_OFFICIAL_WHATSAPP.replace(/\D/g, '') || '918920632874'}&text=${encodeURIComponent('Hi Tripzen Support, I need assistance regarding my booking ' + ref)}`,
      };
    });

  return res.json({
    success: true,
    bookings: paidBookings,
    totalCount: paidBookings.length,
  });
});

app.get('/api/bookings/user/:userId', (req, res) => {
  const { userId } = req.params;
  const user = db.users.find((u) => u.id === userId);
  const profile = db.profiles.find((p) => p.userId === userId);
  const userProfileId = profile ? profile.id : '';

  const hostUrl = `${req.protocol}://${req.get('host')}`;
  const userBookings = (db.payments || [])
    .filter((item) => {
      const isPaid = item.status === 'paid' || item.paidAt;
      if (!isPaid) return false;
      if (item.profileId === userProfileId || item.profileId === userId) return true;
      if (user && item.leadPhone && user.phone && item.leadPhone.replace(/\D/g, '') === user.phone.replace(/\D/g, '')) return true;
      if (user && item.leadName && user.fullName && item.leadName.toLowerCase().trim() === user.fullName.toLowerCase().trim()) return true;
      return true; // Return all for now if direct booking
    })
    .sort((a, b) => new Date(b.paidAt || b.createdAt) - new Date(a.paidAt || a.createdAt))
    .map((payment) => {
      const cleanPhone = String(payment.leadPhone || '').replace(/\D/g, '');
      const formattedPhone = cleanPhone.length === 10 ? '+91 ' + cleanPhone : '+' + cleanPhone;
      const rawCleanPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
      const ref = payment.bookingRef || `TZ-${payment.id.slice(-6).toUpperCase()}`;
      const itineraryUrl = `${hostUrl}/itineraries/${payment.slug || 'chopta-tungnath'}.html`;
      const bookingTime = new Date(payment.paidAt || payment.createdAt || Date.now()).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const whatsappMessage = buildTripzenWhatsAppMessage({
        leadName: payment.leadName,
        bookingRef: ref,
        packageName: payment.packageName,
        destination: payment.destination,
        company: payment.company,
        travelerCount: payment.travelerCount,
        preferredMonth: payment.preferredMonth,
        bookingTime,
        amount: payment.amount,
        paymentId: payment.razorpayPaymentId,
        itineraryUrl,
      });

      return {
        id: payment.id,
        bookingRef: ref,
        packageName: payment.packageName,
        destination: payment.destination,
        company: payment.company,
        facilityType: payment.facilityType,
        travelerCount: payment.travelerCount,
        amount: payment.amount,
        currency: payment.currency || 'INR',
        leadName: payment.leadName,
        leadPhone: payment.leadPhone,
        formattedPhone,
        rawCleanPhone,
        preferredMonth: payment.preferredMonth,
        bookingTime,
        paidAt: payment.paidAt,
        status: payment.status,
        razorpayPaymentId: payment.razorpayPaymentId,
        razorpayOrderId: payment.razorpayOrderId,
        slug: payment.slug,
        itineraryUrl,
        whatsappMessage,
        directSendUrl: `https://api.whatsapp.com/send?phone=${rawCleanPhone}&text=${encodeURIComponent(whatsappMessage)}`,
        supportChatUrl: `https://api.whatsapp.com/send?phone=${TRIPZEN_OFFICIAL_WHATSAPP.replace(/\D/g, '') || '918920632874'}&text=${encodeURIComponent('Hi Tripzen Support, I need assistance regarding my booking ' + ref)}`,
      };
    });

  return res.json({
    success: true,
    bookings: userBookings,
    totalCount: userBookings.length,
  });
});


app.get('/api/admin/whatsapp-logs', requireAdmin, (req, res) => {
  return res.json({
    success: true,
    count: (db.whatsappLogs || []).length,
    logs: (db.whatsappLogs || []).slice(-100).reverse(),
  });
});

app.get('/api/trip-groups/:userId', (req, res) => {
  const requestedUserId = req.params.userId;
  const profile = requestedUserId && requestedUserId !== 'all' ? findLatestProfileByUserId(requestedUserId) : null;
  const viewerProfileId = profile ? profile.id : '';
  const { destination, hideFull, tab, search } = req.query;

  let groups = (db.tripGroups || []).filter((group) => group.status !== 'closed' && group.status !== 'deleted');

  // Destination filter
  if (destination && destination !== 'All' && destination !== '') {
    groups = groups.filter((group) => normalizeDestination(group.destination) === normalizeDestination(destination));
  }

  // Search filter
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    groups = groups.filter((g) =>
      (g.title || '').toLowerCase().includes(q) ||
      (g.destination || '').toLowerCase().includes(q) ||
      (g.agencyName || '').toLowerCase().includes(q) ||
      (g.inclusions || '').toLowerCase().includes(q)
    );
  }

  // Tab filter
  if (tab === 'my' && viewerProfileId) {
    groups = groups.filter((g) => g.organizerProfileId === viewerProfileId);
  } else if (tab === 'agency') {
    groups = groups.filter((g) => Boolean(g.agencyName) || g.agencyVerified);
  }

  // Hide full filter
  if (hideFull === 'true' || hideFull === true) {
    groups = groups.filter((g) => {
      const count = Array.isArray(g.memberProfileIds) ? g.memberProfileIds.length : 0;
      const max = Number(g.maxMembers || 4);
      return count < max && g.status !== 'full';
    });
  }

  const result = groups
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .map((group) => buildTripGroupView(group, viewerProfileId));

  return res.json({
    success: true,
    groups: result,
    totalCount: result.length,
  });
});

app.post('/api/trip-groups', (req, res) => {
  const {
    organizerProfileId,
    agencyName,
    title,
    destination,
    batchDates,
    startDate,
    endDate,
    pricePerPerson,
    estimatedTotalCost,
    maxMembers,
    inclusions,
    contactPhone,
  } = req.body;

  const organizerProfile = db.profiles.find((profile) => profile.id === organizerProfileId);
  const organizerUser = organizerProfile ? db.users.find((u) => u.id === organizerProfile.userId) : null;
  const normalizedTitle = normalizeText(title);
  const targetDestination = normalizeText(destination) || (organizerProfile ? normalizeText(organizerProfile.destination) : 'Kedarnath');
  const parsedPricePerPerson = Number(pricePerPerson || 0) || (estimatedTotalCost && maxMembers ? Math.round(Number(estimatedTotalCost) / Number(maxMembers)) : 4999);
  const parsedMaxMembers = Math.min(30, Math.max(2, Number(maxMembers || 6)));
  const computedTotalCost = parsedPricePerPerson * parsedMaxMembers;

  if (!organizerProfile || !normalizedTitle || !targetDestination) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a trip title, destination, and pricing.',
    });
  }

  if (parsedPricePerPerson <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Price per person must be greater than zero (INR).',
    });
  }

  const timestamp = new Date().toISOString();
  const resolvedAgency = normalizeText(agencyName) || (organizerUser ? organizerUser.fullName : 'TripZen Tour Partner');
  const resolvedDates = normalizeText(batchDates) || (startDate && endDate ? `${startDate} to ${endDate}` : 'Upcoming Weekend');
  const resolvedInclusions = normalizeText(inclusions) || 'Swiss Tents Stay + All Meals + Trek Guide + Forest Permits + Transport';
  const resolvedPhone = normalizeText(contactPhone) || (organizerUser ? organizerUser.phone : '+91 89206 32874');

  const conversation = {
    id: uid('cnv'),
    type: 'group',
    title: normalizedTitle,
    memberProfileIds: [organizerProfileId],
    destination: targetDestination,
    groupId: '',
    lastReadAtByProfileId: {
      [organizerProfileId]: timestamp,
    },
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const group = {
    id: uid('grp'),
    organizerProfileId,
    agencyName: resolvedAgency,
    agencyVerified: true,
    title: normalizedTitle,
    destination: targetDestination,
    batchDates: resolvedDates,
    startDate: startDate || '2026-06-01',
    endDate: endDate || '2026-06-07',
    pricePerPerson: parsedPricePerPerson,
    estimatedTotalCost: computedTotalCost,
    maxMembers: parsedMaxMembers,
    inclusions: resolvedInclusions,
    contactPhone: resolvedPhone,
    memberProfileIds: [organizerProfileId],
    status: 'open',
    conversationId: conversation.id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  conversation.groupId = group.id;
  db.conversations.push(conversation);
  db.messages.push({
    id: uid('msg'),
    conversationId: conversation.id,
    senderProfileId: organizerProfileId,
    text: `🏔️ Group Trip Batch published by ${resolvedAgency}: ${group.title} for ${group.destination} | Fixed Price: INR ${parsedPricePerPerson.toLocaleString('en-IN')}/person (${parsedMaxMembers} slots total).`,
    createdAt: timestamp,
  });
  db.tripGroups.push(group);
  saveStore(db);

  return res.status(201).json({
    success: true,
    message: 'Group trip batch successfully published!',
    group: buildTripGroupView(group, organizerProfileId),
    conversation: getConversationView(conversation, organizerProfileId),
  });
});

app.post('/api/trip-groups/:groupId/join', (req, res) => {
  const { requesterProfileId } = req.body;
  const group = db.tripGroups.find((item) => item.id === req.params.groupId);
  const requesterProfile = db.profiles.find((profile) => profile.id === requesterProfileId);
  const requesterUser = requesterProfile ? db.users.find((u) => u.id === requesterProfile.userId) : null;

  if (!group || group.status === 'closed' || group.status === 'deleted') {
    return res.status(404).json({
      success: false,
      message: 'Trip group batch not found or no longer active.',
    });
  }

  if (!normalizeText(requesterProfileId) || !requesterProfile) {
    return res.status(400).json({
      success: false,
      message: 'Please complete your profile to join this trip group.',
    });
  }

  group.memberProfileIds = Array.isArray(group.memberProfileIds) ? group.memberProfileIds : [];

  if (group.memberProfileIds.includes(requesterProfileId)) {
    return res.json({
      success: true,
      message: 'You are already a confirmed member of this squad.',
      group: buildTripGroupView(group, requesterProfileId),
    });
  }

  const maxMembers = Number(group.maxMembers || 4);
  if (group.memberProfileIds.length >= maxMembers || group.status === 'full') {
    return res.status(400).json({
      success: false,
      message: 'This group trip has reached full capacity (Sold Out).',
    });
  }

  // Add member
  group.memberProfileIds.push(requesterProfileId);
  const memberCount = group.memberProfileIds.length;
  if (memberCount >= maxMembers) {
    group.status = 'full';
  }
  group.updatedAt = new Date().toISOString();

  // Add member to group chat conversation
  const conversation = db.conversations.find((item) => item.id === group.conversationId);
  if (conversation) {
    if (!conversation.memberProfileIds.includes(requesterProfileId)) {
      conversation.memberProfileIds.push(requesterProfileId);
      conversation.updatedAt = new Date().toISOString();
    }
    db.messages.push({
      id: uid('msg'),
      conversationId: conversation.id,
      senderProfileId: requesterProfileId,
      text: `🎉 ${requesterUser ? requesterUser.fullName : 'A new traveler'} has joined this group trip! (${memberCount}/${maxMembers} slots filled)`,
      createdAt: new Date().toISOString(),
    });
  }

  saveStore(db);

  return res.json({
    success: true,
    message: `🎉 You successfully joined ${group.title}! (${memberCount}/${maxMembers} slots filled)`,
    group: buildTripGroupView(group, requesterProfileId),
    conversation: conversation ? getConversationView(conversation, requesterProfileId) : null,
  });
});

app.post('/api/trip-groups/:groupId/leave', (req, res) => {
  const { profileId } = req.body;
  const group = db.tripGroups.find((item) => item.id === req.params.groupId);
  if (!group) {
    return res.status(404).json({ success: false, message: 'Group not found.' });
  }

  group.memberProfileIds = (group.memberProfileIds || []).filter((id) => id !== profileId);
  if (group.status === 'full') {
    group.status = 'open';
  }
  group.updatedAt = new Date().toISOString();

  const conversation = db.conversations.find((item) => item.id === group.conversationId);
  if (conversation) {
    conversation.memberProfileIds = (conversation.memberProfileIds || []).filter((id) => id !== profileId);
  }

  saveStore(db);

  return res.json({
    success: true,
    message: 'You have left this squad. The slot is now open for other travelers.',
    group: buildTripGroupView(group, profileId),
  });
});

app.delete('/api/trip-groups/:groupId', (req, res) => {
  const { organizerProfileId, userId } = req.body;
  const groupIndex = (db.tripGroups || []).findIndex((item) => item.id === req.params.groupId);

  if (groupIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Group trip not found.',
    });
  }

  const group = db.tripGroups[groupIndex];
  const organizerProfile = db.profiles.find((p) => p.id === group.organizerProfileId);
  const isOwner =
    group.organizerProfileId === organizerProfileId ||
    (organizerProfile && organizerProfile.userId === userId) ||
    !organizerProfileId;

  if (!isOwner) {
    return res.status(403).json({
      success: false,
      message: 'Only the creator or agency organizer can delete this group trip.',
    });
  }

  // Remove group from store
  db.tripGroups.splice(groupIndex, 1);
  saveStore(db);

  return res.json({
    success: true,
    message: 'Group trip batch successfully deleted.',
  });
});

app.get('/api/admin/data', requireAdmin, (req, res) => {
  return res.json({
    success: true,
    generatedAt: new Date().toISOString(),
    totals: {
      users: db.users.length,
      profiles: latestProfilesPerUser().length,
      bookings: db.bookings.length,
      conversations: db.conversations.length,
      messages: db.messages.length,
      tripGroups: db.tripGroups.length,
      joinRequests: db.joinRequests.length,
      packageSelections: db.packageSelections.length,
      packageBookingRequests: db.packageBookingRequests.length,
      payments: db.payments.length,
    },
    users: db.users.map(sanitizeAdminUser),
    profiles: db.profiles.map(sanitizeProfile).filter(Boolean),
    bookings: db.bookings,
    conversations: db.conversations,
    messages: db.messages,
    tripGroups: db.tripGroups,
    joinRequests: db.joinRequests,
    packageSelections: db.packageSelections,
    packageBookingRequests: db.packageBookingRequests,
    payments: db.payments,
  });
});

// simple dashboard endpoint for admin to see totals and recent users

app.get('/api/dashboard', (req, res) => {
  const recentUsers = [...db.users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map(sanitizeUser);

  return res.json({
    success: true,
    totals: {
      users: db.users.length,
      profiles: latestProfilesPerUser().length,
      bookings: db.bookings.length,
    },
    latestUsers: recentUsers,
    destinations: DESTINATIONS,
  });
});


// seed demo data endpoint for quick testing and development


app.post('/api/seed-demo', (req, res) => {
  const demoUsers = [
    // Chopta Tungnath Travelers
    {
      id: uid('usr'),
      fullName: 'Aarav Sharma',
      email: 'aarav@tripzen.com',
      password: 'demo123',
      age: '26',
      gender: 'Male',
      city: 'Delhi',
      interests: ['trekking', 'mountain photography', 'sunrise hikes', 'campfire & stargazing'],
      travelStyle: 'Solo',
      pastTrips: 'Triund, Nag Tibba, Prashar Lake',
      budgetRange: '5000-9000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Meera Joshi',
      email: 'meera@tripzen.com',
      password: 'demo123',
      age: '25',
      gender: 'Female',
      city: 'Rishikesh',
      interests: ['camping', 'local food & culture', 'forest trails', 'yoga & wellness'],
      travelStyle: 'Budget',
      pastTrips: 'Chopta Winter 2024, Kunjapuri Sunrise',
      budgetRange: '3000-7000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Vikram Sethi',
      email: 'vikram@tripzen.com',
      password: 'demo123',
      age: '29',
      gender: 'Male',
      city: 'Mumbai',
      interests: ['high altitude trekking', 'campfire & stargazing', 'adventure sports'],
      travelStyle: 'Group',
      pastTrips: 'Harishchandragad, Rajmachi, Kalsubai',
      budgetRange: '7000-15000',
      verified: true,
      createdAt: new Date().toISOString(),
    },

    // Kedarkantha Travelers
    {
      id: uid('usr'),
      fullName: 'Riya Kapoor',
      email: 'riya@tripzen.com',
      password: 'demo123',
      age: '27',
      gender: 'Female',
      city: 'Delhi',
      interests: ['trekking', 'mountain photography', 'sunrise hikes', 'campfire & stargazing'],
      travelStyle: 'Luxury',
      pastTrips: 'Triund, Kasol, Manali',
      budgetRange: '7000-15000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Kabir Rawat',
      email: 'kabir@tripzen.com',
      password: 'demo123',
      age: '29',
      gender: 'Male',
      city: 'Dehradun',
      interests: ['camping', 'local food & culture', 'trekking', 'adventure sports'],
      travelStyle: 'Budget',
      pastTrips: 'Nag Tibba, Dayara Bugyal, Kuari Pass',
      budgetRange: '5000-9000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Pooja Hegde',
      email: 'pooja@tripzen.com',
      password: 'demo123',
      age: '24',
      gender: 'Female',
      city: 'Pune',
      interests: ['mountain photography', 'forest trails', 'campfire & stargazing'],
      travelStyle: 'Solo',
      pastTrips: 'Sandhan Valley, Sinhagad',
      budgetRange: '3000-7000',
      verified: true,
      createdAt: new Date().toISOString(),
    },

    // Hampta Pass & Chandratal Travelers
    {
      id: uid('usr'),
      fullName: 'Tenzin Lama',
      email: 'tenzin@tripzen.com',
      password: 'demo123',
      age: '31',
      gender: 'Male',
      city: 'Shimla',
      interests: ['high altitude trekking', 'camping', 'rivers & waterfalls', 'mountain food'],
      travelStyle: 'Group',
      pastTrips: 'Bhrigu Lake, Sar Pass, Pin Parvati',
      budgetRange: '9000-15000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Siddharth Malhotra',
      email: 'sid@tripzen.com',
      password: 'demo123',
      age: '28',
      gender: 'Male',
      city: 'Chandigarh',
      interests: ['adventure sports', 'photography', 'stargazing'],
      travelStyle: 'Solo',
      pastTrips: 'Beas Kund, Friendship Peak base',
      budgetRange: '7000-15000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Natasha Verma',
      email: 'natasha@tripzen.com',
      password: 'demo123',
      age: '26',
      gender: 'Female',
      city: 'Bengaluru',
      interests: ['wildflowers', 'remote homestays', 'scenic lakes'],
      travelStyle: 'Luxury',
      pastTrips: 'Kudremukh, Tadiandamol, Gokarna',
      budgetRange: '15000-30000',
      verified: true,
      createdAt: new Date().toISOString(),
    },

    // Valley of Flowers Travelers
    {
      id: uid('usr'),
      fullName: 'Ananya Sen',
      email: 'ananya@tripzen.com',
      password: 'demo123',
      age: '26',
      gender: 'Female',
      city: 'Bengaluru',
      interests: ['wildflowers', 'slow travel', 'mountain photography', 'forest trails'],
      travelStyle: 'Solo',
      pastTrips: 'Munnar, Coorg, Wayanad',
      budgetRange: '8000-14000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Devansh Mehta',
      email: 'devansh@tripzen.com',
      password: 'demo123',
      age: '27',
      gender: 'Male',
      city: 'Ahmedabad',
      interests: ['local food & culture', 'history & temples', 'trekking'],
      travelStyle: 'Group',
      pastTrips: 'Girnar, Mount Abu, Saputara',
      budgetRange: '7000-15000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Simran Kaur',
      email: 'simran@tripzen.com',
      password: 'demo123',
      age: '25',
      gender: 'Female',
      city: 'Chandigarh',
      interests: ['nature walks', 'photography', 'budget backpacking'],
      travelStyle: 'Budget',
      pastTrips: 'Kasauli, Chail, Shimla',
      budgetRange: '3000-7000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Kritika Rawat',
      email: 'kritika@tripzen.com',
      password: 'demo123',
      age: '27',
      gender: 'Female',
      city: 'Dehradun',
      interests: ['history & temples', 'trekking', 'campfire & stargazing'],
      travelStyle: 'Group',
      pastTrips: 'Tungnath, Chandrashila, Dayara Bugyal',
      budgetRange: '7000-15000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Rohit Negi',
      email: 'rohit@tripzen.com',
      password: 'demo123',
      age: '29',
      gender: 'Male',
      city: 'Delhi',
      interests: ['high altitude trekking', 'mountain photography', 'remote homestays'],
      travelStyle: 'Solo',
      pastTrips: 'Kinnaur Kailash, Sangla, Chitkul',
      budgetRange: '7000-15000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Gaurav Sharma',
      email: 'gaurav@tripzen.com',
      password: 'demo123',
      age: '26',
      gender: 'Male',
      city: 'Dharamshala',
      interests: ['camping', 'rivers & waterfalls', 'adventure sports'],
      travelStyle: 'Budget',
      pastTrips: 'Triund, Indrahar Pass, Bir Billing',
      budgetRange: '3000-7000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Priyanka Joshi',
      email: 'priyanka@tripzen.com',
      password: 'demo123',
      age: '28',
      gender: 'Female',
      city: 'Haridwar',
      interests: ['history & temples', 'yoga & wellness', 'slow travel'],
      travelStyle: 'Group',
      pastTrips: 'Badrinath, Rishikesh, Chopta',
      budgetRange: '7000-15000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Tashi Sherpa',
      email: 'tashi@tripzen.com',
      password: 'demo123',
      age: '32',
      gender: 'Male',
      city: 'Kathmandu',
      interests: ['high altitude trekking', 'mountain photography', 'adventure sports'],
      travelStyle: 'Solo',
      pastTrips: 'Poon Hill, Annapurna Circuit, Gokyo Ri',
      budgetRange: '15000-30000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Aditi Rao',
      email: 'aditi@tripzen.com',
      password: 'demo123',
      age: '25',
      gender: 'Female',
      city: 'Mumbai',
      interests: ['forest trails', 'rivers & waterfalls', 'local food & culture'],
      travelStyle: 'Budget',
      pastTrips: 'Manali, Kasol, Tirthan Valley',
      budgetRange: '3000-7000',
      verified: true,
      createdAt: new Date().toISOString(),
    },
  ].map((user) => ({ ...user, profileImage: avatarForUser(user) }));

  demoUsers.forEach((user) => {
    const existingIndex = db.users.findIndex((u) => u.email === user.email);
    if (existingIndex >= 0) {
      db.users[existingIndex] = { ...db.users[existingIndex], ...user };
    } else {
      db.users.push(user);
    }
  });

  const profiles = [
    // Chopta Tungnath
    {
      userEmail: 'aarav@tripzen.com',
      destination: 'Chopta Tungnath',
      startDate: '2026-08-14',
      endDate: '2026-08-17',
      travelStyle: 'Solo',
      interests: ['trekking', 'mountain photography', 'sunrise hikes', 'campfire & stargazing'],
      bio: 'Summit enthusiast aiming to catch first light from Chandrashila top. Love quiet trails and early morning ascents.',
    },
    {
      userEmail: 'meera@tripzen.com',
      destination: 'Chopta Tungnath',
      startDate: '2026-08-14',
      endDate: '2026-08-17',
      travelStyle: 'Budget',
      interests: ['camping', 'local food & culture', 'forest trails', 'yoga & wellness'],
      bio: 'Yoga instructor & backpacker heading up to Tungnath temple & Deoriatal lake. Looking for friendly travel buddies.',
    },
    {
      userEmail: 'vikram@tripzen.com',
      destination: 'Chopta Tungnath',
      startDate: '2026-08-21',
      endDate: '2026-08-24',
      travelStyle: 'Group',
      interests: ['high altitude trekking', 'campfire & stargazing', 'adventure sports'],
      bio: 'Unplugging from city life. Keen to share camp logistics, split taxi from Rishikesh, and enjoy evening campfire stories.',
    },

    // Madmaheshwar Ji
    {
      userEmail: 'kritika@tripzen.com',
      destination: 'Madmaheshwar Ji',
      startDate: '2026-09-04',
      endDate: '2026-09-07',
      travelStyle: 'Group',
      interests: ['history & temples', 'trekking', 'campfire & stargazing', 'mountain photography'],
      bio: 'Panch Kedar enthusiast excited to trek to the second Kedar and hike up to Buda Madmaheshwar ridge.',
    },

    // Yulla Kanda
    {
      userEmail: 'rohit@tripzen.com',
      destination: 'Yulla Kanda',
      startDate: '2026-09-02',
      endDate: '2026-09-05',
      travelStyle: 'Solo',
      interests: ['high altitude trekking', 'mountain photography', 'remote homestays'],
      bio: 'Heading to the sacred Krishna temple lake in Kinnaur for the Janmashtami festival batch. Looking for trekking partners.',
    },

    // Kareri Lake
    {
      userEmail: 'gaurav@tripzen.com',
      destination: 'Kareri Lake',
      startDate: '2026-09-18',
      endDate: '2026-09-21',
      travelStyle: 'Budget',
      interests: ['camping', 'rivers & waterfalls', 'adventure sports', 'local food & culture'],
      bio: 'Local explorer and hiker excited to camp alongside the crystal clear waters of Kareri Lake beneath the Dhauladhars.',
    },

    // Kedarnath Dham
    {
      userEmail: 'priyanka@tripzen.com',
      destination: 'Kedarnath Dham',
      startDate: '2026-10-01',
      endDate: '2026-10-05',
      travelStyle: 'Group',
      interests: ['history & temples', 'yoga & wellness', 'slow travel', 'trekking'],
      bio: 'Planning a mindful pilgrimage to Kedarnath Dham and Bhairavnath temple. Happy to coordinate group travel from Haridwar/Rishikesh.',
    },

    // Jibhi & Tirthan Valley
    {
      userEmail: 'aditi@tripzen.com',
      destination: 'Jibhi & Tirthan Valley',
      startDate: '2026-10-01',
      endDate: '2026-10-04',
      travelStyle: 'Budget',
      interests: ['forest trails', 'rivers & waterfalls', 'local food & culture', 'camping'],
      bio: 'Heading to Jibhi wooden cottages, Jalori Pass, and Serolsar lake hike. Looking for chill travel companions.',
    },

    // Annapurna Base Camp (ABC)
    {
      userEmail: 'tashi@tripzen.com',
      destination: 'Annapurna Base Camp (ABC)',
      startDate: '2026-10-24',
      endDate: '2026-11-03',
      travelStyle: 'Solo',
      interests: ['high altitude trekking', 'mountain photography', 'adventure sports'],
      bio: 'Passionate high-altitude trekker trekking deep into the Annapurna Sanctuary amphitheater. Let us hike together!',
    },

    // Kedarkantha
    {
      userEmail: 'riya@tripzen.com',
      destination: 'Kedarkantha',
      startDate: '2026-12-18',
      endDate: '2026-12-24',
      travelStyle: 'Luxury',
      interests: ['trekking', 'mountain photography', 'sunrise hikes', 'campfire & stargazing'],
      bio: 'Love crisp summit mornings, bonfire chats, and well-planned group treks with warm homestays.',
    },
    {
      userEmail: 'kabir@tripzen.com',
      destination: 'Kedarkantha',
      startDate: '2026-12-20',
      endDate: '2026-12-26',
      travelStyle: 'Budget',
      interests: ['camping', 'local food & culture', 'trekking', 'adventure sports'],
      bio: 'Looking for easygoing trekkers who like a strong morning pace and even stronger ginger tea.',
    },
    {
      userEmail: 'pooja@tripzen.com',
      destination: 'Kedarkantha',
      startDate: '2026-12-19',
      endDate: '2026-12-25',
      travelStyle: 'Solo',
      interests: ['mountain photography', 'forest trails', 'campfire & stargazing'],
      bio: 'Photography buff carrying full gear to capture snow summit panoramas. Excited to team up with fellow hikers.',
    },

    // Hampta Pass & Chandratal
    {
      userEmail: 'tenzin@tripzen.com',
      destination: 'Hampta Pass & Chandratal',
      startDate: '2026-09-10',
      endDate: '2026-09-16',
      travelStyle: 'Group',
      interests: ['high altitude trekking', 'camping', 'rivers & waterfalls', 'mountain food'],
      bio: 'Experienced high-altitude trekker with pass-crossing experience. Happy to share gear and trail logistics.',
    },
    {
      userEmail: 'sid@tripzen.com',
      destination: 'Hampta Pass & Chandratal',
      startDate: '2026-09-12',
      endDate: '2026-09-18',
      travelStyle: 'Solo',
      interests: ['adventure sports', 'photography', 'stargazing'],
      bio: 'Hiker heading across Hampta Pass to the moon lake of Chandratal. Let us conquer the pass together!',
    },
    {
      userEmail: 'natasha@tripzen.com',
      destination: 'Hampta Pass & Chandratal',
      startDate: '2026-09-10',
      endDate: '2026-09-16',
      travelStyle: 'Luxury',
      interests: ['wildflowers', 'remote homestays', 'scenic lakes'],
      bio: 'Looking for mindful co-trekkers for scenic Hampta meadows and Spiti valley transit.',
    },

    // Valley of Flowers
    {
      userEmail: 'ananya@tripzen.com',
      destination: 'Valley of Flowers',
      startDate: '2026-09-12',
      endDate: '2026-09-18',
      travelStyle: 'Solo',
      interests: ['wildflowers', 'slow travel', 'mountain photography', 'forest trails'],
      bio: 'Botanical enthusiast and slow traveler heading to Ghangaria and Hemkund Sahib in peak bloom.',
    },
    {
      userEmail: 'devansh@tripzen.com',
      destination: 'Valley of Flowers',
      startDate: '2026-09-14',
      endDate: '2026-09-20',
      travelStyle: 'Group',
      interests: ['local food & culture', 'history & temples', 'trekking'],
      bio: 'Excited for alpine flowers and sacred Hemkund lake. Happy to split cabs from Rishikesh/Haridwar.',
    },
  ];

  profiles.forEach((entry) => {
    const user = db.users.find((item) => item.email === entry.userEmail);
    if (!user) return;

    const timestamp = new Date().toISOString();
    const previous = db.profiles
      .filter((item) => item.userId === user.id)
      .sort((a, b) => {
        return new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime();
      })[0];
    const profile = {
      id: previous ? previous.id : uid('prf'),
      userId: user.id,
      destination: entry.destination,
      startDate: entry.startDate,
      endDate: entry.endDate,
      travelStyle: entry.travelStyle,
      budgetRange: user.budgetRange,
      genderPreference: 'Any',
      interests: entry.interests,
      bio: entry.bio,
      pastTrips: user.pastTrips,
      createdAt: previous ? previous.createdAt : timestamp,
      updatedAt: timestamp,
    };

    db.profiles = db.profiles.filter((item) => item.userId !== user.id);
    db.profiles.push(profile);
    user.profileCompleteness = calculateProfileCompleteness(user, profile);
  });

  // Seed Demo Cost-Sharing Squads if not present
  const seedSquads = [
    {
      agencyName: 'Himalayan Hikings',
      title: 'Chopta Tungnath Sunrise & Deoriatal Campers',
      organizerEmail: 'aarav@tripzen.com',
      destination: 'Chopta Tungnath',
      batchDates: '12th - 16th Oct 2026',
      pricePerPerson: 3999,
      estimatedTotalCost: 15996,
      maxMembers: 4,
      inclusions: 'Dome Tents + All Meals + Local Trek Guide + Bonfire',
      memberEmails: ['aarav@tripzen.com', 'meera@tripzen.com'],
    },
    {
      agencyName: 'Nomad Youth Treks',
      title: 'Hampta Pass & Chandratal Crossover Backpackers',
      organizerEmail: 'tenzin@tripzen.com',
      destination: 'Hampta Pass & Chandratal',
      batchDates: '18th - 23rd Oct 2026',
      pricePerPerson: 6499,
      estimatedTotalCost: 25996,
      maxMembers: 4,
      inclusions: 'Alpine Tents + 3 Meals Daily + Forest Permits + Chandratal Drive',
      memberEmails: ['tenzin@tripzen.com', 'sid@tripzen.com'],
    },
    {
      agencyName: 'Trailblazers India',
      title: 'Kedarkantha Winter Summit Shared Camp Squad',
      organizerEmail: 'kabir@tripzen.com',
      destination: 'Kedarkantha',
      batchDates: 'Upcoming Weekend',
      pricePerPerson: 4499,
      estimatedTotalCost: 17996,
      maxMembers: 4,
      inclusions: 'Juda Ka Taal Camping + Microspikes + Certified Guides + Meals',
      memberEmails: ['kabir@tripzen.com', 'pooja@tripzen.com'],
    },
    {
      agencyName: 'Sacred Trails Expeditions',
      title: 'Kedarnath Dham Spiritual Pilgrimage Squad',
      organizerEmail: 'priyanka@tripzen.com',
      destination: 'Kedarnath Dham',
      batchDates: '25th - 30th Oct 2026',
      pricePerPerson: 5999,
      estimatedTotalCost: 23996,
      maxMembers: 4,
      inclusions: 'Lodge Stay near Temple + Meals + Haridwar to Gaurikund Transport',
      memberEmails: ['priyanka@tripzen.com'],
    },
    {
      agencyName: 'Valley Bloom Adventures',
      title: 'Valley of Flowers & Hemkund Sahib Eco Squad',
      organizerEmail: 'ananya@tripzen.com',
      destination: 'Valley of Flowers',
      batchDates: '5th - 10th Nov 2026',
      pricePerPerson: 4999,
      estimatedTotalCost: 24995,
      maxMembers: 5,
      inclusions: 'Ghangaria Hotel + National Park Permits + Naturalist Guide + Meals',
      memberEmails: ['ananya@tripzen.com', 'devansh@tripzen.com'],
    },
  ];

  db.tripGroups = db.tripGroups || [];
  seedSquads.forEach((sq) => {
    const orgUser = db.users.find((u) => u.email === sq.organizerEmail);
    const orgProf = orgUser ? db.profiles.find((p) => p.userId === orgUser.id) : null;
    if (!orgProf) return;

    const memberProfileIds = sq.memberEmails
      .map((em) => {
        const u = db.users.find((user) => user.email === em);
        const p = u ? db.profiles.find((prof) => prof.userId === u.id) : null;
        return p ? p.id : null;
      })
      .filter(Boolean);

    const exists = db.tripGroups.some((g) => g.title === sq.title);
    if (!exists) {
      const timestamp = new Date().toISOString();
      const conv = {
        id: uid('cnv'),
        type: 'group',
        title: sq.title,
        memberProfileIds,
        destination: sq.destination,
        groupId: '',
        lastReadAtByProfileId: {},
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      const grp = {
        id: uid('grp'),
        organizerProfileId: orgProf.id,
        agencyName: sq.agencyName || 'Tour Agency',
        agencyVerified: true,
        title: sq.title,
        destination: sq.destination,
        batchDates: sq.batchDates || 'Upcoming Weekend',
        startDate: orgProf.startDate || '2026-06-01',
        endDate: orgProf.endDate || '2026-06-07',
        pricePerPerson: sq.pricePerPerson || 4999,
        estimatedTotalCost: sq.estimatedTotalCost || (sq.pricePerPerson * sq.maxMembers),
        maxMembers: sq.maxMembers,
        inclusions: sq.inclusions || 'Stay + Meals + Trek Guide + Forest Permits',
        contactPhone: orgUser.phone || '+91 89206 32874',
        memberProfileIds: memberProfileIds.length ? memberProfileIds : [orgProf.id],
        status: memberProfileIds.length >= sq.maxMembers ? 'full' : 'open',
        conversationId: conv.id,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      conv.groupId = grp.id;
      db.conversations.push(conv);
      db.tripGroups.push(grp);
    }
  });

  saveStore(db);

  return res.json({
    success: true,
    message: `Loaded ${demoUsers.length} demo travelers and cost-sharing squads across all destinations.`,
  });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, host, () => {
  console.log('Tripzen server running at http://localhost:' + port);
  console.log('Tripzen server running at http://127.0.0.1:' + port);
  whatsappService.initWhatsAppService();
});

