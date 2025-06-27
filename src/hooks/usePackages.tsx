
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Package {
  id: string;
  name: string;
  amount: number;
  roi_percentage: number;
  roi_days: number;
  referral_bonus: number;
  status: boolean;
  created_at: string;
}

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('status', true)
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
    try {
      const { data, error } = await supabase.rpc('rpc_activate_package', {
        package_id: packageId,
        referral_code: referralCode || null,
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
