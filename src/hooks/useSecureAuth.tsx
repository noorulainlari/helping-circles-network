
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSecureAuth = () => {
  const { user, role } = useAuth();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const { toast } = useToast();

  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  useEffect(() => {
    // Check if account is locked
    const lockoutEnd = localStorage.getItem('lockoutEnd');
    if (lockoutEnd && Date.now() < parseInt(lockoutEnd)) {
      setIsLocked(true);
    } else {
      localStorage.removeItem('lockoutEnd');
      setIsLocked(false);
    }
  }, []);

  const logSecurityEvent = async (action: string, details: any = {}) => {
    try {
      await supabase.from('security_audit_log').insert({
        user_id: user?.id,
        action,
        details,
        ip_address: await getClientIP(),
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  const handleFailedLogin = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);

    if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockoutEnd = Date.now() + LOCKOUT_DURATION;
      localStorage.setItem('lockoutEnd', lockoutEnd.toString());
      setIsLocked(true);
      
      toast({
        title: "Account Locked",
        description: `Too many failed login attempts. Account locked for 15 minutes.`,
        variant: "destructive"
      });

      logSecurityEvent('account_locked', { attempts: newAttempts });
    } else {
      toast({
        title: "Login Failed",
        description: `${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining before lockout.`,
        variant: "destructive"
      });
    }
  };

  const resetLoginAttempts = () => {
    setLoginAttempts(0);
    localStorage.removeItem('lockoutEnd');
    setIsLocked(false);
  };

  const isAdmin = () => {
    return role === 'admin';
  };

  const requireAdmin = () => {
    if (!isAdmin()) {
      toast({
        title: "Access Denied",
        description: "Administrator privileges required",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return {
    isLocked,
    loginAttempts,
    handleFailedLogin,
    resetLoginAttempts,
    logSecurityEvent,
    isAdmin,
    requireAdmin,
  };
};
