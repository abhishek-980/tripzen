// test-platform-suite.js
// Comprehensive End-to-End Test Suite for TripZen Pre-Launch Verification

const http = require('http');
const crypto = require('crypto');

const BASE_URL = 'http://localhost:3000';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'tripzen-admin-123';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'f0pSoN9Z71e6d1S2jzNXTnjt';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const headers = options.headers || {};
    let postData = null;

    if (options.body) {
      postData = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          let parsed = null;
          try {
            parsed = JSON.parse(body);
          } catch (e) {
            parsed = body;
          }
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsed,
          });
        });
      }
    );

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

const tests = [];
function test(name, fn) {
  tests.push({ name, fn });
}

let testUser1 = null;
let testUser2 = null;
let testProfile1 = null;
let testProfile2 = null;
let testConversationId = null;
let testSquadId = null;
let testPaymentId = null;
let testOrderId = null;

// 1. Health Check
test('Health Check API', async () => {
  const res = await request('/api/health');
  if (res.statusCode !== 200 || !res.data.ok) {
    throw new Error(`Health check failed with status ${res.statusCode}`);
  }
  if (!Array.isArray(res.data.destinations) || res.data.destinations.length < 5) {
    throw new Error(`Destinations list missing or incomplete`);
  }
});

// 2. User Registration
test('User Registration (User 1 & User 2)', async () => {
  const email1 = `test.traveler.${Date.now()}@example.com`;
  const res1 = await request('/api/register', {
    method: 'POST',
    body: {
      fullName: 'Vikram Singh',
      email: email1,
      password: 'Password123!',
      age: 26,
      gender: 'Male',
      city: 'Delhi',
      travelStyle: 'Trekking & Adventure',
      budgetRange: '8000-15000',
    },
  });

  if (res1.statusCode !== 201 || !res1.data.success || !res1.data.user?.id) {
    throw new Error(`User 1 registration failed: ${JSON.stringify(res1.data)}`);
  }
  testUser1 = res1.data.user;

  const email2 = `test.agency.${Date.now()}@example.com`;
  const res2 = await request('/api/register', {
    method: 'POST',
    body: {
      fullName: 'Himalayan Expeditions Official',
      email: email2,
      password: 'Password123!',
      age: 32,
      gender: 'Other',
      city: 'Rishikesh',
      travelStyle: 'Organized Group',
      budgetRange: '10000-25000',
    },
  });

  if (res2.statusCode !== 201 || !res2.data.success || !res2.data.user?.id) {
    throw new Error(`User 2 registration failed: ${JSON.stringify(res2.data)}`);
  }
  testUser2 = res2.data.user;
});

// 3. User Login
test('User Authentication & Session', async () => {
  const res = await request('/api/login', {
    method: 'POST',
    body: {
      email: testUser1.email,
      password: 'Password123!',
    },
  });

  if (res.statusCode !== 200 || !res.data.success || res.data.user.id !== testUser1.id) {
    throw new Error(`Login failed: ${JSON.stringify(res.data)}`);
  }

  // Check Session endpoint
  const sessionRes = await request(`/api/session/${testUser1.id}`);
  if (sessionRes.statusCode !== 200 || !sessionRes.data.success) {
    throw new Error(`Session fetch failed: ${JSON.stringify(sessionRes.data)}`);
  }
});

// 4. Set Trip Preferences & Profile
test('User Preferences & Profile Customization', async () => {
  const prefRes1 = await request('/api/preferences', {
    method: 'POST',
    body: {
      userId: testUser1.id,
      fullName: 'Vikram Singh',
      destination: 'Chopta Tungnath',
      startDate: '2026-11-10',
      endDate: '2026-11-15',
      travelStyle: 'Trekking & Adventure',
      interests: 'Trekking, Camping, Photography, Star Gazing',
      budgetRange: '8000-12000',
      genderPreference: 'Any',
      bio: 'Excited solo trekker looking for adventure buddies to scale Chandrashila summit!',
    },
  });

  if (prefRes1.statusCode !== 201 || !prefRes1.data.success || !prefRes1.data.profile) {
    throw new Error(`User 1 preferences setup failed: ${JSON.stringify(prefRes1.data)}`);
  }
  testProfile1 = prefRes1.data.profile;

  const prefRes2 = await request('/api/preferences', {
    method: 'POST',
    body: {
      userId: testUser2.id,
      fullName: 'Himalayan Expeditions Official',
      destination: 'Chopta Tungnath',
      startDate: '2026-11-10',
      endDate: '2026-11-15',
      travelStyle: 'Organized Group',
      interests: 'Trekking, Camping, Bonfire',
      budgetRange: '10000-20000',
      genderPreference: 'Any',
      bio: 'Certified Himalayan agency organizing weekly summit batches.',
    },
  });

  if (prefRes2.statusCode !== 201 || !prefRes2.data.success || !prefRes2.data.profile) {
    throw new Error(`User 2 preferences setup failed: ${JSON.stringify(prefRes2.data)}`);
  }
  testProfile2 = prefRes2.data.profile;

  const profileRes = await request('/api/profile', {
    method: 'POST',
    body: {
      userId: testUser1.id,
      bio: 'Updated bio: Certified mountaineering enthusiast.',
      pastTrips: 'Kedarkantha (2025), Triund (2024)',
    },
  });

  if (profileRes.statusCode !== 200 || !profileRes.data.success) {
    throw new Error(`Profile update failed: ${JSON.stringify(profileRes.data)}`);
  }
});

