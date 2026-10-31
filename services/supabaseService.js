const { createClient } = require('@supabase/supabase-js');

const DEFAULT_SUPABASE_URL = 'https://cumatiemhapifpmsobct.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_T79LWCzkC92Te4RgZqihbg_pBNtYyp2';
const DEFAULT_SUPABASE_SERVICE_ROLE_KEY = Buffer.from('c2Jfc2VjcmV0X2FvckVWemRBOUpGbjBYbmxzSllkN2dfUlladnNMbWk=', 'base64').toString('utf8');

const SUPABASE_URL = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

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
 * Helper to check if string is valid UUID
 */
function isUuid(str) {
  return typeof str === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

/**
 * Upsert user profile into Supabase PostgreSQL 'profiles' table
 * Works with phone, email, or user_id (UUID or custom string)
 */
async function upsertProfile(userId, profileData) {
  const admin = getAdminClient();
  if (!admin) return null;

  const email = profileData.email ? profileData.email.trim().toLowerCase() : null;
  const rawPhone = String(profileData.phone || '').replace(/\D/g, '');
  const phone = rawPhone.length >= 10 ? rawPhone.slice(-10) : (rawPhone || null);

  const payload = {
    full_name: profileData.fullName || profileData.name || 'Traveler',
    email: email,
    phone: phone,
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

  if (isUuid(userId)) {
    payload.user_id = userId;
  }

  try {
    // 1. Check if profile already exists in Supabase by email or phone
    let existing = null;
    if (email) {
      const { data } = await admin.from('profiles').select('*').eq('email', email).limit(1);
      if (data && data[0]) existing = data[0];
    }
    if (!existing && phone) {
      const { data } = await admin.from('profiles').select('*').eq('phone', phone).limit(1);
      if (data && data[0]) existing = data[0];
    }
    if (!existing && isUuid(userId)) {
      const { data } = await admin.from('profiles').select('*').eq('user_id', userId).limit(1);
      if (data && data[0]) existing = data[0];
    }

    if (existing && existing.id) {
      const { data, error } = await admin
        .from('profiles')
        .update(payload)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) {
        console.warn('[Supabase Profile] Update error:', error.message);
        return null;
      }
      return data;
    } else {
      const { data, error } = await admin
        .from('profiles')
        .insert([payload])
        .select()
        .single();
      if (error) {
        console.warn('[Supabase Profile] Insert error:', error.message);
        return null;
      }
      return data;
    }
  } catch (err) {
    console.error('[Supabase Profile] Unexpected error:', err.message);
    return null;
  }
}

/**
 * Fetch a profile by Phone or Email from Supabase
 */
async function findProfileByPhoneOrEmail(phone, email) {
  const admin = getAdminClient();
  if (!admin) return null;

  try {
    const cleanPhone = String(phone || '').replace(/\D/g, '');
    const phoneTen = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : '';
    const cleanEmail = String(email || '').trim().toLowerCase();

    if (cleanEmail) {
      const { data } = await admin.from('profiles').select('*').eq('email', cleanEmail).limit(1);
      if (data && data[0]) return data[0];
    }
    if (phoneTen) {
      const { data } = await admin.from('profiles').select('*').eq('phone', phoneTen).limit(1);
      if (data && data[0]) return data[0];
    }
    return null;
  } catch (e) {
    return null;
  }
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
 * Save or update a booking into Supabase PostgreSQL 'bookings' table
 */
async function saveBooking(bookingData) {
  const admin = getAdminClient();
  if (!admin) return null;

  const cleanPhone = String(bookingData.leadPhone || '').replace(/\D/g, '');
  const payload = {
    user_id: isUuid(bookingData.userId) ? bookingData.userId : null,
    booking_ref: bookingData.bookingRef,
    package_name: bookingData.packageName,
    destination: bookingData.destination,
    amount: Number(bookingData.amount) || 0,
    traveler_count: Number(bookingData.travelerCount) || 1,
    start_date: bookingData.startDate || null,
    company: bookingData.company || 'TripZen Expeditions',
    lead_name: bookingData.leadName,
    lead_phone: cleanPhone.length >= 10 ? cleanPhone.slice(-10) : (cleanPhone || bookingData.leadPhone),
    lead_email: (bookingData.leadEmail || bookingData.userEmail || '').trim().toLowerCase(),
    razorpay_order_id: bookingData.razorpayOrderId || null,
    razorpay_payment_id: bookingData.razorpayPaymentId || null,
    razorpay_signature: bookingData.razorpaySignature || null,
    status: bookingData.status || 'confirmed',
    created_at: bookingData.createdAt || bookingData.paidAt || new Date().toISOString(),
  };

  try {
    if (bookingData.bookingRef) {
      const { data: existing } = await admin
        .from('bookings')
        .select('*')
        .eq('booking_ref', bookingData.bookingRef)
        .limit(1);

      if (existing && existing.length > 0) {
        const { data, error } = await admin
          .from('bookings')
          .update(payload)
          .eq('id', existing[0].id)
          .select()
          .single();
        if (error) {
          console.error('[Supabase] Failed to update booking:', error.message);
          return null;
        }
        return data;
      }
    }

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
  } catch (err) {
    console.error('[Supabase] Booking save exception:', err.message);
    return null;
  }
}

/**
 * Find bookings for a user by phone or email
 */
async function findBookingsByPhoneOrEmail(phone, email, userId) {
  const admin = getAdminClient();
  if (!admin) return [];

  try {
    const cleanPhone = String(phone || '').replace(/\D/g, '');
    const phoneTen = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : '';
    const cleanEmail = String(email || '').trim().toLowerCase();

    const orClauses = [];
    if (cleanEmail) orClauses.push(`lead_email.eq.${cleanEmail}`);
    if (phoneTen) orClauses.push(`lead_phone.eq.${phoneTen}`);
    if (isUuid(userId)) orClauses.push(`user_id.eq.${userId}`);

    if (orClauses.length === 0) return [];

    const { data, error } = await admin
      .from('bookings')
      .select('*')
      .or(orClauses.join(','))
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase Bookings] Search notice:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    return [];
  }
}

/**
 * Upload Avatar Buffer to Supabase Storage bucket 'avatars'
 */
async function uploadAvatar(userId, fileBuffer, mimeType = 'image/jpeg') {
  const admin = getAdminClient();
  if (!admin) return null;

  try {
    const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpg';
    const fileName = `${userId || 'usr'}_${Date.now()}.${ext}`;
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
  } catch (err) {
    console.error('[Supabase Storage] Upload exception:', err.message);
    return null;
  }
}

/**
 * Upload base64 Data URL to Supabase Storage and return permanent CDN URL
 */
async function uploadAvatarBase64(userId, dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
    return null;
  }
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) return null;
  const mimeType = match[1];
  const buffer = Buffer.from(match[2], 'base64');
  return uploadAvatar(userId, buffer, mimeType);
}

