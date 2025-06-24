
-- Drop all dependent policies first
DROP POLICY IF EXISTS "Admin can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admin can view all transactions" ON public.transactions;
DROP POLICY IF EXISTS "Admin can manage all withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS "Admin can manage referral commissions" ON public.referral_commissions;
DROP POLICY IF EXISTS "Admin can manage ROI distributions" ON public.roi_distributions;
DROP POLICY IF EXISTS "Admin can manage packages" ON public.packages;
DROP POLICY IF EXISTS "Admin can manage settings" ON public.admin_settings;

-- Drop any other existing policies that might conflict
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
DROP POLICY IF EXISTS "System can insert transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can view own withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS "Users can create withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS "Users can create own withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS "Everyone can view active packages" ON public.packages;
DROP POLICY IF EXISTS "Anyone can view active packages" ON public.packages;
DROP POLICY IF EXISTS "Users can view own referral commissions" ON public.referral_commissions;
DROP POLICY IF EXISTS "Users can view own ROI distributions" ON public.roi_distributions;

-- Now drop the existing function
DROP FUNCTION IF EXISTS public.get_user_role(uuid);
DROP FUNCTION IF EXISTS public.get_user_role();

-- Create user roles table for proper admin management
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create the new get_user_role function
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID DEFAULT NULL)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Create trigger to assign default user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own role" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles" ON public.user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Ensure RLS is enabled on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roi_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create new RLS policies using the updated function
-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (public.get_user_role() = 'admin');

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions" ON public.transactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all transactions" ON public.transactions
  FOR ALL USING (public.get_user_role() = 'admin');

-- Withdrawals policies
CREATE POLICY "Users can view own withdrawals" ON public.withdrawals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawals" ON public.withdrawals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all withdrawals" ON public.withdrawals
  FOR ALL USING (public.get_user_role() = 'admin');

-- Packages policies
CREATE POLICY "Everyone can view active packages" ON public.packages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage packages" ON public.packages
  FOR ALL USING (public.get_user_role() = 'admin');

-- Referral commissions policies
CREATE POLICY "Users can view own referral commissions" ON public.referral_commissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage referral commissions" ON public.referral_commissions
  FOR ALL USING (public.get_user_role() = 'admin');

-- ROI distributions policies
CREATE POLICY "Users can view own ROI distributions" ON public.roi_distributions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage ROI distributions" ON public.roi_distributions
  FOR ALL USING (public.get_user_role() = 'admin');

-- Admin settings policies
CREATE POLICY "Admins can manage settings" ON public.admin_settings
  FOR ALL USING (public.get_user_role() = 'admin');

-- Insert default admin settings if they don't exist
INSERT INTO public.admin_settings (setting_key, setting_value, description) VALUES
  ('referral_levels', '{"level_1": 10, "level_2": 5, "level_3": 2}', 'Referral commission percentages'),
  ('withdrawal_limits', '{"min_amount": 10, "max_amount": 10000}', 'Withdrawal amount limits'),
  ('roi_settings', '{"daily_distribution": true, "auto_distribute": true}', 'ROI distribution settings')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default packages if they don't exist
INSERT INTO public.packages (name, amount, roi_percentage, roi_days, referral_bonus, is_active) VALUES
  ('Starter Package', 100, 1.0, 100, 10, true),
  ('Premium Package', 500, 1.2, 120, 25, true),
  ('VIP Package', 1000, 1.5, 150, 50, true)
ON CONFLICT DO NOTHING;