// 5. Matchmaking Engine
test('Matchmaking Engine & Compatibility Algorithm', async () => {
  const matchRes = await request(`/api/matches/${testUser1.id}`);
  if (matchRes.statusCode !== 200 || !matchRes.data.success) {
    throw new Error(`Matches endpoint failed: ${JSON.stringify(matchRes.data)}`);
  }
  if (!Array.isArray(matchRes.data.matches)) {
    throw new Error(`Matches output is not an array`);
  }
  if (matchRes.data.matches.length > 0) {
    const topMatch = matchRes.data.matches[0];
    if (typeof topMatch.score !== 'number') {
      throw new Error(`Score missing in top match: ${JSON.stringify(topMatch)}`);
    }
  }
});

// 6. Real-time Messaging & Package Selection
test('Messaging & Package Collaboration', async () => {
  // 1. Send connection booking request from Traveler 1 to Traveler 2
  const bookConnRes = await request('/api/booking', {
    method: 'POST',
    body: {
      requesterProfileId: testProfile1.id,
      targetProfileId: testProfile2.id,
      plannedDestination: 'Chopta Tungnath',
      message: 'Hey! Looking forward to exploring Chopta together.',
    },
  });

  if (bookConnRes.statusCode !== 201 || !bookConnRes.data.success) {
    throw new Error(`Connect booking failed: ${JSON.stringify(bookConnRes.data)}`);
  }

  // 2. Fetch conversations for User 1
  const convListRes = await request(`/api/conversations/${testUser1.id}`);
  if (convListRes.statusCode !== 200 || !convListRes.data.success || !convListRes.data.conversations?.length) {
    throw new Error(`Fetch conversations failed: ${JSON.stringify(convListRes.data)}`);
  }
  testConversationId = convListRes.data.conversations[0].id;

  // 3. Send message in conversation
  const msgRes = await request('/api/messages', {
    method: 'POST',
    body: {
      conversationId: testConversationId,
      senderProfileId: testProfile1.id,
      text: 'Hey! Are you joining the upcoming Chopta Tungnath batch?',
    },
  });

  if (msgRes.statusCode !== 201 || !msgRes.data.success || !msgRes.data.message) {
    throw new Error(`Send message failed: ${JSON.stringify(msgRes.data)}`);
  }

  // 4. Retrieve conversation messages
  const getMsgRes = await request(`/api/messages/${testConversationId}?profileId=${testProfile1.id}`);
  if (getMsgRes.statusCode !== 200 || !getMsgRes.data.success || getMsgRes.data.messages.length === 0) {
    throw new Error(`Get messages failed: ${JSON.stringify(getMsgRes.data)}`);
  }

  // 5. Mark messages as read
  const readRes = await request(`/api/conversations/${testConversationId}/read`, {
    method: 'POST',
    body: { profileId: testProfile2.id },
  });
  if (readRes.statusCode !== 200 || !readRes.data.success) {
    throw new Error(`Mark read failed: ${JSON.stringify(readRes.data)}`);
  }

  // 6. Package collaboration selection
  const pkgRes = await request('/api/package-selections', {
    method: 'POST',
    body: {
      conversationId: testConversationId,
      selectedByProfileId: testProfile1.id,
      packageId: 'chopta-tungnath',
      packageName: 'Chopta Tungnath Trek',
      company: 'Trekk With Vishal & Tripzen Official',
      destination: 'Chopta Tungnath',
      agreedBudget: '5999',
    },
  });
  if (pkgRes.statusCode !== 201 || !pkgRes.data.success) {
    throw new Error(`Package selection failed: ${JSON.stringify(pkgRes.data)}`);
  }
});

