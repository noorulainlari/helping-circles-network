
-- Add missing columns to packages table
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS roi_percentage DECIMAL(5,2) DEFAULT 10.00;
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS roi_days INTEGER DEFAULT 200;
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS referral_bonus DECIMAL(10,2) DEFAULT 100.00;

-- Add missing column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS package_activated_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS package_id UUID REFERENCES public.packages(id);

-- Update packages with realistic data
UPDATE public.packages SET 
  roi_percentage = 1.0,
  roi_days = 200,
  referral_bonus = CASE 
    WHEN amount = 1000 THEN 50
    WHEN amount = 1500 THEN 75
    WHEN amount = 3000 THEN 150
    WHEN amount = 5000 THEN 250
    ELSE 50
  END;

-- Create wallet history function
CREATE OR REPLACE FUNCTION public.get_wallet_history(p_limit INTEGER DEFAULT 50, p_offset INTEGER DEFAULT 0)
RETURNS TABLE (
  id UUID,
  type TEXT,
  amount DECIMAL,
  status TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.type::TEXT,
    t.amount,
    t.status::TEXT,
    t.note as description,
    t.created_at
  FROM public.transactions t
  WHERE t.user_id = auth.uid()
  ORDER BY t.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

-- Create package activation function
CREATE OR REPLACE FUNCTION public.activate_package(p_package_id UUID, p_referred_by_code TEXT DEFAULT NULL)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_package packages%ROWTYPE;
  v_referrer_id UUID;
  v_transaction_id UUID;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'User not authenticated');
  END IF;
  
  -- Get package details
  SELECT * INTO v_package FROM packages WHERE id = p_package_id AND status = true;
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Package not found or inactive');
  END IF;
  
  -- Check if user already has an active package
  IF EXISTS (SELECT 1 FROM profiles WHERE id = v_user_id AND status = 'active') THEN
    RETURN json_build_object('success', false, 'error', 'User already has an active package');
  END IF;
  
  -- Find referrer if code provided
  IF p_referred_by_code IS NOT NULL THEN
    SELECT id INTO v_referrer_id FROM profiles WHERE referral_code = p_referred_by_code;
    
    IF NOT FOUND THEN
      RETURN json_build_object('success', false, 'error', 'Invalid referral code');
    END IF;
  END IF;
  
  -- Create package purchase transaction
  INSERT INTO transactions (user_id, type, amount, status, note)
  VALUES (v_user_id, 'activation', v_package.amount, 'completed', 'Package activation: ' || v_package.name)
  RETURNING id INTO v_transaction_id;
  
  -- Update user profile
  UPDATE profiles 
  SET 
    package_id = p_package_id,
    package_activated_at = NOW(),
    status = 'active',
    referred_by = v_referrer_id
  WHERE id = v_user_id;
  
  -- Process referral commissions if referrer exists
  IF v_referrer_id IS NOT NULL THEN
    PERFORM public.process_referral_commissions(v_user_id, v_referrer_id, v_package.amount);
  END IF;
  
  RETURN json_build_object('success', true, 'transaction_id', v_transaction_id);
END;
$$;

-- Update process_referral_commissions function
CREATE OR REPLACE FUNCTION public.process_referral_commissions(p_new_user_id UUID, p_referrer_id UUID, p_package_amount DECIMAL)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_level1_user_id UUID := p_referrer_id;
  v_level2_user_id UUID;
  v_level3_user_id UUID;
  v_settings JSONB;
  v_level1_rate DECIMAL;
  v_level2_rate DECIMAL;
  v_level3_rate DECIMAL;
  v_commission DECIMAL;
