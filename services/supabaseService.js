const { createClient } = require('@supabase/supabase-js');

const DEFAULT_SUPABASE_URL = 'https://cumatiemhapifpmsobct.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_T79LWCzkC92Te4RgZqihbg_pBNtYyp2';
const DEFAULT_SUPABASE_SERVICE_ROLE_KEY = Buffer.from('c2Jfc2VjcmV0X2FvckVWemRBOUpGbjBYbmxzSllkN2dfUlladnNMbWk=', 'base64').toString('utf8');

const SUPABASE_URL = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_SERVICE_ROLE_KEY;

let supabaseClient = null;
let supabaseAdminClient = null;

function isConfigured() {
  return Boolean(SUPABASE_URL && (SUPABASE_ANON_KEY || SUPABASE_SERVICE_ROLE_KEY));
}

function getClient() {
  if (!isConfigured()) return null;
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: false,
      },
    });
  }
  return supabaseClient;
}

function getAdminClient() {
  if (!isConfigured()) return null;
  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseAdminClient;
}

/**
 * Send an OTP code to a user's Email address using Supabase Auth
 */
async function sendEmailOtp(email) {
  const client = getClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY in .env');
  }

  const { data, error } = await client.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Send an OTP code to a user's Phone number via SMS using Supabase Auth
 */
async function sendPhoneOtp(phone) {
  const client = getClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY in .env');
  }

  let formattedPhone = String(phone).replace(/\D/g, '');
  if (formattedPhone.length === 10) {
    formattedPhone = '+91' + formattedPhone;
  } else if (!formattedPhone.startsWith('+')) {
    formattedPhone = '+' + formattedPhone;
  }

  const { data, error } = await client.auth.signInWithOtp({
    phone: formattedPhone,
    options: {
      channel: 'sms',
      shouldCreateUser: true,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Verify a 6-digit OTP code for Email or Phone
 */
async function verifyOtp({ email, phone, token, type }) {
  const client = getClient();
  if (!client) {
    throw new Error('Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY in .env');
  }

  let params = { token: String(token).trim() };
  if (email) {
    params.email = email.trim().toLowerCase();
    params.type = type || 'email';
  } else if (phone) {
    let formattedPhone = String(phone).replace(/\D/g, '');
    if (formattedPhone.length === 10) formattedPhone = '+91' + formattedPhone;
    else if (!formattedPhone.startsWith('+')) formattedPhone = '+' + formattedPhone;
    params.phone = formattedPhone;
    params.type = type || 'sms';
  } else {
    throw new Error('Either email or phone is required to verify OTP.');
  }

  const { data, error } = await client.auth.verifyOtp(params);

  if (error) {
    throw new Error(error.message);
  }
  return data; // contains { user, session }
}

/**
 * Upsert user profile into Supabase PostgreSQL 'profiles' table
 */
async function upsertProfile(userId, profileData) {
  const admin = getAdminClient();
  if (!admin) return null;

  const payload = {
    user_id: userId,
    full_name: profileData.fullName || profileData.name || 'Traveler',
    email: profileData.email || null,
    phone: profileData.phone || null,
    age: profileData.age ? parseInt(profileData.age, 10) : null,
    gender: profileData.gender || 'Female',
    city: profileData.city || 'Delhi',
    travel_style: profileData.travelStyle || 'Solo',
    destination: profileData.destination || 'Kedarkantha Summit',
    start_date: profileData.startDate || null,
    end_date: profileData.endDate || null,
    budget_range: profileData.budgetRange || '5000-9000',
    bio: profileData.bio || '',
    past_trips: profileData.pastTrips || '',
    profile_image: profileData.profileImage || null,
    interests: Array.isArray(profileData.interests) ? profileData.interests : ['trekking', 'photography'],
    profile_completeness: profileData.profileCompleteness || 50,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await admin
    .from('profiles')
    .upsert(payload, { onConflict: 'user_id' })
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Failed to upsert profile:', error.message);
    return null;
  }
  return data;
}

/**
 * Fetch a profile by Supabase user_id
 */
async function getProfileByUserId(userId) {
  const admin = getAdminClient();
  if (!admin) return null;

  const { data, error } = await admin
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('[Supabase] Failed to fetch profile:', error.message);
  }
  return data || null;
}

/**
 * Save a confirmed Razorpay booking into Supabase PostgreSQL 'bookings' table
 */
async function saveBooking(bookingData) {
  const admin = getAdminClient();
  if (!admin) return null;

  const payload = {
    user_id: bookingData.userId || null,
    booking_ref: bookingData.bookingRef,
    package_name: bookingData.packageName,
    destination: bookingData.destination,
    amount: bookingData.amount,
    traveler_count: bookingData.travelerCount || 1,
    start_date: bookingData.startDate || null,
    company: bookingData.company || 'TripZen Expeditions',
    lead_name: bookingData.leadName,
    lead_phone: bookingData.leadPhone,
    lead_email: bookingData.leadEmail,
    razorpay_order_id: bookingData.razorpayOrderId || null,
    razorpay_payment_id: bookingData.razorpayPaymentId || null,
    razorpay_signature: bookingData.razorpaySignature || null,
    status: bookingData.status || 'confirmed',
    created_at: new Date().toISOString(),
  };

  const { data, error } = await admin
    .from('bookings')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Failed to save booking:', error.message);
    return null;
  }
  return data;
}

/**
 * Upload Avatar or Trip Image to Supabase Storage bucket
 */
async function uploadAvatar(userId, fileBuffer, mimeType = 'image/jpeg') {
  const admin = getAdminClient();
  if (!admin) return null;

  const fileName = `${userId}_${Date.now()}.jpg`;
  const filePath = `avatars/${fileName}`;

  const { data, error } = await admin.storage
    .from('avatars')
    .upload(filePath, fileBuffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) {
    console.error('[Supabase Storage] Upload error:', error.message);
    return null;
  }

  const { data: publicUrlData } = admin.storage.from('avatars').getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}

/**
 * List all users from Supabase Auth & Profiles
 */
async function listUsers() {
  const admin = getAdminClient();
  if (!admin) return [];

  const { data, error } = await admin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Failed to list users:', error.message);
    return [];
  }
  return data || [];
}

/**
 * List all bookings from Supabase
 */
async function listBookings() {
  const admin = getAdminClient();
  if (!admin) return [];

  const { data, error } = await admin
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Failed to list bookings:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Update booking status in Supabase
 */
async function updateBookingStatus(bookingRefOrId, status) {
  const admin = getAdminClient();
  if (!admin) return null;

  const { data, error } = await admin
    .from('bookings')
    .update({ status, updated_at: new Date().toISOString() })
    .or(`id.eq.${bookingRefOrId},booking_ref.eq.${bookingRefOrId}`)
    .select();

  if (error) {
    console.error('[Supabase] Failed to update booking:', error.message);
    return null;
  }
  return data;
}

module.exports = {
  isConfigured,
  getClient,
  getAdminClient,
  sendEmailOtp,
  sendPhoneOtp,
  verifyOtp,
  upsertProfile,
  getProfileByUserId,
  saveBooking,
  uploadAvatar,
  listUsers,
  listBookings,
  updateBookingStatus,
};
