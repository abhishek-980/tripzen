const DESTINATIONS = [
  {
    name: 'Hampta Pass & Chandratal',
    image: './assets/hampta-card.mov',
    mediaType: 'video',
    description: 'A dramatic crossover trek with alpine meadows, rivers, and high mountain camps.',
  },
  {
    name: 'Kedarkantha',
    image: './assets/kedarkantha-card.mov',
    mediaType: 'video',
    description: 'A classic summit trek for snowy trails, pine forests, and sunrise ridge views.',
  },
  {
    name: 'Chopta Tungnath',
    image: './assets/chopta-tungnath-card.mp4',
    mediaType: 'video',
    description: 'A soft adventure route with temples, rolling meadows, and Himalayan panoramas.',
  },
  {
    name: 'Valley of Flowers',
    image: './assets/valley-of-flowers-card.mp4',
    mediaType: 'video',
    description: 'A monsoon dreamscape known for colorful blooms, misty valleys, and scenic walks.',
  },
];

const state = {
  route: window.location.hash.replace('#', '') || '/',
  user: null,
  profile: null,
  matches: [],
  dashboard: null,
  authMode: 'signup',
  authStatus: '',
  authStatusType: '',
  preferenceStatus: '',
  preferenceStatusType: '',
  matchStatus: '',
  connectStatus: '',
  chatStatus: '',
  conversations: [],
  activeConversationId: '',
  messages: [],
  loading: true,
  globalStatus: '',
  globalStatusType: '',
};

let apiBase = '';

function absoluteApiUrl(base, path) {
  return `${base}${path}`;
}

async function requestJson(base, url, method, payload) {
  const response = await fetch(absoluteApiUrl(base, url), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  const contentType = response.headers.get('content-type') || '';
  const rawBody = await response.text();

  if (contentType.includes('application/json') === false) {
    const error = new Error('Non-JSON response');
    error.code = 'NON_JSON';
    error.response = response;
    error.url = url;
    throw error;
  }

  let data;
  try {
    data = rawBody ? JSON.parse(rawBody) : {};
  } catch (error) {
    const parseError = new Error('INVALID_JSON');
    parseError.code = 'INVALID_JSON';
    throw parseError;
  }

  if (!response.ok) {
    const requestError = new Error(data.message || 'Request failed.');
    requestError.code = 'REQUEST_FAILED';
    throw requestError;
  }

  return data;
}

function getApiBaseCandidates() {
  const candidates = [];
  const seen = new Set();
  const preferredHost = window.location.hostname || 'localhost';

  [
    window.location.origin,
    `http://${preferredHost}:3000`,
    `http://${preferredHost}:3001`,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ].forEach((base) => {
    if (!base || base === 'null' || seen.has(base)) return;
    seen.add(base);
    candidates.push(base);
  });

  return candidates;
}

async function detectApiBase() {
  const candidates = getApiBaseCandidates();

  for (const base of candidates) {
    try {
      const response = await fetch(absoluteApiUrl(base, '/api/health'));
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json') === false) {
        continue;
      }

      const data = await response.json();
      if (data && data.app === 'Tripzen') {
        apiBase = base === window.location.origin ? '' : base;
        return true;
      }
    } catch (error) {
      continue;
    }
  }

  return false;
}

