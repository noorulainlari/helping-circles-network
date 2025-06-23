
-- Fix 1 & 2: Enable RLS on public tables that were missing it
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for packages (public read, admin write)
CREATE POLICY "Anyone can view active packages" ON public.packages
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage packages" ON public.packages
    FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for admin_settings (admin only)
CREATE POLICY "Admin can manage settings" ON public.admin_settings
    FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Fix 3 & 4: Set proper search_path for security definer functions
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT CASE 
    WHEN user_id = '00000000-0000-0000-0000-000000000000'::UUID THEN 'admin'
    ELSE 'user'
  END;
$$;

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
