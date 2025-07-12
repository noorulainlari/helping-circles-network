-- First, let's fix the profiles table structure to match the helping circles schema
-- Update profiles table to have the correct structure
ALTER TABLE profiles DROP COLUMN IF EXISTS package_id;
ALTER TABLE profiles DROP COLUMN IF EXISTS package_activated_at;
ALTER TABLE profiles DROP COLUMN IF EXISTS referral_code;
ALTER TABLE profiles DROP COLUMN IF EXISTS referred_by;
ALTER TABLE profiles DROP COLUMN IF EXISTS status;
ALTER TABLE profiles DROP COLUMN IF EXISTS total_referral_earned;
ALTER TABLE profiles DROP COLUMN IF EXISTS total_roi_earned;
ALTER TABLE profiles DROP COLUMN IF EXISTS total_withdrawn;
ALTER TABLE profiles DROP COLUMN IF EXISTS wallet_balance;

-- Add the correct columns for helping circles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website TEXT;

-- Ensure we have user_roles table for admin functionality
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'user' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS on user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles
CREATE POLICY "Users can view their own role" ON user_roles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON user_roles
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Update the handle_new_user function to work with our schema
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  
  -- Insert default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create get_user_role function
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
  v_user_id UUID;
  v_role TEXT;
BEGIN
  v_user_id := COALESCE(p_user_id, auth.uid());
  
  SELECT role INTO v_role 
  FROM public.user_roles 
  WHERE user_id = v_user_id;
  
  RETURN COALESCE(v_role, 'user');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create demo admin user (this will be inserted manually after user creation)
-- The admin user will be: admin@demo.com / admin123

-- Create demo regular user (this will be inserted manually after user creation) 
-- The regular user will be: user@demo.com / user123