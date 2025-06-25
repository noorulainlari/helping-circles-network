
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Save, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSystemSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    minWithdrawal: "500",
    maxWithdrawal: "50000",
    level1Commission: "5",
    level2Commission: "3", 
    level3Commission: "1",
    autoApproveWithdrawals: false,
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Updated",
      description: "System settings have been saved successfully",
    });
  };

  const handleResetSettings = () => {
    setSettings({
      minWithdrawal: "500",
      maxWithdrawal: "50000",
      level1Commission: "5",
      level2Commission: "3",
      level3Commission: "1",
      autoApproveWithdrawals: false,
      maintenanceMode: false,
      emailNotifications: true,
      smsNotifications: false
    });
    toast({
      title: "Settings Reset",
      description: "Settings have been reset to default values",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-gray-600">Configure platform parameters and features</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Withdrawal Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Withdrawal Limits
            </CardTitle>
            <CardDescription>Configure minimum and maximum withdrawal amounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="minWithdrawal">Minimum Withdrawal (₹)</Label>
              <Input
                id="minWithdrawal"
                type="number"
                value={settings.minWithdrawal}
                onChange={(e) => setSettings(prev => ({...prev, minWithdrawal: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxWithdrawal">Maximum Withdrawal (₹)</Label>
              <Input
                id="maxWithdrawal"
                type="number"
                value={settings.maxWithdrawal}
                onChange={(e) => setSettings(prev => ({...prev, maxWithdrawal: e.target.value}))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Commission Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Commissions</CardTitle>
            <CardDescription>Set commission rates for different levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="level1">Level 1 Commission (%)</Label>
              <Input
                id="level1"
                type="number"
                value={settings.level1Commission}
                onChange={(e) => setSettings(prev => ({...prev, level1Commission: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level2">Level 2 Commission (%)</Label>
              <Input
                id="level2"
                type="number"
                value={settings.level2Commission}
                onChange={(e) => setSettings(prev => ({...prev, level2Commission: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level3">Level 3 Commission (%)</Label>
              <Input
                id="level3"
                type="number"
                value={settings.level3Commission}
                onChange={(e) => setSettings(prev => ({...prev, level3Commission: e.target.value}))}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Controls */}
        <Card>
          <CardHeader>
            <CardTitle>System Controls</CardTitle>
            <CardDescription>Platform operation settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-approve Withdrawals</Label>
                <p className="text-sm text-gray-500">Automatically approve small withdrawals</p>
              </div>
              <Switch
                checked={settings.autoApproveWithdrawals}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, autoApproveWithdrawals: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Disable user access for maintenance</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, maintenanceMode: checked}))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Send email alerts for important events</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, emailNotifications: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">Send SMS alerts for critical events</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, smsNotifications: checked}))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button onClick={handleSaveSettings} className="flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline" onClick={handleResetSettings} className="flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default AdminSystemSettings;
