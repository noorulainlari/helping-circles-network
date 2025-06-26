
-- Drop all existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can view active packages" ON public.packages;
DROP POLICY IF EXISTS "Anyone can view active packages" ON public.packages;
DROP POLICY IF EXISTS "Everyone can view active packages" ON public.packages;
DROP POLICY IF EXISTS "Admins can manage packages" ON public.packages;
DROP POLICY IF EXISTS "Admin can manage packages" ON public.packages;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
DROP POLICY IF EXISTS "System can insert transactions" ON public.transactions;
DROP POLICY IF EXISTS "Admins can view all transactions" ON public.transactions;

DROP POLICY IF EXISTS "Users can view own withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS "Users can create withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS "Users can create own withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS "Admins can manage all withdrawals" ON public.withdrawals;

DROP POLICY IF EXISTS "Users can view own referral commissions" ON public.referral_commissions;
DROP POLICY IF EXISTS "Admins can manage referral commissions" ON public.referral_commissions;

DROP POLICY IF EXISTS "Users can view own ROI distributions" ON public.roi_distributions;
DROP POLICY IF EXISTS "Admins can manage ROI distributions" ON public.roi_distributions;

DROP POLICY IF EXISTS "Users can manage own payment methods" ON public.user_payment_methods;

DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;

DROP POLICY IF EXISTS "Admins can manage settings" ON public.admin_settings;

-- Now create the secure policies

-- Packages: Only authenticated users can view active packages
CREATE POLICY "Authenticated users can view active packages" ON public.packages
    FOR SELECT 
    TO authenticated
    USING (is_active = true);

CREATE POLICY "Admins can manage packages" ON public.packages
    FOR ALL 
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- Profiles: Users can only see/edit their own, admins can see all
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE 
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR ALL 
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- Transactions: Users can only see their own
CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions" ON public.transactions
    FOR INSERT 
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all transactions" ON public.transactions
    FOR ALL 
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- Withdrawals: Users can only see/create their own
CREATE POLICY "Users can view own withdrawals" ON public.withdrawals
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawals" ON public.withdrawals
    FOR INSERT 
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all withdrawals" ON public.withdrawals
    FOR ALL 
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- Referral commissions: Users can only see their own
CREATE POLICY "Users can view own referral commissions" ON public.referral_commissions
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage referral commissions" ON public.referral_commissions
    FOR ALL 
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- ROI distributions: Users can only see their own
CREATE POLICY "Users can view own ROI distributions" ON public.roi_distributions
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage ROI distributions" ON public.roi_distributions
    FOR ALL 
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- User payment methods: Users can only manage their own
CREATE POLICY "Users can manage own payment methods" ON public.user_payment_methods
    FOR ALL 
    TO authenticated
    USING (auth.uid() = user_id);

-- User roles: Users can view their own role, only admins can manage
CREATE POLICY "Users can view their own role" ON public.user_roles
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles" ON public.user_roles
    FOR ALL 
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');

-- Admin settings: Only admins can manage
CREATE POLICY "Admins can manage settings" ON public.admin_settings
    FOR ALL 
    TO authenticated
    USING (public.get_user_role(auth.uid()) = 'admin');
