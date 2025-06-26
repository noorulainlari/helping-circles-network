import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

export const useProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    console.log('Fetching profile for user:', user?.id);
    
    try {
      if (!user) {
        console.log('No user found, setting profile to null');
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        if (error.code === 'PGRST116') {
          console.log('Profile not found for user, setting to null');
          setProfile(null);
        } else {
          console.error('Database error:', error);
          setProfile(null);
        }
      } else {
        console.log('Profile fetched successfully:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      setProfile(null);
    } finally {
      console.log('Setting profile loading to false');
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Only fetch profile if auth is not loading
    if (!authLoading) {
      fetchProfile();
    }
  }, [fetchProfile, authLoading]);

  // Keep loading true while auth is loading
  const isLoading = authLoading || loading;

  return { profile, loading: isLoading, refetch: fetchProfile };
};
