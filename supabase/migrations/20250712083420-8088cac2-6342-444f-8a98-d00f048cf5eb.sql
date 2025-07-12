-- Create demo users data (this will be for auth signup)
-- We'll manually create these users through the auth system later

-- First let's fix some remaining issues with the database

-- Update profiles table to ensure it can handle the new structure correctly
UPDATE profiles SET full_name = 'Admin User' WHERE email = 'admin@demo.com';
UPDATE profiles SET full_name = 'Demo User' WHERE email = 'user@demo.com';