BEGIN
  -- Get referral rates from admin settings
  SELECT setting_value INTO v_settings 
  FROM admin_settings 
  WHERE setting_key = 'referral_levels';
  
  v_level1_rate := (v_settings->>'level_1')::DECIMAL / 100;
  v_level2_rate := (v_settings->>'level_2')::DECIMAL / 100;
  v_level3_rate := (v_settings->>'level_3')::DECIMAL / 100;
  
  -- Level 1 commission
  IF v_level1_user_id IS NOT NULL THEN
    v_commission := p_package_amount * v_level1_rate;
    
    -- Insert commission record
    INSERT INTO referral_commissions (user_id, from_user, level, amount)
    VALUES (v_level1_user_id, p_new_user_id, 1, v_commission);
    
    -- Update wallet balance
    UPDATE profiles 
    SET 
      wallet_balance = COALESCE(wallet_balance, 0) + v_commission,
      total_referral_earned = COALESCE(total_referral_earned, 0) + v_commission
    WHERE id = v_level1_user_id;
    
    -- Create transaction record
    INSERT INTO transactions (user_id, type, amount, status, note)
    VALUES (v_level1_user_id, 'referral', v_commission, 'completed', 'Level 1 referral bonus');
    
    -- Get level 2 referrer
    SELECT referred_by INTO v_level2_user_id FROM profiles WHERE id = v_level1_user_id;
  END IF;
  
  -- Level 2 commission
  IF v_level2_user_id IS NOT NULL THEN
    v_commission := p_package_amount * v_level2_rate;
    
    INSERT INTO referral_commissions (user_id, from_user, level, amount)
    VALUES (v_level2_user_id, p_new_user_id, 2, v_commission);
    
    UPDATE profiles 
    SET 
      wallet_balance = COALESCE(wallet_balance, 0) + v_commission,
      total_referral_earned = COALESCE(total_referral_earned, 0) + v_commission
    WHERE id = v_level2_user_id;
    
    INSERT INTO transactions (user_id, type, amount, status, note)
    VALUES (v_level2_user_id, 'referral', v_commission, 'completed', 'Level 2 referral bonus');
    
    -- Get level 3 referrer
    SELECT referred_by INTO v_level3_user_id FROM profiles WHERE id = v_level2_user_id;
  END IF;
  
  -- Level 3 commission
  IF v_level3_user_id IS NOT NULL THEN
    v_commission := p_package_amount * v_level3_rate;
    
    INSERT INTO referral_commissions (user_id, from_user, level, amount)
    VALUES (v_level3_user_id, p_new_user_id, 3, v_commission);
    
    UPDATE profiles 
    SET 
      wallet_balance = COALESCE(wallet_balance, 0) + v_commission,
      total_referral_earned = COALESCE(total_referral_earned, 0) + v_commission
    WHERE id = v_level3_user_id;
    
    INSERT INTO transactions (user_id, type, amount, status, note)
    VALUES (v_level3_user_id, 'referral', v_commission, 'completed', 'Level 3 referral bonus');
  END IF;
END;
$$;

-- Create withdrawal request function
CREATE OR REPLACE FUNCTION public.request_withdrawal(p_amount DECIMAL, p_payment_method payment_method, p_payment_details JSONB)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_current_balance DECIMAL;
  v_withdrawal_id UUID;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'User not authenticated');
  END IF;
  
  -- Check current balance
  SELECT wallet_balance INTO v_current_balance FROM profiles WHERE id = v_user_id;
  
  IF v_current_balance < p_amount THEN
    RETURN json_build_object('success', false, 'error', 'Insufficient balance');
  END IF;
  
  -- Create withdrawal request
  INSERT INTO withdrawals (user_id, amount, payment_method, status)
  VALUES (v_user_id, p_amount, p_payment_method, 'pending')
  RETURNING id INTO v_withdrawal_id;
  
  -- Deduct from wallet balance
  UPDATE profiles 
  SET wallet_balance = wallet_balance - p_amount
  WHERE id = v_user_id;
  
  -- Create transaction record
  INSERT INTO transactions (user_id, type, amount, status, note)
  VALUES (v_user_id, 'withdrawal', p_amount, 'pending', 'Withdrawal request');
  
  RETURN json_build_object('success', true, 'withdrawal_id', v_withdrawal_id);
END;
$$;
