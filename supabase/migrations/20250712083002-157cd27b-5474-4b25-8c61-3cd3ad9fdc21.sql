-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Recreate policies with correct names
CREATE POLICY "user_roles_select_own" ON user_roles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_roles_admin_all" ON user_roles
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Update profiles policies
CREATE POLICY "profiles_select_all" ON profiles
FOR SELECT USING (true);

CREATE POLICY "profiles_update_own" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);