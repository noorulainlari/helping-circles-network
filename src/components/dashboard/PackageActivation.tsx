
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Crown, Package, Upload, Clock } from "lucide-react";
import { usePackages } from "@/hooks/usePackages";
import { useProfile } from "@/hooks/useProfile";

const PackageActivation = () => {
  const { packages, loading, activatePackage } = usePackages();
  const { profile, refetch } = useProfile();
  const [referralCode, setReferralCode] = useState("");
  const [activating, setActivating] = useState<string | null>(null);
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);

  const handleActivatePackage = async (packageId: string) => {
    setActivating(packageId);
    try {
      const result = await activatePackage(packageId, referralCode);
      if (result.success) {
        await refetch(); // Refresh profile data
        setReferralCode("");
      }
    } finally {
      setActivating(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentSlip(file);
    }
  };

  if (profile?.status === 'active') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="w-5 h-5 mr-2 text-yellow-500" />
            Active Package
          </CardTitle>
          <CardDescription>You have an active package</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <Badge className="bg-green-100 text-green-800 mb-2">Active</Badge>
            <p className="text-gray-600">
              Package activated on: {new Date(profile.package_activated_at || '').toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show pending payment status if user has selected a package but payment is pending
  if (profile?.status === 'suspended') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-500" />
            Payment Pending
          </CardTitle>
          <CardDescription>Your payment is being verified</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <Badge className="bg-orange-100 text-orange-800 mb-2">Pending Verification</Badge>
            <p className="text-gray-600">
              Please wait while we verify your payment. This usually takes 24-48 hours.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="w-5 h-5 mr-2 text-blue-500" />
          Activate Package
        </CardTitle>
        <CardDescription>Choose a package to start earning</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Referral Code Input */}
        <div className="space-y-2">
          <Label htmlFor="referralCode">Referral Code (Optional)</Label>
          <Input
            id="referralCode"
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>

        {/* Payment Slip Upload */}
        <div className="space-y-2">
          <Label htmlFor="paymentSlip">Payment Slip Upload</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="paymentSlip"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="flex-1"
            />
            <Upload className="w-4 h-4 text-gray-400" />
          </div>
          {paymentSlip && (
            <p className="text-sm text-green-600">
              File selected: {paymentSlip.name}
            </p>
          )}
        </div>

        {/* Packages */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-4">Loading packages...</div>
          ) : packages.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No packages available
            </div>
          ) : (
            packages.map((pkg) => (
              <Card key={pkg.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{pkg.name}</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{pkg.amount.toLocaleString()}
                      </p>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>ROI: {pkg.roi_percentage}% for {pkg.roi_days} days</p>
                        <p>Referral Bonus: ₹{pkg.referral_bonus}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleActivatePackage(pkg.id)}
                      disabled={activating === pkg.id || !paymentSlip}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {activating === pkg.id ? 'Submitting...' : 'Submit for Verification'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">Payment Instructions:</h4>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Select your desired package</li>
            <li>2. Upload your payment slip/receipt</li>
            <li>3. Click "Submit for Verification"</li>
            <li>4. Wait for admin approval (24-48 hours)</li>
            <li>5. Your account will be activated upon verification</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageActivation;