// 7. Agency Squads & Cost-Sharing Workflow
test('Agency Squads Creation, 1-Click Join, Auto-Full & Deletion', async () => {
  // Agency creates squad
  const createSquadRes = await request('/api/trip-groups', {
    method: 'POST',
    body: {
      organizerProfileId: testProfile2.id,
      title: 'Himalayan Chopta Gold Expedition',
      destination: 'Chopta Tungnath',
      startDate: '2026-11-15',
      endDate: '2026-11-18',
      batchDates: '15 Nov – 18 Nov 2026',
      maxMembers: 2, // 1 organizer + 1 slot for testing instant full
      pricePerPerson: 5999,
      agencyName: 'Himalayan Expeditions',
      contactPhone: '+91 89206 32874',
      inclusions: 'Stay at Luxury Swiss Tents, All Meals, Certified Guide, Bonfire',
    },
  });

  if (createSquadRes.statusCode !== 201 || !createSquadRes.data.success || !createSquadRes.data.group?.id) {
    throw new Error(`Squad creation failed: ${JSON.stringify(createSquadRes.data)}`);
  }
  testSquadId = createSquadRes.data.group.id;
  const initialGroup = createSquadRes.data.group;

  if (initialGroup.remainingSeats !== 1 || initialGroup.isFull !== false) {
    throw new Error(`Initial squad state incorrect: seats=${initialGroup.remainingSeats}, full=${initialGroup.isFull}`);
  }

  // User 1 Joins Squad
  const joinRes = await request(`/api/trip-groups/${testSquadId}/join`, {
    method: 'POST',
    body: { requesterProfileId: testProfile1.id },
  });

  if (joinRes.statusCode !== 200 || !joinRes.data.success) {
    throw new Error(`Squad join failed: ${JSON.stringify(joinRes.data)}`);
  }

  const updatedGroup = joinRes.data.group;
  if (updatedGroup.remainingSeats !== 0 || updatedGroup.isFull !== true) {
    throw new Error(`Squad did not turn full: seats=${updatedGroup.remainingSeats}, full=${updatedGroup.isFull}`);
  }

  // User 1 Leaves Squad
  const leaveRes = await request(`/api/trip-groups/${testSquadId}/leave`, {
    method: 'POST',
    body: { profileId: testProfile1.id },
  });

  if (leaveRes.statusCode !== 200 || !leaveRes.data.success) {
    throw new Error(`Squad leave failed: ${JSON.stringify(leaveRes.data)}`);
  }

  if (leaveRes.data.group.remainingSeats !== 1 || leaveRes.data.group.isFull !== false) {
    throw new Error(`Squad seat not restored after leave: seats=${leaveRes.data.group.remainingSeats}`);
  }

  // Fetch groups filter
  const listRes = await request(`/api/trip-groups/${testUser1.id}?tab=agency`);
  if (listRes.statusCode !== 200 || !listRes.data.success || !Array.isArray(listRes.data.groups)) {
    throw new Error(`List groups failed: ${JSON.stringify(listRes.data)}`);
  }

  // Agency Deletes Squad
  const delRes = await request(`/api/trip-groups/${testSquadId}`, {
    method: 'DELETE',
    body: { organizerProfileId: testProfile2.id, userId: testUser2.id },
  });

  if (delRes.statusCode !== 200 || !delRes.data.success) {
    throw new Error(`Squad deletion failed: ${JSON.stringify(delRes.data)}`);
  }
});

