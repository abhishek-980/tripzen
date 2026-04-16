const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'data', 'store.json');
const DEFAULT_STORE = {
  users: [],
  profiles: [],
  bookings: [],
  conversations: [],
  messages: [],
};

const DESTINATIONS = [
  'Hampta Pass',
  'Kedarkantha',
  'Chopta Tungnath',
  'Valley of Flowers',
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

function loadStore() {
  try {
    if (fs.existsSync(DATA_FILE) === false) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_STORE, null, 2));
      return { users: [], profiles: [], bookings: [] };
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      profiles: Array.isArray(parsed.profiles) ? parsed.profiles : [],
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
      conversations: Array.isArray(parsed.conversations) ? parsed.conversations : [],
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
    };
  } catch (error) {
    console.error('Failed to read store:', error.message);
    return { users: [], profiles: [], bookings: [], conversations: [], messages: [] };
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

  if (normalizeDestination(base.destination) === normalizeDestination(candidate.destination)) {
    score += 45;
  }

  const dateInfo = dateWindowInfo(base.startDate, base.endDate, candidate.startDate, candidate.endDate);
  if (dateInfo.overlaps) {
    score += 25;
  } else if (dateInfo.gapDays <= 3) {
    score += Math.max(10, 22 - dateInfo.gapDays * 4);
  }

  const baseStyle = normalizeText(base.travelStyle).toLowerCase();
  const candidateStyle = normalizeText(candidate.travelStyle).toLowerCase();
  if (baseStyle && candidateStyle && baseStyle === candidateStyle) {
    score += 10;
  }

  const sharedInterests = normalizeInterests(base.interests).filter((interest) =>
    normalizeInterests(candidate.interests).includes(interest)
  );
  score += Math.min(sharedInterests.length * 7, 20);

  return {
    score: Math.min(score, 99),
    sharedInterests,
    dateInfo,
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
    interests: normalizeInterests(profile.interests),
    bio: profile.bio || '',
    updatedAt: profile.updatedAt || profile.createdAt,
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

  const otherProfile =
    memberProfiles.find((profile) => profile.id !== viewerProfileId) || memberProfiles[0] || null;
  const otherUser = otherProfile
    ? db.users.find((user) => user.id === otherProfile.userId)
    : null;

  const latestMessage =
    db.messages
      .filter((message) => message.conversationId === conversation.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null;

  return {
    id: conversation.id,
    memberProfileIds: conversation.memberProfileIds || [],
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt || conversation.createdAt,
    destination: conversation.destination || (otherProfile ? otherProfile.destination : ''),
    partner: otherUser
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
  };
}

// --- API Endpoints ---

app.get('/api/health', (req, res) => {
  res.json({ ok: true, app: 'Tripzen', destinations: DESTINATIONS });
});

app.post('/api/register', (req, res) => {
  const { fullName, email, password, age, gender, interests, city } = req.body;

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
    profileImage: avatarForUser({ fullName, email: normalizedEmail, id: normalizedEmail }),
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
  const normalizedEmail = normalizeText(email).toLowerCase();
  const user = db.users.find((item) => item.email === normalizedEmail);

  if (!user || user.password !== String(password || '')) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const profile = latestProfilesPerUser().find((item) => item.userId === user.id);

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

  return res.json({
    success: true,
    user: sanitizeUser(user),
    profile: sanitizeProfile(profile),
    hasPreferences: Boolean(profile),
  });
});

app.post('/api/preferences', (req, res) => {
  const { userId, destination, startDate, endDate, travelStyle, interests, bio } = req.body;

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
    travelStyle: normalizeText(travelStyle),
    interests: normalizeInterests(normalizeText(interests) ? interests : user.interests),
    bio: normalizeText(bio),
    createdAt: previous ? previous.createdAt : timestamp,
    updatedAt: timestamp,
  };

  db.profiles = db.profiles.filter((item) => item.userId !== userId);
  db.profiles.push(profile);

  saveStore(db);

  return res.status(201).json({
    success: true,
    message: 'Preferences saved.',
    profile: sanitizeProfile(profile),
  });
});


// matching algorithm endpoint


app.get('/api/matches/:userId', (req, res) => {
  const userId = req.params.userId;
  const baseProfile = latestProfilesPerUser().find((profile) => profile.userId === userId);

  if (!baseProfile) {
    return res.status(400).json({
      success: false,
      message: 'Save your travel preferences first to unlock matches.',
    });
  }

  const matches = latestProfilesPerUser()
    .filter((candidate) => candidate.userId !== userId)
    .filter((candidate) => normalizeDestination(candidate.destination) === normalizeDestination(baseProfile.destination))
    .filter((candidate) => isDateCompatible(baseProfile, candidate))
    .map((candidate) => {
      const user = db.users.find((item) => item.id === candidate.userId);
      const scoreInfo = compatibilityScore(baseProfile, candidate);

      return {
        matchProfileId: candidate.id,
        destination: candidate.destination,
        startDate: candidate.startDate,
        endDate: candidate.endDate,
        travelStyle: candidate.travelStyle,
        bio: candidate.bio,
        sharedInterests: scoreInfo.sharedInterests,
        score: scoreInfo.score,
        dateCompatibility: scoreInfo.dateInfo.overlaps ? 'Overlapping dates' : 'Similar travel window',
        traveler: user
          ? {
              id: user.id,
              fullName: user.fullName,
              city: user.city || 'India',
              age: user.age || '',
              gender: user.gender || '',
              profileImage: user.profileImage || avatarForUser(user),
            }
          : {
              id: candidate.userId,
              fullName: 'Traveler',
              city: 'India',
              age: '',
              gender: '',
              profileImage: avatarForUser({ fullName: 'Traveler', id: candidate.userId }),
            },
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.conversations.push(conversation);
  }

  if (normalizeText(message)) {
    db.messages.push({
      id: uid('msg'),
      conversationId: conversation.id,
      senderProfileId: requesterProfileId,
      text: normalizeText(message),
      createdAt: new Date().toISOString(),
    });
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
    {
      id: uid('usr'),
      fullName: 'Riya Kapoor',
      email: 'riya@tripzen.com',
      password: 'demo123',
      age: '27',
      gender: 'Female',
      city: 'Delhi',
      interests: ['trekking', 'sunrise hikes', 'photography'],
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
      interests: ['camping', 'chai stops', 'trekking'],
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Ananya Sen',
      email: 'ananya@tripzen.com',
      password: 'demo123',
      age: '26',
      gender: 'Female',
      city: 'Bengaluru',
      interests: ['wildflowers', 'slow travel', 'journaling'],
      createdAt: new Date().toISOString(),
    },
    {
      id: uid('usr'),
      fullName: 'Tenzin Lama',
      email: 'tenzin@tripzen.com',
      password: 'demo123',
      age: '31',
      gender: 'Male',
      city: 'Shimla',
      interests: ['mountain food', 'trails', 'storytelling'],
      createdAt: new Date().toISOString(),
    },
  ].map((user) => ({ ...user, profileImage: avatarForUser(user) }));

  const freshUsers = demoUsers.filter((user) => db.users.some((item) => item.email === user.email) === false);
  db.users.push(...freshUsers);

  const profiles = [
    {
      userEmail: 'riya@tripzen.com',
      destination: 'Kedarkantha',
      startDate: '2026-04-18',
      endDate: '2026-04-23',
      travelStyle: 'Trekking',
      interests: ['trekking', 'photography', 'sunrise hikes'],
      bio: 'Love crisp summit mornings, bonfire chats, and well-planned group treks.',
    },
    {
      userEmail: 'kabir@tripzen.com',
      destination: 'Kedarkantha',
      startDate: '2026-04-20',
      endDate: '2026-04-25',
      travelStyle: 'Adventure',
      interests: ['trekking', 'camping', 'chai stops'],
      bio: 'Looking for easygoing trekkers who like a strong pace and stronger chai.',
    },
    {
      userEmail: 'ananya@tripzen.com',
      destination: 'Valley of Flowers',
      startDate: '2026-07-12',
      endDate: '2026-07-18',
      travelStyle: 'Relaxed',
      interests: ['wildflowers', 'journaling', 'photography'],
      bio: 'Prefer quiet scenic walks, shared cabs, and lots of photo stops.',
    },
    {
      userEmail: 'tenzin@tripzen.com',
      destination: 'Hampta Pass',
      startDate: '2026-06-05',
      endDate: '2026-06-10',
      travelStyle: 'Trekking',
      interests: ['trails', 'camping', 'storytelling'],
      bio: 'Mountain guide energy with a soft spot for first-time trekkers.',
    },
  ];

  // ensure karna ki user exists for each profile and then create or update profile accordingly, so that we can run this endpoint multiple times without creating duplicates

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
      interests: entry.interests,
      bio: entry.bio,
      createdAt: previous ? previous.createdAt : timestamp,
      updatedAt: timestamp,
    };

    db.profiles = db.profiles.filter((item) => item.userId !== user.id);
    db.profiles.push(profile);
  });

  saveStore(db);

  return res.json({
    success: true,
    message: 'Demo travelers are ready.',
  });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log('Tripzen server running at http://localhost:' + port);
});