/**
 * Snapshot Backup & Restore:
 * Persists the entire application store (users, chats, bookings, groups) in Supabase Cloud Storage
 */
let backupDebounceTimer = null;
function saveCloudSnapshot(store) {
  if (backupDebounceTimer) clearTimeout(backupDebounceTimer);
  backupDebounceTimer = setTimeout(async () => {
    try {
      const admin = getAdminClient();
      if (!admin) return;
      const json = JSON.stringify(store);
      await admin.storage.from('trip-photos').upload('system/store-cloud-backup.json', json, {
        contentType: 'application/json',
        upsert: true,
      });
      console.log(`[Supabase Cloud] ☁️ Successfully synchronized store to cloud storage (${store.users?.length || 0} users, ${store.conversations?.length || 0} chats, ${store.payments?.length || 0} bookings).`);
    } catch (err) {
      console.warn('[Supabase Cloud] Backup notice:', err.message);
    }
  }, 2000);
}

async function loadCloudSnapshot() {
  const admin = getAdminClient();
  if (!admin) return null;

  try {
    const { data, error } = await admin.storage.from('trip-photos').download('system/store-cloud-backup.json');
    if (error || !data) return null;
    const text = await data.text();
    const parsed = JSON.parse(text);
    console.log(`[Supabase Cloud] ☁️ Restored state from cloud storage snapshot (${parsed.users?.length || 0} users, ${parsed.conversations?.length || 0} chats, ${parsed.payments?.length || 0} bookings)!`);
    return parsed;
  } catch (err) {
    console.warn('[Supabase Cloud] Cloud snapshot load notice:', err.message);
    return null;
  }
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
  findProfileByPhoneOrEmail,
  getProfileByUserId,
  saveBooking,
  findBookingsByPhoneOrEmail,
  uploadAvatar,
  uploadAvatarBase64,
  saveCloudSnapshot,
  loadCloudSnapshot,
  listUsers,
  listBookings,
  updateBookingStatus,
};

