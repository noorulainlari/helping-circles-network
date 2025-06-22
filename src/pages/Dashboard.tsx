
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, Users, Download, Bell, Settings, Package } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WalletSection from "@/components/dashboard/WalletSection";
import ReferralSection from "@/components/dashboard/ReferralSection";
import WithdrawalSection from "@/components/dashboard/WithdrawalSection";

const Dashboard = () => {
  const { profile, loading } = useProfile();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Profile not found</p>
        </div>
      </div>
    );
  }

  const userForHeader = {
    name: profile.full_name,
    userId: profile.referral_code,
    email: profile.email,
    status: profile.status || 'inactive',
    walletBalance: Number(profile.wallet_balance) || 0,
    totalROI: Number(profile.total_roi_earned) || 0,
    totalReferralIncome: Number(profile.total_referral_earned) || 0,
    totalWithdrawn: Number(profile.total_withdrawn) || 0,
    currentPackage: profile.package_id,
    joinDate: new Date(profile.created_at).toLocaleDateString(),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DashboardHeader user={userForHeader} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Status Alert */}
        {profile.status === "inactive" && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <div>
                    <h3 className="font-semibold text-orange-800">Account Activation Required</h3>
                    <p className="text-sm text-orange-700">Please purchase a package to activate your account and start earning.</p>
                  </div>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Package className="w-4 h-4 mr-2" />
                  Activate Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Wallet & Stats */}
          <div className="lg:col-span-2 space-y-6">
            <WalletSection user={userForHeader} />
            
            {/* ROI & Referral Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Total ROI Received
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₹{userForHeader.totalROI.toLocaleString()}</div>
                  <p className="text-sm text-gray-600 mt-1">Return on Investment</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    Referral Income
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">₹{userForHeader.totalReferralIncome.toLocaleString()}</div>
                  <p className="text-sm text-gray-600 mt-1">Multi-level earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Withdrawal Section */}
            <WithdrawalSection user={userForHeader} />
          </div>

          {/* Right Column - Referral & Quick Actions */}
          <div className="space-y-6">
            <ReferralSection userId={userForHeader.userId} />
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">User ID:</span>
                  <Badge variant="secondary">{userForHeader.userId}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Joined:</span>
                  <span className="text-sm font-medium">{userForHeader.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant={userForHeader.status === "active" ? "default" : "destructive"}>
                    {userForHeader.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
