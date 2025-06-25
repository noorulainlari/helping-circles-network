
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';
import { amountSchema, withdrawalDetailsSchema, upiDetailsSchema } from '@/components/security/InputValidator';

interface WalletTransaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  created_at: string;
}

export const useSecureWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchWalletData = async () => {
    if (!user) return;

    try {
      // Fetch user profile for balance
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('wallet_balance, total_roi_earned, total_referral_earned, total_withdrawn')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      setBalance(profile?.wallet_balance || 0);

      // Fetch transaction history
      const { data: walletHistory, error: historyError } = await supabase
        .rpc('get_wallet_history', {
          p_limit: 50,
          p_offset: 0,
        });

      if (historyError) throw historyError;

      setTransactions(walletHistory || []);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch wallet data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const requestWithdrawal = async (
    amount: number,
    paymentMethod: string,
    paymentDetails: any
  ) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to request withdrawal',
        variant: 'destructive',
      });
      return { success: false, error: 'Authentication required' };
    }

    try {
      // Validate amount
      const validatedAmount = amountSchema.parse(amount);

      // Validate payment details based on method
      if (paymentMethod === 'bank_transfer') {
        withdrawalDetailsSchema.parse(paymentDetails);
      } else if (paymentMethod === 'upi' || paymentMethod === 'gpay') {
        upiDetailsSchema.parse(paymentDetails);
      }

      // Use the new secure function
      const { data, error } = await supabase.rpc('secure_request_withdrawal', {
        p_amount: validatedAmount,
        p_payment_method: paymentMethod,
        p_payment_details: paymentDetails,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; withdrawal_id?: string };

      if (result.success) {
        toast({
          title: 'Withdrawal Requested',
          description: 'Your withdrawal request has been submitted successfully',
        });
        await fetchWalletData(); // Refresh wallet data
        return { success: true, data: result };
      } else {
        toast({
          title: 'Withdrawal Failed',
          description: result.error || 'Failed to request withdrawal',
          variant: 'destructive',
        });
        return { success: false, error: result.error };
      }
    } catch (error: any) {
      console.error('Error requesting withdrawal:', error);
      const errorMessage = error.message || 'Failed to request withdrawal';
      toast({
        title: 'Validation Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, [user]);

  return {
    balance,
    transactions,
    loading,
    requestWithdrawal,
    refetch: fetchWalletData,
  };
};
