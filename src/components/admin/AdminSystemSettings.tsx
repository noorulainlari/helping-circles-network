
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, AlertCircle, DollarSign, Users, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSystemSettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Helping Circles",
    siteDescription: "P2P Help Network",
    supportEmail: "support@helpingcircles.com",
    maintenanceMode: false,
    
    // Payment Settings
    minWithdrawal: 100,
    maxWithdrawal: 50000,
    withdrawalFee: 0,
    autoApprovalLimit: 1000,
    
    // Referral Settings
    level1Commission: 10,
    level2Commission: 5,
    level3Commission: 2,
    referralBonusEnabled: true,
    
    // ROI Settings
    dailyROIEnabled: true,
    autoDistribution: true,
    roiCalculationTime: "09:00",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    adminAlerts: true,
    userWelcomeEmail: true,
  });

  const handleSave = async (section: string) => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-gray-600" />
            System Settings
          </CardTitle>
          <CardDescription>Configure your platform settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
              <TabsTrigger value="roi">ROI</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">General Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => handleSettingChange('siteName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                    />
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  </div>
                  
                  <Button onClick={() => handleSave('General')} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save General Settings'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Settings */}
            <TabsContent value="payments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Payment Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minWithdrawal">Minimum Withdrawal (₹)</Label>
                      <Input
                        id="minWithdrawal"
                        type="number"
                        value={settings.minWithdrawal}
                        onChange={(e) => handleSettingChange('minWithdrawal', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxWithdrawal">Maximum Withdrawal (₹)</Label>
                      <Input
                        id="maxWithdrawal"
                        type="number"
                        value={settings.maxWithdrawal}
                        onChange={(e) => handleSettingChange('maxWithdrawal', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="withdrawalFee">Withdrawal Fee (₹)</Label>
                      <Input
                        id="withdrawalFee"
                        type="number"
                        value={settings.withdrawalFee}
                        onChange={(e) => handleSettingChange('withdrawalFee', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="autoApprovalLimit">Auto Approval Limit (₹)</Label>
                      <Input
                        id="autoApprovalLimit"
                        type="number"
                        value={settings.autoApprovalLimit}
                        onChange={(e) => handleSettingChange('autoApprovalLimit', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={() => handleSave('Payment')} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Payment Settings'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Referral Settings */}
            <TabsContent value="referrals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Referral Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="level1Commission">Level 1 Commission (%)</Label>
                      <Input
                        id="level1Commission"
                        type="number"
                        value={settings.level1Commission}
                        onChange={(e) => handleSettingChange('level1Commission', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level2Commission">Level 2 Commission (%)</Label>
                      <Input
                        id="level2Commission"
                        type="number"
                        value={settings.level2Commission}
                        onChange={(e) => handleSettingChange('level2Commission', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level3Commission">Level 3 Commission (%)</Label>
                      <Input
                        id="level3Commission"
                        type="number"
                        value={settings.level3Commission}
                        onChange={(e) => handleSettingChange('level3Commission', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="referralBonusEnabled"
                      checked={settings.referralBonusEnabled}
                      onCheckedChange={(checked) => handleSettingChange('referralBonusEnabled', checked)}
                    />
                    <Label htmlFor="referralBonusEnabled">Enable Referral Bonuses</Label>
                  </div>
                  
                  <Button onClick={() => handleSave('Referral')} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Referral Settings'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ROI Settings */}
            <TabsContent value="roi" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ROI Distribution Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="dailyROIEnabled"
                      checked={settings.dailyROIEnabled}
                      onCheckedChange={(checked) => handleSettingChange('dailyROIEnabled', checked)}
                    />
                    <Label htmlFor="dailyROIEnabled">Enable Daily ROI Distribution</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoDistribution"
                      checked={settings.autoDistribution}
                      onCheckedChange={(checked) => handleSettingChange('autoDistribution', checked)}
                    />
                    <Label htmlFor="autoDistribution">Automatic Distribution</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="roiCalculationTime">ROI Calculation Time</Label>
                    <Input
                      id="roiCalculationTime"
                      type="time"
                      value={settings.roiCalculationTime}
                      onChange={(e) => handleSettingChange('roiCalculationTime', e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={() => handleSave('ROI')} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save ROI Settings'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="smsNotifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                      />
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="adminAlerts"
                        checked={settings.adminAlerts}
                        onCheckedChange={(checked) => handleSettingChange('adminAlerts', checked)}
                      />
                      <Label htmlFor="adminAlerts">Admin Alerts</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="userWelcomeEmail"
                        checked={settings.userWelcomeEmail}
                        onCheckedChange={(checked) => handleSettingChange('userWelcomeEmail', checked)}
                      />
                      <Label htmlFor="userWelcomeEmail">User Welcome Email</Label>
                    </div>
                  </div>
                  
                  <Button onClick={() => handleSave('Notification')} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Notification Settings'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemSettings;