function api(url, method = 'GET', payload) {
  const bases = apiBase ? [apiBase, ...getApiBaseCandidates()] : getApiBaseCandidates();
  const uniqueBases = [];
  const seen = new Set();

  bases.forEach((base) => {
    const normalized = base || '';
    if (seen.has(normalized)) return;
    seen.add(normalized);
    uniqueBases.push(normalized);
  });

  return (async () => {
    let lastError = null;

    for (const base of uniqueBases) {
      try {
        const data = await requestJson(base, url, method, payload);
        apiBase = base;
        state.globalStatus = '';
        state.globalStatusType = '';
        return data;
      } catch (error) {
        lastError = error;
        if (error.code === 'REQUEST_FAILED') {
          throw error;
        }
      }
    }

    if (lastError && lastError.code === 'INVALID_JSON') {
      throw new Error('TripZen received an invalid JSON response from the server.');
    }

    if (lastError && lastError.code === 'NON_JSON') {
      const chatRoute =
        url.startsWith('/api/conversations') ||
        url.startsWith('/api/messages');

      if (chatRoute) {
        throw new Error(
          'Chat needs the latest TripZen server. Stop the current server, run "npm start" again in /Users/abhisheksharma/index.js, then refresh.'
        );
      }
    }

    throw new Error(
      'TripZen could not reach its backend. Open the app from http://localhost:3000 after starting npm start.'
    );
  })();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function routeTo(path) {
  const target = path || '/';
  if (window.location.hash !== `#${target}`) {
    window.location.hash = target;
    return;
  }
  state.route = target;
  renderApp();
}

function normalizedRoute() {
  const route = state.route || '/';
  if (route === '/') {
    if (!state.user) return '/auth';
    return state.profile ? '/matches' : '/preferences';
  }

  if (!state.user && (route === '/preferences' || route === '/matches')) {
    return '/auth';
  }

  if (state.user && !state.profile && route === '/matches') {
    return '/preferences';
  }

  return route;
}

function navLink(path, label) {
  const active = normalizedRoute() === path ? 'active' : '';
  return `<a href="#${path}" class="${active}">${label}</a>`;
}

function statusMarkup(message, type) {
  if (!message) return '';
  const className = type ? `status ${type}` : 'status';
  return `<p class="${className}">${escapeHtml(message)}</p>`;
}

function formatMessageTime(value) {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleString('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function destinationCards(selected) {
  return DESTINATIONS.map((destination) => {
    const selectedClass = selected === destination.name ? 'selected' : '';
    const media =
      destination.mediaType === 'video'
        ? `
          <video class="destination-video" autoplay muted loop playsinline>
            <source src="${escapeHtml(destination.image)}" type="video/quicktime" />
            <source src="${escapeHtml(destination.image)}" type="video/mp4" />
          </video>
        `
        : '';
    const mediaStyle =
      destination.mediaType === 'video'
        ? ''
        : `style="background-image:url('${destination.image}')"`;
    return `
      <button
        type="button"
        class="destination-card ${selectedClass}"
        data-select-destination="${escapeHtml(destination.name)}"
        ${mediaStyle}
      >
        ${media}
        <div class="destination-shade"></div>
        <div class="destination-copy">
          <span>Featured Trail</span>
          <h3>${escapeHtml(destination.name)}</h3>
          <p>${escapeHtml(destination.description)}</p>
        </div>
      </button>
    `;
  }).join('');
}

function authPage() {
  const isSignup = state.authMode === 'signup';

  return `
    <div class="page-shell">
      <section class="hero-panel">
        <video class="hero-video" autoplay muted loop playsinline>
          <source src="./assets/hero-bg.mov" type="video/quicktime" />
          <source src="./assets/hero-bg.mov" type="video/mp4" />
        </video>
        <div class="hero-video-overlay"></div>
        <div class="hero-copy">
          <span class="eyebrow">Modern travel planning, minus the chaos</span>
          <h1>Meet compatible travelers only after your trip details are locked in.</h1>
          <p>
            TripZen follows the right flow: signup or login first, then choose a destination and
            travel dates, and only then unlock curated matches.
          </p>
          <div class="hero-points">
            <span>Destination-first matching</span>
            <span>Date overlap filtering</span>
            <span>Interest-based compatibility</span>
          </div>
        </div>

        <div class="auth-card">
          <div class="auth-switch">
            <button type="button" class="${isSignup ? 'active' : ''}" data-auth-mode="signup">Signup</button>
            <button type="button" class="${!isSignup ? 'active' : ''}" data-auth-mode="login">Login</button>
          </div>

          <form id="authForm" class="form-grid">
            ${
              isSignup
                ? `
                  <label>
                    <span>Name</span>
                    <input name="fullName" required />
                  </label>
                  <label>
                    <span>Email</span>
                    <input name="email" type="email" required />
                  </label>
                  <label>
                    <span>Password</span>
                    <input name="password" type="password" required />
                  </label>
                  <label>
                    <span>Age</span>
                    <input name="age" placeholder="Optional" />
                  </label>
                  <label>
                    <span>Gender</span>
                    <select name="gender">
                      <option value="">Optional</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-binary">Non-binary</option>
                    </select>
                  </label>
                  <label>
                    <span>City</span>
                    <input name="city" placeholder="Optional" />
                  </label>
                  <label class="full-span">
                    <span>Interests</span>
                    <input name="interests" placeholder="trekking, photography, café hopping" />
                  </label>
                `
                : `
                  <label class="full-span">
                    <span>Email</span>
                    <input name="email" type="email" required />
                  </label>
                  <label class="full-span">
                    <span>Password</span>
                    <input name="password" type="password" required />
                  </label>
                `
            }

            <button type="submit" class="primary-btn wide-btn">
              ${isSignup ? 'Create Account' : 'Continue'}
            </button>
          </form>
          ${statusMarkup(state.authStatus, state.authStatusType)}
        </div>
      </section>
    </div>
  `;
}

function preferencesPage() {
  const destinationOptions = DESTINATIONS.map(
    (destination) =>
      `<option value="${escapeHtml(destination.name)}">${escapeHtml(destination.name)}</option>`
  ).join('');

  return `
    <div class="page-shell">
      <section class="section-block">
        <div class="section-heading">
          <span class="eyebrow">Step 2</span>
          <h2>Choose where and when you want to travel</h2>
          <p>
            Matches stay hidden until destination and dates are selected. That makes the page
            smoother and the results more useful.
          </p>
        </div>

        <div class="destination-grid">
          ${destinationCards(state.profile ? state.profile.destination : '')}
        </div>

        <form id="preferencesForm" class="preferences-layout">
          <div class="card-panel">
            <label>
              <span>Destination</span>
              <select name="destination" required>
                <option value="">Select a destination</option>
                ${destinationOptions}
              </select>
            </label>
            <div class="inline-fields">
              <label>
                <span>Start Date</span>
                <input name="startDate" type="date" required value="${escapeHtml(state.profile?.startDate || '')}" />
              </label>
              <label>
                <span>End Date</span>
                <input name="endDate" type="date" required value="${escapeHtml(state.profile?.endDate || '')}" />
              </label>
            </div>
            <label>
              <span>Travel Style</span>
              <select name="travelStyle">
                <option value="">Select a vibe</option>
                <option value="Trekking">Trekking</option>
                <option value="Adventure">Adventure</option>
                <option value="Backpacking">Backpacking</option>
                <option value="Relaxed">Relaxed</option>
              </select>
            </label>
          </div>

          <div class="card-panel">
            <label>
              <span>Interests</span>
              <input
                name="interests"
                value="${escapeHtml((state.profile?.interests || state.user?.interests || []).join(', '))}"
                placeholder="trekking, bonfires, sunrise photography"
              />
            </label>
            <label>
              <span>Short Bio</span>
              <textarea name="bio" rows="6" placeholder="Tell future matches what kind of traveler you are.">${escapeHtml(state.profile?.bio || '')}</textarea>
            </label>
            <button type="submit" class="primary-btn wide-btn">Find Matches</button>
          </div>
        </form>
        ${statusMarkup(state.preferenceStatus, state.preferenceStatusType)}
      </section>
    </div>
  `;
}

function matchesPage() {
  const summary = state.profile
    ? `${escapeHtml(state.profile.destination)} | ${escapeHtml(state.profile.startDate)} to ${escapeHtml(state.profile.endDate)}`
    : '';

  const matchCards = state.matches
    .map((match) => {
      const tags = (match.sharedInterests && match.sharedInterests.length
        ? match.sharedInterests
        : ['similar destination', 'matching dates']
      )
        .slice(0, 4)
        .map((tag) => `<span>${escapeHtml(tag)}</span>`)
        .join('');

      return `
        <article class="profile-card">
          <div class="profile-top">
            <img class="profile-avatar" src="${escapeHtml(match.traveler.profileImage)}" alt="${escapeHtml(match.traveler.fullName)}" />
            <div>
              <h3>${escapeHtml(match.traveler.fullName)}</h3>
              <p>${escapeHtml(match.traveler.city)}</p>
            </div>
            <span class="match-score">${escapeHtml(match.score)}%</span>
          </div>

          <div class="profile-meta">
            <span>${escapeHtml(match.destination)}</span>
            <span>${escapeHtml(match.startDate)} to ${escapeHtml(match.endDate)}</span>
            <span>${escapeHtml(match.dateCompatibility)}</span>
          </div>

          <p class="profile-bio">${escapeHtml(match.bio || 'Open to meeting compatible travel buddies for this trip.')}</p>
          <div class="tag-row">${tags}</div>
          <button type="button" class="primary-btn wide-btn" data-connect-profile="${escapeHtml(match.matchProfileId)}">
            Connect
          </button>
        </article>
      `;
    })
    .join('');

  const conversationCards = state.conversations.length
    ? state.conversations
        .map((conversation) => {
          const activeClass = state.activeConversationId === conversation.id ? 'active' : '';
          return `
            <button type="button" class="conversation-card ${activeClass}" data-open-conversation="${escapeHtml(conversation.id)}">
              <img class="conversation-avatar" src="${escapeHtml(conversation.partner.profileImage)}" alt="${escapeHtml(conversation.partner.fullName)}" />
              <div>
                <strong>${escapeHtml(conversation.partner.fullName)}</strong>
                <p>${escapeHtml(conversation.latestMessage?.text || `Connected for ${conversation.destination}`)}</p>
              </div>
            </button>
          `;
        })
        .join('')
    : '<div class="empty-state compact-empty"><p>Your conversations will appear here after you connect with a match.</p></div>';

  const messageCards = state.messages.length
    ? state.messages
        .map((message) => {
          const mine = state.profile && message.senderProfileId === state.profile.id ? 'mine' : '';
          return `
            <article class="message-bubble ${mine}">
              <strong>${escapeHtml(message.senderName || 'Traveler')}</strong>
              <p>${escapeHtml(message.text)}</p>
              <span>${escapeHtml(formatMessageTime(message.createdAt))}</span>
            </article>
          `;
        })
        .join('')
    : '<div class="empty-state compact-empty"><p>Start the conversation after connecting.</p></div>';

  const activeConversation = state.conversations.find((item) => item.id === state.activeConversationId);

  return `
    <div class="page-shell">
      <section class="section-block">
        <div class="section-heading matches-heading">
          <div>
            <span class="eyebrow">Step 3</span>
            <h2>Your travel matches</h2>
            <p>${summary}</p>
          </div>

          <div class="heading-actions">
            <a href="#/preferences" class="ghost-btn">Edit Preferences</a>
            <button type="button" class="primary-btn" id="seedDemoBtn">Load Demo Travelers</button>
          </div>
        </div>

        <div class="match-info-bar">
          <span>${escapeHtml(state.matchStatus)}</span>
          <span>Filtering by same destination and overlapping or nearby dates.</span>
        </div>

        ${statusMarkup(state.connectStatus, 'success')}
        ${
          state.activeConversationId
            ? '<div class="chat-cta-row"><button type="button" class="primary-btn" id="openActiveChatBtn">Open Chat</button></div>'
            : ''
        }

        ${
          state.matches.length
            ? `<div class="match-grid">${matchCards}</div>`
            : `
              <div class="empty-state">
                <h3>No matches unlocked yet</h3>
                <p>
                  This is expected if no traveler currently matches your destination and dates.
                  Try loading demo travelers or adjusting preferences.
                </p>
              </div>
            `
        }

        <section class="chat-section" id="chatSection">
          <div class="section-heading">
            <span class="eyebrow">Chat</span>
            <h2>Talk after connecting</h2>
            <p>Each connect request opens a shared conversation so both travelers can continue planning inside TripZen.</p>
          </div>

          ${statusMarkup(state.chatStatus, 'success')}

          <div class="chat-layout">
            <aside class="chat-sidebar">
              <h3>Your conversations</h3>
              <div class="conversation-list">${conversationCards}</div>
            </aside>

            <section class="chat-panel">
              <div class="chat-panel-head">
                <div>
                  <h3>${escapeHtml(activeConversation ? activeConversation.partner.fullName : 'No chat selected')}</h3>
                  <p>${escapeHtml(activeConversation ? activeConversation.destination : 'Connect with a match to start chatting.')}</p>
                </div>
              </div>
              <div class="message-list">${messageCards}</div>
              ${
                activeConversation
                  ? `
                    <form id="chatForm" class="chat-form">
                      <input type="hidden" name="conversationId" value="${escapeHtml(activeConversation.id)}" />
                      <textarea name="text" rows="3" placeholder="Message your travel partner..." required></textarea>
                      <button type="submit" class="primary-btn">Send Message</button>
                    </form>
                  `
                  : ''
              }
            </section>
          </div>
        </section>
      </section>
    </div>
  `;
}

function aboutPage() {
  return `
    <div class="page-shell">
      <section class="section-block about-grid">
        <article class="card-panel">
          <span class="eyebrow">What TripZen Does</span>
          <h2>It helps travelers find people heading to the same place at the same time.</h2>
          <p>
            Instead of showing random profiles right after signup, TripZen waits for the most
            important inputs: destination and dates. That makes every match feel intentional.
          </p>
        </article>
        <article class="card-panel">
          <span class="eyebrow">Why It Exists</span>
          <h2>Planning group trips is hard when timing and vibe do not line up.</h2>
          <p>
            The platform reduces that friction by filtering for destination overlap, travel window
            compatibility, and shared interests before suggesting a connection.
          </p>
        </article>
        <article class="card-panel">
          <span class="eyebrow">Who It Is For</span>
          <h2>Solo travelers, trekking groups, backpackers, and people who do not want to travel alone.</h2>
          <p>
            If you care about finding a compatible travel buddy, saving planning time, and making
            mountain trips feel safer and more social, TripZen is built for you.
          </p>
        </article>
      </section>
    </div>
  `;
}

function topbar() {
  return `
    <header class="topbar">
      <a href="#/" class="brand">
        <span class="brand-mark"></span>
        <div>
          <strong>TripZen</strong>
          <span>Travel Matchmaking</span>
        </div>
      </a>

      <nav class="nav-links">
        ${navLink('/auth', 'Login')}
        ${navLink('/preferences', 'Preferences')}
        ${navLink('/matches', 'Matches')}
        ${navLink('/about', 'About')}
      </nav>

      <div class="nav-meta">
        ${state.user ? `<span class="user-pill">${escapeHtml(state.user.fullName)}</span>` : ''}
        ${
          state.user
            ? '<button type="button" class="ghost-btn" id="logoutBtn">Logout</button>'
            : '<a href="#/auth" class="primary-btn link-btn">Get Started</a>'
        }
      </div>
    </header>
  `;
}

function pageContent() {
  const route = normalizedRoute();
  if (route === '/auth') return authPage();
  if (route === '/preferences') return preferencesPage();
  if (route === '/matches') return matchesPage();
  if (route === '/about') return aboutPage();
  return authPage();
}

function renderApp() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <div class="app-frame">
      <div class="background-orb orb-one"></div>
      <div class="background-orb orb-two"></div>
      ${topbar()}
      ${
        state.globalStatus
          ? `<div class="global-banner ${state.globalStatusType || ''}">${escapeHtml(state.globalStatus)}</div>`
          : ''
      }
      <main class="route-stage">${pageContent()}</main>
    </div>
  `;

  hydrateUI();
}

function hydratePreferenceFormDefaults() {
  const form = document.getElementById('preferencesForm');
  if (!form || !state.profile) return;

  form.destination.value = state.profile.destination || '';
  form.travelStyle.value = state.profile.travelStyle || '';
}

async function loadSession() {
  const userId = localStorage.getItem('tripzenUserId');
  if (!userId) {
    state.user = null;
    state.profile = null;
    state.loading = false;
    return;
  }

  try {
    const data = await api(`/api/session/${userId}`);
    state.user = data.user || null;
    state.profile = data.profile || null;
  } catch (error) {
    localStorage.removeItem('tripzenUserId');
    state.user = null;
    state.profile = null;
  } finally {
    state.loading = false;
  }
}

async function loadMatches() {
  if (!state.user || !state.profile) {
    state.matches = [];
    state.matchStatus = 'Save destination and travel dates first to unlock matches.';
    return;
  }

  try {
    const data = await api(`/api/matches/${state.user.id}`);
    state.matches = data.matches || [];
    state.matchStatus = data.matches.length
      ? `${data.matches.length} curated matches found for ${data.baseProfile.destination}.`
      : 'No matches yet for this trip. Try loading demo travelers or change your dates.';
  } catch (error) {
    state.matches = [];
    state.matchStatus = error.message;
  }
}

async function loadConversations() {
  if (!state.user || !state.profile) {
    state.conversations = [];
    state.activeConversationId = '';
    state.messages = [];
    return;
  }

  try {
    const data = await api(`/api/conversations/${state.user.id}`);
    state.conversations = data.conversations || [];

    if (!state.activeConversationId && state.conversations.length) {
      state.activeConversationId = state.conversations[0].id;
    }

    if (
      state.activeConversationId &&
      state.conversations.some((conversation) => conversation.id === state.activeConversationId) === false
    ) {
      state.activeConversationId = state.conversations[0] ? state.conversations[0].id : '';
    }

    if (state.activeConversationId) {
      await loadMessages(state.activeConversationId);
    } else {
      state.messages = [];
    }
  } catch (error) {
    state.chatStatus = error.message;
    state.conversations = [];
    state.messages = [];
  }
}

async function loadMessages(conversationId) {
  if (!conversationId) {
    state.messages = [];
    return;
  }

  try {
    const data = await api(`/api/messages/${conversationId}`);
    state.messages = data.messages || [];
  } catch (error) {
    state.chatStatus = error.message;
    state.messages = [];
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    const endpoint = state.authMode === 'signup' ? '/api/register' : '/api/login';
    const data = await api(endpoint, 'POST', payload);
    localStorage.setItem('tripzenUserId', data.user.id);
    state.user = data.user;
    state.profile = data.profile || null;
    state.authStatusType = 'success';
    state.authStatus =
      state.authMode === 'signup'
        ? 'Account created. Next step: choose your destination and dates.'
        : 'Logged in successfully.';
    routeTo(state.profile ? '/matches' : '/preferences');
  } catch (error) {
    state.authStatusType = 'error';
    state.authStatus = error.message;
    renderApp();
  }
}

async function handlePreferencesSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    const data = await api('/api/preferences', 'POST', {
      ...payload,
      userId: state.user.id,
    });
    state.profile = data.profile;
    state.preferenceStatusType = 'success';
    state.preferenceStatus = 'Preferences saved. Moving you to your matches.';
    await loadMatches();
    routeTo('/matches');
  } catch (error) {
    state.preferenceStatusType = 'error';
    state.preferenceStatus = error.message;
    renderApp();
    hydratePreferenceFormDefaults();
  }
}

async function handleConnect(profileId) {
  const match = state.matches.find((item) => item.matchProfileId === profileId);
  if (!match || !state.profile) return;

  try {
    const data = await api('/api/booking', 'POST', {
      requesterProfileId: state.profile.id,
      targetProfileId: match.matchProfileId,
      plannedDestination: state.profile.destination,
      message: `Hi ${match.traveler.fullName}, I am also planning ${state.profile.destination}. Want to connect on TripZen?`,
    });
    state.connectStatus = `Connection request sent to ${match.traveler.fullName}.`;
    state.chatStatus = `You can now chat with ${match.traveler.fullName}.`;
    if (data.conversation && data.conversation.id) {
      state.activeConversationId = data.conversation.id;
    }
    await loadConversations();
  } catch (error) {
    state.connectStatus = error.message;
  }

  renderApp();
  requestAnimationFrame(() => {
    const chatSection = document.getElementById('chatSection');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

async function handleSeedDemo() {
  try {
    await api('/api/seed-demo', 'POST');
    await loadSession();
    await loadMatches();
    await loadConversations();
    renderApp();
  } catch (error) {
    state.matchStatus = error.message;
    renderApp();
  }
}

async function handleOpenConversation(conversationId) {
  state.activeConversationId = conversationId;
  await loadMessages(conversationId);
  renderApp();
}

function openActiveChat() {
  const chatSection = document.getElementById('chatSection');
  if (chatSection) {
    chatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

async function handleChatSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    await api('/api/messages', 'POST', {
      conversationId: payload.conversationId,
      senderProfileId: state.profile.id,
      text: payload.text,
    });
    state.chatStatus = 'Message sent.';
    await loadConversations();
    renderApp();
  } catch (error) {
    state.chatStatus = error.message;
    renderApp();
  }
}

function hydrateUI() {
  hydratePreferenceFormDefaults();

  document.querySelectorAll('[data-auth-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      state.authMode = button.getAttribute('data-auth-mode');
      state.authStatus = '';
      state.authStatusType = '';
      renderApp();
    });
  });

  document.querySelectorAll('[data-select-destination]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-select-destination');
      const form = document.getElementById('preferencesForm');
      if (form) {
        form.destination.value = value;
      }
      document.querySelectorAll('.destination-card').forEach((card) => {
        card.classList.remove('selected');
      });
      button.classList.add('selected');
    });
  });

  const authForm = document.getElementById('authForm');
  if (authForm) {
    authForm.addEventListener('submit', handleAuthSubmit);
  }

  const preferencesForm = document.getElementById('preferencesForm');
  if (preferencesForm) {
    preferencesForm.addEventListener('submit', handlePreferencesSubmit);
  }

  document.querySelectorAll('[data-connect-profile]').forEach((button) => {
    button.addEventListener('click', () => {
      handleConnect(button.getAttribute('data-connect-profile'));
    });
  });

  document.querySelectorAll('[data-open-conversation]').forEach((button) => {
    button.addEventListener('click', () => {
      handleOpenConversation(button.getAttribute('data-open-conversation'));
    });
  });

  const seedButton = document.getElementById('seedDemoBtn');
  if (seedButton) {
    seedButton.addEventListener('click', handleSeedDemo);
  }

  const openActiveChatBtn = document.getElementById('openActiveChatBtn');
  if (openActiveChatBtn) {
    openActiveChatBtn.addEventListener('click', openActiveChat);
  }

  const chatForm = document.getElementById('chatForm');
  if (chatForm) {
    chatForm.addEventListener('submit', handleChatSubmit);
  }

  const logoutButton = document.getElementById('logoutBtn');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('tripzenUserId');
      state.user = null;
      state.profile = null;
      state.matches = [];
      state.connectStatus = '';
      state.chatStatus = '';
      state.authStatus = '';
      state.preferenceStatus = '';
      state.matchStatus = '';
      state.conversations = [];
      state.activeConversationId = '';
      state.messages = [];
      routeTo('/auth');
    });
  }
}

window.addEventListener('hashchange', async () => {
  state.route = window.location.hash.replace('#', '') || '/';
  if (normalizedRoute() === '/matches') {
    await loadMatches();
    await loadConversations();
  }
  renderApp();
});

async function init() {
  const backendFound = await detectApiBase();
  if (!backendFound) {
    apiBase = 'http://localhost:3000';
    state.globalStatus =
      'TripZen could not auto-detect the backend, so it is trying http://localhost:3000. If needed, run "npm start" in /Users/abhisheksharma/index.js.';
    state.globalStatusType = 'error';
  }

  await loadSession();
  if (normalizedRoute() === '/matches') {
    await loadMatches();
    await loadConversations();
  }
  renderApp();
}

init();
