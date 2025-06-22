
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Copy, Share2, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ReferralSectionProps {
  userId: string;
}

const ReferralSection = ({ userId }: ReferralSectionProps) => {
  const { toast } = useToast();
  const referralLink = `https://p2phelp.com/ref/${userId}`;
  const [referralStats] = useState({
    level1: 5,
    level2: 2,
    level3: 1,
    totalEarnings: 2500,
  });

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join P2P Help System",
        text: "Join this amazing P2P helping platform and start earning!",
        url: referralLink,
      });
    } else {
      copyReferralLink();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-500" />
          Referral System
        </CardTitle>
        <CardDescription>Invite friends and earn commission</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Referral Link */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Referral Link</label>
          <div className="flex space-x-2">
            <Input
              value={referralLink}
              readOnly
              className="text-xs"
            />
            <Button size="sm" variant="outline" onClick={copyReferralLink}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Share Button */}
        <Button 
          onClick={shareReferralLink}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Referral Link
        </Button>

        {/* Referral Stats */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Referral Statistics</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Level 1 (5%)</span>
              </div>
              <span className="font-semibold text-blue-600">{referralStats.level1}</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-green-500" />
                <span className="text-sm">Level 2 (3%)</span>
              </div>
              <span className="font-semibold text-green-600">{referralStats.level2}</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Level 3 (1%)</span>
              </div>
              <span className="font-semibold text-purple-600">{referralStats.level3}</span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Earnings</span>
              <span className="text-lg font-bold text-green-600">₹{referralStats.totalEarnings.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSection;
