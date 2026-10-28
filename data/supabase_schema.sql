-- ====================================================================
-- TripZen Supabase Database Schema Migration
-- ====================================================================
-- Run this script in your Supabase Dashboard:
-- https://supabase.com/dashboard/project/_/sql
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  age INTEGER,
  gender TEXT DEFAULT 'Female',
  city TEXT DEFAULT 'Delhi',
  travel_style TEXT DEFAULT 'Solo',
  destination TEXT DEFAULT 'Kedarkantha Summit',
  start_date DATE,
  end_date DATE,
  budget_range TEXT DEFAULT '5000-9000',
  bio TEXT DEFAULT '',
  past_trips TEXT DEFAULT '',
  profile_image TEXT,
  interests TEXT[] DEFAULT ARRAY['trekking', 'photography'],
  profile_completeness INTEGER DEFAULT 45,
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast user queries
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_destination ON public.profiles(destination);

-- 3. Trip Bookings Table (connected to Razorpay payments)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  booking_ref TEXT UNIQUE NOT NULL,
  package_name TEXT NOT NULL,
  destination TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  traveler_count INTEGER DEFAULT 1,
  start_date DATE,
  company TEXT DEFAULT 'TripZen Expeditions',
  lead_name TEXT NOT NULL,
  lead_phone TEXT NOT NULL,
  lead_email TEXT NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  status TEXT DEFAULT 'confirmed', -- 'pending' | 'confirmed' | 'cancelled'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON public.bookings(booking_ref);

-- 4. Conversations Table (Matchmaking Chats)
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination TEXT NOT NULL,
  member_user_ids UUID[] NOT NULL,
  type TEXT DEFAULT 'direct', -- 'direct' | 'group'
  title TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);

-- 6. Trip Groups Table (Group Expeditions)
CREATE TABLE IF NOT EXISTS public.trip_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  max_members INTEGER DEFAULT 8,
  estimated_cost NUMERIC DEFAULT 6500,
  inclusions TEXT DEFAULT 'Camp Stay + All Meals + Trek Guide + Permits',
  status TEXT DEFAULT 'open',
  member_user_ids UUID[] DEFAULT ARRAY[]::UUID[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Automatic Profile Creation Trigger on Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, phone, profile_image)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(COALESCE(new.email, 'Traveler'), '@', 1)),
    new.email,
    new.phone,
    COALESCE(
      new.raw_user_meta_data->>'profile_image',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
    )
  )
  ON CONFLICT (user_id) DO UPDATE
  SET
    email = EXCLUDED.email,
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_groups ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can read profiles (for matchmaking); users can update their own
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- Bookings: Users can view their own bookings
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users or Server can insert bookings" 
  ON public.bookings FOR INSERT WITH CHECK (true);

-- Conversations & Messages: Members can view and post
CREATE POLICY "Members can view conversations"
  ON public.conversations FOR SELECT USING (auth.uid() = ANY(member_user_ids));

CREATE POLICY "Members can insert messages"
  ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_user_id);

CREATE POLICY "Members can read messages in their conversations"
  ON public.messages FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations c 
      WHERE c.id = conversation_id AND auth.uid() = ANY(c.member_user_ids)
    )
  );

-- Trip Groups: Viewable by everyone
CREATE POLICY "Trip groups are viewable by everyone"
  ON public.trip_groups FOR SELECT USING (true);

-- 9. Storage Bucket for Avatars and Trip Photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('trip-photos', 'trip-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Public access policies for avatars bucket
CREATE POLICY "Avatars are publicly accessible"
  ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars');
