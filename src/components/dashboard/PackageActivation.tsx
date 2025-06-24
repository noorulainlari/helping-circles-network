
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Crown, Package, Upload, AlertCircle } from "lucide-react";
import { usePackages } from "@/hooks/usePackages";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

const PackageActivation = () => {
  const { packages, loading } = usePackages();
  const { profile } = useProfile();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setPaymentSlip(file);
    }
  };

  const handleSubmitPayment = async () => {
    if (!selectedPackage || !paymentSlip) {
      toast({
        title: "Missing Information",
        description: "Please select a package and upload payment slip",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    // Simulate API call to submit payment for verification
    try {
      // In real app, upload file and submit payment details
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Submitted",
        description: "Your payment has been submitted for verification. You will be notified once approved.",
      });
      
      // Reset form
      setSelectedPackage(null);
      setPaymentSlip(null);
      setPaymentDetails("");
      setReferralCode("");
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
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

  if (profile?.status === 'pending_payment') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
            Payment Under Review
          </CardTitle>
          <CardDescription>Your payment is being verified by our team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <Badge className="bg-orange-100 text-orange-800 mb-2">Pending Verification</Badge>
            <p className="text-gray-600">
              We are reviewing your payment. You will be notified once verified and your account will be activated.
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
        <CardDescription>Choose a package and submit payment for verification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

        {/* Package Selection */}
        <div className="space-y-3">
          <Label>Select Package</Label>
          {loading ? (
            <div className="text-center py-4">Loading packages...</div>
          ) : packages.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No packages available
            </div>
          ) : (
            packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`border-l-4 border-l-blue-500 cursor-pointer transition-all ${
                  selectedPackage === pkg.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
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
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="package"
                        checked={selectedPackage === pkg.id}
                        onChange={() => setSelectedPackage(pkg.id)}
                        className="w-4 h-4 text-blue-600"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Payment Instructions */}
        {selectedPackage && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Payment Instructions</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <p><strong>Bank Details:</strong></p>
                <p>Account Name: Helping Circles</p>
                <p>Account Number: 1234567890</p>
                <p>IFSC Code: SBIN0001234</p>
                <p>Bank: State Bank of India</p>
                <p className="mt-2 font-semibold">OR pay via UPI: helpingcircles@paytm</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Slip Upload */}
        {selectedPackage && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paymentSlip">Upload Payment Slip/Screenshot *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="paymentSlip"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="paymentSlip" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to upload payment slip or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports: JPG, PNG, PDF (Max 5MB)
                  </p>
                </label>
              </div>
              {paymentSlip && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Upload className="w-4 h-4" />
                  <span>{paymentSlip.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDetails">Payment Details (Optional)</Label>
              <Textarea
                id="paymentDetails"
                placeholder="Add any additional payment details, transaction ID, etc."
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
              />
            </div>

            <Button
              onClick={handleSubmitPayment}
              disabled={!selectedPackage || !paymentSlip || submitting}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {submitting ? (
                <>
                  <Upload className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Submit for Verification
                </>
              )}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-semibold">Important:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Make payment to the above account details</li>
                    <li>Upload clear screenshot/photo of payment confirmation</li>
                    <li>Your account will be activated after payment verification</li>
                    <li>Verification usually takes 2-24 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PackageActivation;
