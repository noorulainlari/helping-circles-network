
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';
import { sanitizeInput, amountSchema, referralCodeSchema } from '@/components/security/InputValidator';

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
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to activate a package',
        variant: 'destructive',
      });
      return { success: false, error: 'Authentication required' };
    }

    try {
      // Validate inputs
      if (!packageId || typeof packageId !== 'string') {
        throw new Error('Invalid package ID');
      }

      // Validate referral code if provided
      if (referralCode) {
        const sanitizedCode = sanitizeInput(referralCode);
        try {
          referralCodeSchema.parse(sanitizedCode);
        } catch (validationError) {
          toast({
            title: 'Invalid Referral Code',
            description: 'Please enter a valid referral code format',
            variant: 'destructive',
          });
          return { success: false, error: 'Invalid referral code format' };
        }
      }

      // Validate package exists and is active
      const selectedPackage = packages.find(pkg => pkg.id === packageId);
      if (!selectedPackage) {
        throw new Error('Package not found or inactive');
      }

      // Validate package amount
      try {
        amountSchema.parse(selectedPackage.amount);
      } catch (validationError) {
        throw new Error('Invalid package amount');
      }

      // Use the existing RPC function for now
      const { data, error } = await supabase.rpc('rpc_activate_package', {
        package_id: packageId,
        referral_code: referralCode ? sanitizeInput(referralCode) : null,
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
        description: error instanceof Error ? error.message : 'Failed to activate package',
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
