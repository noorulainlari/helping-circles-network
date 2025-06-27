
-- Drop existing triggers and functions first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user_role() CASCADE;
DROP FUNCTION IF EXISTS public.get_user_role(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.generate_referral_code() CASCADE;

-- Drop all existing tables and start fresh
DROP TABLE IF EXISTS public.roi_distributions CASCADE;
DROP TABLE IF EXISTS public.referral_commissions CASCADE;
DROP TABLE IF EXISTS public.withdrawals CASCADE;
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.user_payment_methods CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.packages CASCADE;
DROP TABLE IF EXISTS public.admin_settings CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Drop existing types
DROP TYPE IF EXISTS user_status CASCADE;
DROP TYPE IF EXISTS transaction_type CASCADE;
DROP TYPE IF EXISTS transaction_status CASCADE;
DROP TYPE IF EXISTS withdrawal_status CASCADE;
DROP TYPE IF EXISTS payment_method CASCADE;

-- Create enum types
CREATE TYPE user_status AS ENUM ('inactive', 'active', 'suspended');
CREATE TYPE transaction_type AS ENUM ('activation', 'roi', 'referral', 'withdrawal');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE withdrawal_status AS ENUM ('pending', 'matched', 'proof_uploaded', 'completed', 'rejected');
CREATE TYPE payment_method AS ENUM ('upi', 'bank', 'usdt');

-- Packages table
CREATE TABLE public.packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    referral_code VARCHAR(20) UNIQUE NOT NULL,
    referred_by UUID REFERENCES public.profiles(id),
    status user_status DEFAULT 'inactive',
    wallet_balance DECIMAL(10,2) DEFAULT 0.00,
    total_roi_earned DECIMAL(10,2) DEFAULT 0.00,
    total_referral_earned DECIMAL(10,2) DEFAULT 0.00,
    total_withdrawn DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User payment methods table
CREATE TABLE public.user_payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    upi VARCHAR(255),
    bank_details JSONB,
    usdt_wallet VARCHAR(255),
    preferred_method payment_method NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type transaction_type NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    note TEXT,
    status transaction_status DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referral commissions table
CREATE TABLE public.referral_commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    from_user UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 3),
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROI distributions table
CREATE TABLE public.roi_distributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Withdrawals table
CREATE TABLE public.withdrawals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status withdrawal_status DEFAULT 'pending',
    payment_method payment_method NOT NULL,
    matched_user_id UUID REFERENCES public.profiles(id),
    proof_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin settings table
CREATE TABLE public.admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roi_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create get_user_role function
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

-- Generate referral code function
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    code TEXT;
    exists_check BOOLEAN;
BEGIN
    LOOP
        code := upper(substr(md5(random()::text), 1, 8));
        SELECT EXISTS(SELECT 1 FROM public.profiles WHERE referral_code = code) INTO exists_check;
        IF NOT exists_check THEN
            EXIT;
        END IF;
    END LOOP;
    RETURN code;
END;
$$;

-- Handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        referral_code
    ) VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
        NEW.email,
        public.generate_referral_code()
    );
    RETURN NEW;
END;
$$;

-- Handle new user role assignment
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

-- Create triggers
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_created_role
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- RLS Policies (AUTHENTICATED ONLY - NO ANON ACCESS)

-- Packages: Authenticated users can view active packages
CREATE POLICY "Authenticated users can view packages" ON public.packages
    FOR SELECT TO authenticated USING (status = true);

CREATE POLICY "Admins can manage packages" ON public.packages
    FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- Profiles: Users can view/update own, admins can view all
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- User payment methods: Users manage their own
CREATE POLICY "Users can manage own payment methods" ON public.user_payment_methods
    FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Transactions: Users can view their own
CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions" ON public.transactions
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all transactions" ON public.transactions
    FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- Referral commissions: Users can view their own
CREATE POLICY "Users can view own referral commissions" ON public.referral_commissions
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage referral commissions" ON public.referral_commissions
    FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- ROI distributions: Users can view their own
CREATE POLICY "Users can view own ROI distributions" ON public.roi_distributions
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage ROI distributions" ON public.roi_distributions
    FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- Withdrawals: Users can view/create their own
CREATE POLICY "Users can view own withdrawals" ON public.withdrawals
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawals" ON public.withdrawals
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all withdrawals" ON public.withdrawals
    FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- Admin settings: Only admins
CREATE POLICY "Admins can manage settings" ON public.admin_settings
    FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- User roles: Users can view their own, admins can manage
CREATE POLICY "Users can view their own role" ON public.user_roles
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
    FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- Insert default data
INSERT INTO public.packages (name, amount, status) VALUES
  ('Basic Package', 1000.00, true),
  ('Standard Package', 1500.00, true),
  ('Premium Package', 3000.00, true),
  ('VIP Package', 5000.00, true);

INSERT INTO public.admin_settings (setting_key, setting_value, description) VALUES
  ('referral_levels', '{"level_1": 5, "level_2": 3, "level_3": 1}', 'Referral commission percentages'),
  ('roi_settings', '{"daily_distribution": false, "manual_distribution": true}', 'ROI distribution settings'),
  ('withdrawal_limits', '{"min_amount": 100, "max_amount": 50000}', 'Withdrawal limits');
