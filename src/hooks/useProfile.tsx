
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  referral_code: string;
  referred_by: string | null;
  status: 'inactive' | 'active' | 'suspended';
  wallet_balance: number;
  total_roi_earned: number;
  total_referral_earned: number;
  total_withdrawn: number;
  created_at: string;
}

export const useProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
        setProfile(null);
      } else {
        setProfile(data);
        setError(null);
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      setError('Failed to fetch profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  return { 
    profile, 
    loading: authLoading || loading, 
    error, 
    refetch: fetchProfile 
  };
};
