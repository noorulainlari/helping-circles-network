
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';
import { sanitizeInput, amountSchema, withdrawalDetailsSchema, upiDetailsSchema } from '@/components/security/InputValidator';

export const useSecureWallet = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const validateWithdrawalAmount = (amount: number): boolean => {
    try {
      amountSchema.parse(amount);
      return true;
    } catch (error) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount between ₹1 and ₹50,000',
        variant: 'destructive',
      });
      return false;
    }
  };

  const validatePaymentDetails = (paymentMethod: string, paymentDetails: any): boolean => {
    try {
      if (paymentMethod === 'upi' || paymentMethod === 'gpay') {
        upiDetailsSchema.parse(paymentDetails);
      } else if (paymentMethod === 'bank_transfer') {
        withdrawalDetailsSchema.parse(paymentDetails);
      } else {
        throw new Error('Invalid payment method');
      }
      return true;
    } catch (error) {
      toast({
        title: 'Invalid Payment Details',
        description: 'Please provide valid payment information',
        variant: 'destructive',
      });
      return false;
    }
  };

  const sanitizePaymentDetails = (details: any): any => {
    if (typeof details !== 'object' || details === null) {
      return {};
    }

    const sanitized: any = {};
    
    // Sanitize common fields
    if (details.accountNumber) {
      sanitized.accountNumber = sanitizeInput(details.accountNumber.toString());
    }
    if (details.ifscCode) {
      sanitized.ifscCode = sanitizeInput(details.ifscCode.toString()).toUpperCase();
    }
    if (details.bankName) {
      sanitized.bankName = sanitizeInput(details.bankName.toString());
    }
    if (details.accountHolderName) {
      sanitized.accountHolderName = sanitizeInput(details.accountHolderName.toString());
    }
    if (details.upiId) {
      sanitized.upiId = sanitizeInput(details.upiId.toString()).toLowerCase();
    }
    if (details.name) {
      sanitized.name = sanitizeInput(details.name.toString());
    }

    return sanitized;
  };

  const requestWithdrawal = async (
    amount: number,
    paymentMethod: string,
    paymentDetails: any
  ) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to request a withdrawal',
        variant: 'destructive',
      });
      return { success: false, error: 'Authentication required' };
    }

    setLoading(true);

    try {
      // Validate amount
      if (!validateWithdrawalAmount(amount)) {
        return { success: false, error: 'Invalid amount' };
      }

      // Sanitize and validate payment details
      const sanitizedDetails = sanitizePaymentDetails(paymentDetails);
      if (!validatePaymentDetails(paymentMethod, sanitizedDetails)) {
        return { success: false, error: 'Invalid payment details' };
      }

      // Validate payment method
      const validMethods = ['upi', 'gpay', 'bank_transfer', 'usdt'];
      if (!validMethods.includes(paymentMethod)) {
        toast({
          title: 'Invalid Payment Method',
          description: 'Please select a valid payment method',
          variant: 'destructive',
        });
        return { success: false, error: 'Invalid payment method' };
      }

      // Use the existing RPC function for now
      const { data, error } = await supabase.rpc('rpc_request_withdrawal', {
        amount: amount,
        payment_method: paymentMethod,
        payment_details: sanitizedDetails,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; withdrawal_id?: string };

      if (result.success) {
        toast({
          title: 'Withdrawal Requested',
          description: 'Your withdrawal request has been submitted successfully',
        });
        return { success: true, data: result };
      } else {
        toast({
          title: 'Withdrawal Failed',
          description: result.error || 'Failed to request withdrawal',
          variant: 'destructive',
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to request withdrawal';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    requestWithdrawal,
  };
};
