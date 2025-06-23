
-- Package activation function
CREATE OR REPLACE FUNCTION public.activate_package(
  p_package_id UUID,
  p_referred_by_code TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_package packages%ROWTYPE;
  v_referrer_id UUID;
  v_result JSON;
  v_transaction_id UUID;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'User not authenticated');
  END IF;
  
  -- Get package details
  SELECT * INTO v_package FROM packages WHERE id = p_package_id AND is_active = true;
  
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
  INSERT INTO transactions (user_id, type, amount, status, description)
  VALUES (v_user_id, 'package_purchase', v_package.amount, 'completed', 'Package activation: ' || v_package.name)
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

-- Process referral commissions function
CREATE OR REPLACE FUNCTION public.process_referral_commissions(
  p_new_user_id UUID,
  p_referrer_id UUID,
  p_package_amount DECIMAL
)
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
    INSERT INTO referral_commissions (user_id, referred_user_id, level, amount, package_amount)
    VALUES (v_level1_user_id, p_new_user_id, 1, v_commission, p_package_amount);
    
    -- Update wallet balance
    UPDATE profiles 
    SET 
      wallet_balance = COALESCE(wallet_balance, 0) + v_commission,
      total_referral_earned = COALESCE(total_referral_earned, 0) + v_commission
    WHERE id = v_level1_user_id;
    
    -- Create transaction record
    INSERT INTO transactions (user_id, type, amount, status, description)
    VALUES (v_level1_user_id, 'referral_bonus', v_commission, 'completed', 'Level 1 referral bonus');
    
    -- Get level 2 referrer
    SELECT referred_by INTO v_level2_user_id FROM profiles WHERE id = v_level1_user_id;
  END IF;
  
  -- Level 2 commission
  IF v_level2_user_id IS NOT NULL THEN
    v_commission := p_package_amount * v_level2_rate;
    
    INSERT INTO referral_commissions (user_id, referred_user_id, level, amount, package_amount)
    VALUES (v_level2_user_id, p_new_user_id, 2, v_commission, p_package_amount);
    
    UPDATE profiles 
    SET 
      wallet_balance = COALESCE(wallet_balance, 0) + v_commission,
      total_referral_earned = COALESCE(total_referral_earned, 0) + v_commission
    WHERE id = v_level2_user_id;
    
    INSERT INTO transactions (user_id, type, amount, status, description)
    VALUES (v_level2_user_id, 'referral_bonus', v_commission, 'completed', 'Level 2 referral bonus');
    
    -- Get level 3 referrer
    SELECT referred_by INTO v_level3_user_id FROM profiles WHERE id = v_level2_user_id;
  END IF;
  
  -- Level 3 commission
  IF v_level3_user_id IS NOT NULL THEN
    v_commission := p_package_amount * v_level3_rate;
    
    INSERT INTO referral_commissions (user_id, referred_user_id, level, amount, package_amount)
    VALUES (v_level3_user_id, p_new_user_id, 3, v_commission, p_package_amount);
    
    UPDATE profiles 
    SET 
      wallet_balance = COALESCE(wallet_balance, 0) + v_commission,
      total_referral_earned = COALESCE(total_referral_earned, 0) + v_commission
    WHERE id = v_level3_user_id;
    
    INSERT INTO transactions (user_id, type, amount, status, description)
    VALUES (v_level3_user_id, 'referral_bonus', v_commission, 'completed', 'Level 3 referral bonus');
  END IF;
END;
$$;

-- Daily ROI distribution function
CREATE OR REPLACE FUNCTION public.distribute_daily_roi()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user RECORD;
  v_package packages%ROWTYPE;
  v_roi_amount DECIMAL;
  v_day_number INTEGER;
  v_distributed_count INTEGER := 0;
BEGIN
  -- Process all active users
  FOR v_user IN 
    SELECT p.*, pkg.roi_percentage, pkg.roi_days, pkg.amount as package_amount
    FROM profiles p
    JOIN packages pkg ON p.package_id = pkg.id
    WHERE p.status = 'active' 
    AND p.package_activated_at IS NOT NULL
  LOOP
    -- Calculate day number since activation
    v_day_number := EXTRACT(DAY FROM (NOW() - v_user.package_activated_at))::INTEGER + 1;
    
    -- Check if within ROI period and not already distributed today
    IF v_day_number <= v_user.roi_days AND 
       NOT EXISTS (
         SELECT 1 FROM roi_distributions 
         WHERE user_id = v_user.id 
         AND day_number = v_day_number
         AND DATE(distributed_at) = CURRENT_DATE
       ) THEN
      
      -- Calculate ROI amount
      v_roi_amount := v_user.package_amount * (v_user.roi_percentage / 100);
      
      -- Insert ROI distribution record
      INSERT INTO roi_distributions (user_id, package_id, amount, day_number)
      VALUES (v_user.id, v_user.package_id, v_roi_amount, v_day_number);
      
      -- Update user wallet
      UPDATE profiles 
      SET 
        wallet_balance = COALESCE(wallet_balance, 0) + v_roi_amount,
        total_roi_earned = COALESCE(total_roi_earned, 0) + v_roi_amount
      WHERE id = v_user.id;
      
      -- Create transaction record
      INSERT INTO transactions (user_id, type, amount, status, description)
      VALUES (v_user.id, 'roi', v_roi_amount, 'completed', 'Daily ROI - Day ' || v_day_number);
      
      v_distributed_count := v_distributed_count + 1;
    END IF;
  END LOOP;
  
  RETURN json_build_object(
    'success', true, 
    'distributed_count', v_distributed_count,
    'timestamp', NOW()
  );
