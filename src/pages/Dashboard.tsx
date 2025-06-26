
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

const Dashboard = () => {
  const { profile, loading: profileLoading } = useProfile();
  const { balance } = useWallet();
  const { user, signOut } = useAuth();

  console.log('Dashboard render - User:', user?.id, 'Profile loading:', profileLoading, 'Profile:', profile);

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to access the dashboard</p>
          <Button onClick={() => window.location.href = '/'}>Go to Login</Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-500 text-2xl">!</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">
              Your profile could not be loaded. This might be a temporary issue or your account may need to be set up.
            </p>
          </div>
          <div className="space-y-2">
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full"
            >
              Refresh Page
            </Button>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="w-full"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const userData = {
    name: profile.full_name,
    userId: profile.referral_code,
    email: profile.email,
    status: profile.status || 'inactive',
    walletBalance: profile.wallet_balance || 0,
    totalROI: profile.total_roi_earned || 0,
    totalReferralIncome: profile.total_referral_earned || 0,
    totalWithdrawn: profile.total_withdrawn || 0,
    currentPackage: profile.package_id ? 'Active Package' : null,
    joinDate: new Date(profile.created_at || '').toLocaleDateString(),
  };

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
