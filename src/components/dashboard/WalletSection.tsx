
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";
import { useState } from "react";

interface User {
  walletBalance: number;
  totalWithdrawn: number;
  currentPackage: string | null;
}

interface WalletSectionProps {
  user: User;
}

const WalletSection = ({ user }: WalletSectionProps) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="w-6 h-6" />
            <CardTitle className="text-xl">Wallet Balance</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalance(!showBalance)}
            className="text-white hover:bg-white/20"
          >
            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-3xl font-bold">
              {showBalance ? `₹${user.walletBalance.toLocaleString()}` : "₹****"}
            </div>
            <p className="text-blue-100 text-sm">Available Balance</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div>
              <div className="text-lg font-semibold">
                ₹{user.totalWithdrawn.toLocaleString()}
              </div>
              <p className="text-blue-100 text-xs">Total Withdrawn</p>
            </div>
            <div>
              <div className="text-lg font-semibold">
                {user.currentPackage || "No Package"}
              </div>
              <p className="text-blue-100 text-xs">Current Package</p>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button variant="secondary" size="sm" className="flex-1">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              Withdraw
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              <Plus className="w-4 h-4 mr-1" />
              Add Money
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletSection;
