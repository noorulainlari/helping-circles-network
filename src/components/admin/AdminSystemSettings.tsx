
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminSystemSettings = () => {
  const [settings, setSettings] = useState({
    referralLevels: {
      level_1: 5,
      level_2: 3,
      level_3: 1,
    },
    withdrawalLimits: {
      min_amount: 500,
      max_amount: 50000,
    },
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    try {
      // Fetch referral levels
      const { data: referralData } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'referral_levels')
        .single();

      // Fetch withdrawal limits
      const { data: withdrawalData } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'withdrawal_limits')
        .single();

      if (referralData) {
        setSettings(prev => ({
          ...prev,
          referralLevels: referralData.setting_value as any,
        }));
      }

      if (withdrawalData) {
        setSettings(prev => ({
          ...prev,
          withdrawalLimits: withdrawalData.setting_value as any,
        }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      // Save referral levels
      await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'referral_levels',
          setting_value: settings.referralLevels,
          description: 'Referral commission rates for each level',
        });

      // Save withdrawal limits
      await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'withdrawal_limits',
          setting_value: settings.withdrawalLimits,
          description: 'Minimum and maximum withdrawal amounts',
        });

      toast({
        title: 'Settings Saved',
        description: 'System settings have been updated successfully',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReferralChange = (level: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      referralLevels: {
        ...prev.referralLevels,
        [level]: parseFloat(value) || 0,
      },
    }));
  };

  const handleWithdrawalChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      withdrawalLimits: {
        ...prev.withdrawalLimits,
        [field]: parseFloat(value) || 0,
      },
    }));
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          System Settings
        </CardTitle>
        <CardDescription>Configure system-wide settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Referral Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Referral Commission Rates (%)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level1">Level 1 (%)</Label>
              <Input
                id="level1"
                type="number"
                value={settings.referralLevels.level_1}
                onChange={(e) => handleReferralChange('level_1', e.target.value)}
                placeholder="e.g., 5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level2">Level 2 (%)</Label>
              <Input
                id="level2"
                type="number"
                value={settings.referralLevels.level_2}
                onChange={(e) => handleReferralChange('level_2', e.target.value)}
                placeholder="e.g., 3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level3">Level 3 (%)</Label>
              <Input
                id="level3"
                type="number"
                value={settings.referralLevels.level_3}
                onChange={(e) => handleReferralChange('level_3', e.target.value)}
                placeholder="e.g., 1"
              />
            </div>
          </div>
        </div>

        {/* Withdrawal Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Withdrawal Limits</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minAmount">Minimum Amount (₹)</Label>
              <Input
                id="minAmount"
                type="number"
                value={settings.withdrawalLimits.min_amount}
                onChange={(e) => handleWithdrawalChange('min_amount', e.target.value)}
                placeholder="e.g., 500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxAmount">Maximum Amount (₹)</Label>
              <Input
                id="maxAmount"
                type="number"
                value={settings.withdrawalLimits.max_amount}
                onChange={(e) => handleWithdrawalChange('max_amount', e.target.value)}
                placeholder="e.g., 50000"
              />
            </div>
          </div>
        </div>

        <Button onClick={saveSettings} disabled={loading} className="w-full">
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminSystemSettings;
