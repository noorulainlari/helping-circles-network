
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WalletSection from "@/components/dashboard/WalletSection";
import ReferralSection from "@/components/dashboard/ReferralSection";
import WithdrawalSection from "@/components/dashboard/WithdrawalSection";
import PackageActivation from "@/components/dashboard/PackageActivation";
import WithdrawalForm from "@/components/dashboard/WithdrawalForm";
import WalletHistory from "@/components/dashboard/WalletHistory";
import ROITracker from "@/components/dashboard/ROITracker";
import { useProfile } from "@/hooks/useProfile";
import { useWallet } from "@/hooks/useWallet";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { RefreshCw, LogOut, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, loading: profileLoading, refetch } = useProfile();
  const { balance } = useWallet();

  console.log('Dashboard render state:', {
    authLoading,
    profileLoading,
    userId: user?.id,
    profile: profile?.id,
    hasProfile: !!profile
  });

  // Show loading while auth or profile is loading
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-blue-600 text-2xl w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Required</h2>
            <p className="text-gray-600 mb-4">
              Please log in to access your dashboard.
            </p>
          </div>
          <Button 
            onClick={() => window.location.href = '/'} 
            className="w-full"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // Show profile not found message if no profile
  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-orange-600 text-2xl w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile Setup Required</h2>
            <p className="text-gray-600 mb-4">
              Your profile could not be loaded. This might be because your account is still being set up or there was an error.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              User ID: {user.id}
            </p>
          </div>
          <div className="space-y-2">
            <Button 
              onClick={refetch}
              className="w-full flex items-center justify-center gap-2"
              disabled={profileLoading}
            >
              <RefreshCw className={`w-4 h-4 ${profileLoading ? 'animate-spin' : ''}`} />
              Refresh Profile
            </Button>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="w-full flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard with profile data
  const userData = {
    name: profile.full_name || 'User',
    userId: profile.referral_code || 'N/A',
    email: profile.email || 'No email',
    status: profile.status || 'inactive',
    walletBalance: profile.wallet_balance || 0,
    totalROI: profile.total_roi_earned || 0,
    totalReferralIncome: profile.total_referral_earned || 0,
    totalWithdrawn: profile.total_withdrawn || 0,
    currentPackage: profile.package_id ? 'Active Package' : null,
    joinDate: profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A',
  };

  console.log('Rendering dashboard with userData:', userData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DashboardHeader user={userData} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Wallet & Package */}
          <div className="lg:col-span-2 space-y-6">
            <WalletSection user={userData} />
            
            {userData.status === 'inactive' ? (
              <PackageActivation />
            ) : (
              <ROITracker />
            )}
            
            <WalletHistory />
          </div>

          {/* Right Column - Actions & Info */}
          <div className="space-y-6">
            <ReferralSection userId={userData.userId} />
            
            {userData.status === 'active' && (
              <>
                <WithdrawalForm walletBalance={balance} />
                <WithdrawalSection user={userData} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
