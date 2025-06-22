
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_status AS ENUM ('inactive', 'active', 'suspended');
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal', 'roi', 'referral_bonus', 'package_purchase');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');
CREATE TYPE withdrawal_status AS ENUM ('pending', 'matched', 'payment_uploaded', 'completed', 'rejected');
CREATE TYPE payment_method AS ENUM ('upi', 'gpay', 'bank_transfer', 'usdt');

-- Create packages table
CREATE TABLE public.packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    roi_percentage DECIMAL(5,2) NOT NULL DEFAULT 1.0,
    roi_days INTEGER NOT NULL DEFAULT 100,
    referral_bonus DECIMAL(10,2) NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    referral_code VARCHAR(20) UNIQUE NOT NULL,
    referred_by UUID REFERENCES public.profiles(id),
    status user_status DEFAULT 'inactive',
    package_id UUID REFERENCES public.packages(id),
    package_activated_at TIMESTAMP WITH TIME ZONE,
    wallet_balance DECIMAL(10,2) DEFAULT 0.00,
    total_roi_earned DECIMAL(10,2) DEFAULT 0.00,
    total_referral_earned DECIMAL(10,2) DEFAULT 0.00,
    total_withdrawn DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type transaction_type NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status transaction_status DEFAULT 'pending',
    description TEXT,
    reference_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create withdrawals table
CREATE TABLE public.withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_method payment_method NOT NULL,
    payment_details JSONB NOT NULL,
    status withdrawal_status DEFAULT 'pending',
    matched_with UUID REFERENCES public.withdrawals(id),
    payment_proof_url TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referral commissions table
CREATE TABLE public.referral_commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    referred_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 3),
    amount DECIMAL(10,2) NOT NULL,
    package_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ROI distributions table
CREATE TABLE public.roi_distributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    package_id UUID NOT NULL REFERENCES public.packages(id),
    amount DECIMAL(10,2) NOT NULL,
    day_number INTEGER NOT NULL,
    distributed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin settings table
CREATE TABLE public.admin_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment methods table for users
CREATE TABLE public.user_payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    method_type payment_method NOT NULL,
    method_details JSONB NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default packages
INSERT INTO public.packages (name, amount, roi_percentage, roi_days, referral_bonus) VALUES
('Basic Package', 1000.00, 1.0, 100, 100.00),
('Standard Package', 1500.00, 1.2, 100, 150.00),
('Premium Package', 3000.00, 1.5, 100, 300.00),
('VIP Package', 5000.00, 2.0, 100, 500.00);

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value, description) VALUES
('referral_levels', '{"level_1": 10, "level_2": 5, "level_3": 2}', 'Referral commission percentages for each level'),
('withdrawal_limits', '{"min_amount": 500, "max_amount": 50000}', 'Minimum and maximum withdrawal amounts'),
('roi_settings', '{"enabled": true, "auto_distribute": true}', 'ROI distribution settings'),
('platform_fees', '{"withdrawal_fee": 0, "transaction_fee": 0}', 'Platform fees configuration');

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roi_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_payment_methods ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT CASE 
    WHEN user_id = '00000000-0000-0000-0000-000000000000'::UUID THEN 'admin'
    ELSE 'user'
  END;
$$;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles" ON public.profiles
    FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all transactions" ON public.transactions
    FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for withdrawals
CREATE POLICY "Users can view own withdrawals" ON public.withdrawals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own withdrawals" ON public.withdrawals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can manage all withdrawals" ON public.withdrawals
    FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for referral commissions
CREATE POLICY "Users can view own referral commissions" ON public.referral_commissions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage referral commissions" ON public.referral_commissions
    FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for ROI distributions
CREATE POLICY "Users can view own ROI distributions" ON public.roi_distributions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage ROI distributions" ON public.roi_distributions
    FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for user payment methods
CREATE POLICY "Users can manage own payment methods" ON public.user_payment_methods
    FOR ALL USING (auth.uid() = user_id);

-- Create function to generate unique referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
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

-- Create trigger function for new user registration
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
        mobile,
        country,
        city,
        referral_code
    ) VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'mobile', ''),
        COALESCE(NEW.raw_user_meta_data ->> 'country', ''),
        COALESCE(NEW.raw_user_meta_data ->> 'city', ''),
        public.generate_referral_code()
    );
    RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_profiles_referral_code ON public.profiles(referral_code);
CREATE INDEX idx_profiles_referred_by ON public.profiles(referred_by);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_type ON public.transactions(type);
CREATE INDEX idx_withdrawals_user_id ON public.withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON public.withdrawals(status);
CREATE INDEX idx_referral_commissions_user_id ON public.referral_commissions(user_id);
CREATE INDEX idx_roi_distributions_user_id ON public.roi_distributions(user_id);