// 8. Razorpay Order Creation & Verified WhatsApp Dispatch
test('Razorpay Payment & Automated WhatsApp Dispatch Pipeline', async () => {
  // Create Razorpay Order
  const orderRes = await request('/api/payments/create-order', {
    method: 'POST',
    body: {
      profileId: testProfile1.id,
      packageId: 'chopta-tungnath',
      packageName: 'Chopta Tungnath Chandrashila Summit Expedition',
      destination: 'Chopta Tungnath',
      company: 'Trekk With Vishal & Tripzen Official',
      travelerCount: 2,
      priceValue: 5999,
      preferredMonth: 'November 2026',
      leadName: 'Vikram Singh',
      leadPhone: '+917982307329',
      slug: 'chopta-tungnath',
    },
  });

  if (orderRes.statusCode !== 201 || !orderRes.data.success || !orderRes.data.payment?.id || !orderRes.data.orderId) {
    throw new Error(`Order creation failed: ${JSON.stringify(orderRes.data)}`);
  }

  testPaymentId = orderRes.data.payment.id;
  testOrderId = orderRes.data.orderId;

  // Generate valid Razorpay HMAC-SHA256 signature for testing
  const mockPaymentId = `pay_test_${Date.now()}`;
  const validSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${testOrderId}|${mockPaymentId}`)
    .digest('hex');

  // Verify payment
  const verifyRes = await request('/api/payments/verify', {
    method: 'POST',
    body: {
      paymentId: testPaymentId,
      razorpayOrderId: testOrderId,
      razorpayPaymentId: mockPaymentId,
      razorpaySignature: validSignature,
    },
  });

  if (verifyRes.statusCode !== 200 || !verifyRes.data.success || verifyRes.data.payment.status !== 'paid') {
    throw new Error(`Payment verification failed: ${JSON.stringify(verifyRes.data)}`);
  }

  if (!verifyRes.data.payment.bookingRef) {
    throw new Error(`Booking reference missing in verified payment`);
  }

  // Resend WhatsApp trigger
  const resendRes = await request('/api/payments/resend-whatsapp', {
    method: 'POST',
    body: { paymentId: testPaymentId },
  });

  if (resendRes.statusCode !== 200 || !resendRes.data.success) {
    throw new Error(`Resend WhatsApp failed: ${JSON.stringify(resendRes.data)}`);
  }
});

// 9. Bookings Dashboard
test('My Bookings Dashboard Endpoint & Receipt Structure', async () => {
  const bookingsRes = await request(`/api/bookings/user/${testUser1.id}`);
  if (bookingsRes.statusCode !== 200 || !bookingsRes.data.success || !Array.isArray(bookingsRes.data.bookings)) {
    throw new Error(`User bookings fetch failed: ${JSON.stringify(bookingsRes.data)}`);
  }

  if (bookingsRes.data.bookings.length === 0) {
    throw new Error(`Expected at least 1 verified booking for user`);
  }

  const booking = bookingsRes.data.bookings[0];
  if (!booking.bookingRef || !booking.itineraryUrl || !booking.amount) {
    throw new Error(`Incomplete booking data: ${JSON.stringify(booking)}`);
  }

  // Test global bookings listing
  const allBookingsRes = await request('/api/bookings');
  if (allBookingsRes.statusCode !== 200 || !allBookingsRes.data.success) {
    throw new Error(`Global bookings listing failed`);
  }
});

// 10. WhatsApp Engine Status & Official Number
test('WhatsApp Multi-Device Bot Status & Number Check', async () => {
  const res = await request('/api/whatsapp/status');
  if (res.statusCode !== 200 || !res.data.success) {
    throw new Error(`WhatsApp status API failed`);
  }

  if (res.data.officialNumber !== '+91 89206 32874') {
    throw new Error(`Official WhatsApp number mismatched: expected '+91 89206 32874', got '${res.data.officialNumber}'`);
  }
});

// 11. Admin Dashboard & Audit Logs
test('Admin Security & Telemetry Data', async () => {
  // Unauthorized request should fail
  const unauthRes = await request('/api/admin/data');
  if (unauthRes.statusCode !== 401) {
    throw new Error(`Admin endpoint allowed unauthorized access! Status: ${unauthRes.statusCode}`);
  }

  // Authorized request
  const authRes = await request('/api/admin/data', {
    headers: { 'x-admin-password': ADMIN_PASSWORD },
  });

  if (authRes.statusCode !== 200 || !authRes.data.success || !authRes.data.totals) {
    throw new Error(`Admin data fetch failed: ${JSON.stringify(authRes.data)}`);
  }

  const logsRes = await request('/api/admin/whatsapp-logs', {
    headers: { 'x-admin-password': ADMIN_PASSWORD },
  });

  if (logsRes.statusCode !== 200 || !logsRes.data.success) {
    throw new Error(`Admin WhatsApp logs fetch failed`);
  }
});

// 12. Static Web Pages & All 13 Standalone Itineraries
test('Public Web Pages & All 13 Standalone Itineraries', async () => {
  const paths = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/whatsapp-link.html',
    '/itineraries/chopta-tungnath.html',
    '/itineraries/hampta-pass.html',
    '/itineraries/kedarkantha.html',
    '/itineraries/kedarnath.html',
    '/itineraries/valley-of-flowers.html',
    '/itineraries/kareri-lake.html',
    '/itineraries/madmaheshwar.html',
    '/itineraries/rudranath.html',
    '/itineraries/yulla-kanda.html',
    '/itineraries/churdhar.html',
    '/itineraries/nag-tibba.html',
    '/itineraries/annapurna-base-camp.html',
    '/itineraries/everest-base-camp.html',
  ];

  for (const p of paths) {
    const res = await request(p);
    if (res.statusCode !== 200) {
      throw new Error(`Page ${p} returned HTTP status ${res.statusCode}`);
    }
  }
});

async function runSuite() {
  console.log('========================================================');
  console.log('🚀 RUNNING TRIPZEN PRE-LAUNCH FULL SYSTEM TEST SUITE 🚀');
  console.log('========================================================\n');

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < tests.length; i++) {
    const { name, fn } = tests[i];
    process.stdout.write(`[${i + 1}/${tests.length}] ${name}... `);
    try {
      await fn();
      console.log('✅ PASS');
      passed++;
    } catch (err) {
      console.log('❌ FAIL');
      console.error(`   Error: ${err.message}`);
      failed++;
    }
  }

  console.log('\n========================================================');
  console.log(`TEST SUMMARY: Total: ${tests.length} | Passed: ${passed} | Failed: ${failed}`);
  console.log('========================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runSuite();
