
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';
import { Tables } from '@/integrations/supabase/types';

type Package = Tables<'packages'>;

export const useSecurePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('amount', { ascending: true });

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch packages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const activatePackage = async (packageId: string, referralCode?: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to activate a package',
        variant: 'destructive',
      });
      return { success: false, error: 'Authentication required' };
    }

    try {
      // Use the new secure function
      const { data, error } = await supabase.rpc('secure_activate_package', {
        p_package_id: packageId,
        p_referral_code: referralCode || null,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; transaction_id?: string };

      if (result.success) {
        toast({
          title: 'Success!',
          description: 'Package activated successfully!',
        });
        return { success: true, data: result };
      } else {
        toast({
          title: 'Activation Failed',
          description: result.error || 'Failed to activate package',
          variant: 'destructive',
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error activating package:', error);
      toast({
        title: 'Error',
        description: 'Failed to activate package',
        variant: 'destructive',
      });
      return { success: false, error: 'Failed to activate package' };
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return {
    packages,
    loading,
    activatePackage,
    refetch: fetchPackages,
  };
};
