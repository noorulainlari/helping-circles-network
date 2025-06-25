
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleAddMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Add Money Request",
      description: `Request to add ₹${amount} has been submitted`,
    });
    setAmount("");
    setAddMoneyOpen(false);
  };

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(amount) > user.walletBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Withdrawal Request",
      description: `Withdrawal request for ₹${amount} has been submitted`,
    });
    setAmount("");
    setWithdrawOpen(false);
  };

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
            <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="flex-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Money</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawAmount">Amount (₹)</Label>
                    <Input
                      id="withdrawAmount"
                      type="number"
                      placeholder="Enter amount to withdraw"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Available Balance: ₹{user.walletBalance.toLocaleString()}
                  </p>
                  <Button onClick={handleWithdraw} className="w-full">
                    Submit Withdrawal Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={addMoneyOpen} onOpenChange={setAddMoneyOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="flex-1">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Money
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Money</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addAmount">Amount (₹)</Label>
                    <Input
                      id="addAmount"
                      type="number"
                      placeholder="Enter amount to add"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Minimum amount: ₹100
                  </p>
                  <Button onClick={handleAddMoney} className="w-full">
                    Submit Add Money Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletSection;