END;
$$;

-- Withdrawal request function
CREATE OR REPLACE FUNCTION public.request_withdrawal(
  p_amount DECIMAL,
  p_payment_method payment_method,
  p_payment_details JSONB
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_user_balance DECIMAL;
  v_min_amount DECIMAL;
  v_max_amount DECIMAL;
  v_withdrawal_id UUID;
  v_settings JSONB;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'User not authenticated');
  END IF;
  
  -- Get withdrawal limits
  SELECT setting_value INTO v_settings 
  FROM admin_settings 
  WHERE setting_key = 'withdrawal_limits';
  
  v_min_amount := (v_settings->>'min_amount')::DECIMAL;
  v_max_amount := (v_settings->>'max_amount')::DECIMAL;
  
  -- Validate amount
  IF p_amount < v_min_amount THEN
    RETURN json_build_object('success', false, 'error', 'Amount below minimum limit');
  END IF;
  
  IF p_amount > v_max_amount THEN
    RETURN json_build_object('success', false, 'error', 'Amount above maximum limit');
  END IF;
  
  -- Check user balance
  SELECT wallet_balance INTO v_user_balance FROM profiles WHERE id = v_user_id;
  
  IF v_user_balance < p_amount THEN
    RETURN json_build_object('success', false, 'error', 'Insufficient balance');
  END IF;
  
  -- Create withdrawal request
  INSERT INTO withdrawals (user_id, amount, payment_method, payment_details, status)
  VALUES (v_user_id, p_amount, p_payment_method, p_payment_details, 'pending')
  RETURNING id INTO v_withdrawal_id;
  
  -- Deduct from wallet
  UPDATE profiles 
  SET wallet_balance = wallet_balance - p_amount
  WHERE id = v_user_id;
  
  -- Create transaction record
  INSERT INTO transactions (user_id, type, amount, status, description, reference_id)
  VALUES (v_user_id, 'withdrawal', -p_amount, 'pending', 'Withdrawal request', v_withdrawal_id);
  
  RETURN json_build_object('success', true, 'withdrawal_id', v_withdrawal_id);
END;
$$;

-- Admin function to process withdrawal
CREATE OR REPLACE FUNCTION public.admin_process_withdrawal(
  p_withdrawal_id UUID,
  p_action TEXT, -- 'approve' or 'reject'
  p_notes TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_withdrawal withdrawals%ROWTYPE;
  v_user_role TEXT;
BEGIN
  -- Check if user is admin
  v_user_role := public.get_user_role(auth.uid());
  
  IF v_user_role != 'admin' THEN
    RETURN json_build_object('success', false, 'error', 'Unauthorized');
  END IF;
  
  -- Get withdrawal details
  SELECT * INTO v_withdrawal FROM withdrawals WHERE id = p_withdrawal_id;
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Withdrawal not found');
  END IF;
  
  IF p_action = 'approve' THEN
    -- Update withdrawal status
    UPDATE withdrawals 
    SET 
      status = 'completed',
      admin_notes = p_notes,
      updated_at = NOW()
    WHERE id = p_withdrawal_id;
    
    -- Update transaction status
    UPDATE transactions 
    SET status = 'completed'
    WHERE reference_id = p_withdrawal_id AND type = 'withdrawal';
    
    -- Update user total withdrawn
    UPDATE profiles 
    SET total_withdrawn = COALESCE(total_withdrawn, 0) + v_withdrawal.amount
    WHERE id = v_withdrawal.user_id;
    
  ELSIF p_action = 'reject' THEN
    -- Update withdrawal status
    UPDATE withdrawals 
    SET 
      status = 'rejected',
      admin_notes = p_notes,
      updated_at = NOW()
    WHERE id = p_withdrawal_id;
    
    -- Refund to wallet
    UPDATE profiles 
    SET wallet_balance = wallet_balance + v_withdrawal.amount
    WHERE id = v_withdrawal.user_id;
    
    -- Update transaction status
    UPDATE transactions 
    SET status = 'cancelled'
    WHERE reference_id = p_withdrawal_id AND type = 'withdrawal';
    
  ELSE
    RETURN json_build_object('success', false, 'error', 'Invalid action');
  END IF;
  
  RETURN json_build_object('success', true, 'action', p_action);
END;
$$;

-- Function to get user wallet history
CREATE OR REPLACE FUNCTION public.get_wallet_history(
  p_user_id UUID DEFAULT NULL,
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
  id UUID,
  type transaction_type,
  amount DECIMAL,
  status transaction_status,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_target_user_id UUID;
BEGIN
  -- Use provided user_id or current authenticated user
  v_target_user_id := COALESCE(p_user_id, auth.uid());
  
  -- Check if user can access this data
  IF v_target_user_id != auth.uid() AND public.get_user_role(auth.uid()) != 'admin' THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;
  
  RETURN QUERY
  SELECT 
    t.id,
    t.type,
    t.amount,
    t.status,
    t.description,
    t.created_at
  FROM transactions t
  WHERE t.user_id = v_target_user_id
  ORDER BY t.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

-- RPC function for package activation (callable from frontend)
CREATE OR REPLACE FUNCTION public.rpc_activate_package(
  package_id UUID,
  referral_code TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.activate_package(package_id, referral_code);
END;
$$;

-- RPC function for withdrawal request (callable from frontend)
CREATE OR REPLACE FUNCTION public.rpc_request_withdrawal(
  amount DECIMAL,
  payment_method TEXT,
  payment_details JSONB
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.request_withdrawal(amount, payment_method::payment_method, payment_details);
END;
$$;
