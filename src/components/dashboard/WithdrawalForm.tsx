
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownLeft } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

interface WithdrawalFormProps {
  walletBalance: number;
}

const WithdrawalForm = ({ walletBalance }: WithdrawalFormProps) => {
  const { requestWithdrawal } = useWallet();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: "",
    accountHolder: "",
    upiId: "",
    bankName: "",
    ifscCode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !paymentMethod) {
      return;
    }

    const withdrawalAmount = parseFloat(amount);
    if (withdrawalAmount > walletBalance) {
      return;
    }

    setLoading(true);
    try {
      let details = {};
      
      if (paymentMethod === 'upi' || paymentMethod === 'gpay') {
        details = { upi_id: paymentDetails.upiId };
      } else if (paymentMethod === 'bank_transfer') {
        details = {
          account_number: paymentDetails.accountNumber,
          account_holder: paymentDetails.accountHolder,
          bank_name: paymentDetails.bankName,
          ifsc_code: paymentDetails.ifscCode,
        };
      }

      const result = await requestWithdrawal(withdrawalAmount, paymentMethod, details);
      
      if (result.success) {
        // Reset form
        setAmount("");
        setPaymentMethod("");
        setPaymentDetails({
          accountNumber: "",
          accountHolder: "",
          upiId: "",
          bankName: "",
          ifscCode: "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowDownLeft className="w-5 h-5 mr-2 text-green-500" />
          Request Withdrawal
        </CardTitle>
        <CardDescription>
          Available Balance: ₹{walletBalance.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={walletBalance}
              min="500"
              required
            />
            <p className="text-xs text-gray-500">Minimum withdrawal: ₹500</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="gpay">Google Pay</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(paymentMethod === 'upi' || paymentMethod === 'gpay') && (
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="Enter UPI ID"
                value={paymentDetails.upiId}
                onChange={(e) => setPaymentDetails(prev => ({
                  ...prev,
                  upiId: e.target.value
                }))}
                required
              />
            </div>
          )}

          {paymentMethod === 'bank_transfer' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Account number"
                    value={paymentDetails.accountNumber}
                    onChange={(e) => setPaymentDetails(prev => ({
                      ...prev,
                      accountNumber: e.target.value
                    }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    placeholder="IFSC code"
                    value={paymentDetails.ifscCode}
                    onChange={(e) => setPaymentDetails(prev => ({
                      ...prev,
                      ifscCode: e.target.value
                    }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountHolder">Account Holder Name</Label>
                <Input
                  id="accountHolder"
                  placeholder="Account holder name"
                  value={paymentDetails.accountHolder}
                  onChange={(e) => setPaymentDetails(prev => ({
                    ...prev,
                    accountHolder: e.target.value
                  }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  placeholder="Bank name"
                  value={paymentDetails.bankName}
                  onChange={(e) => setPaymentDetails(prev => ({
                    ...prev,
                    bankName: e.target.value
                  }))}
                  required
                />
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading || !amount || !paymentMethod}
          >
            {loading ? 'Processing...' : 'Request Withdrawal'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WithdrawalForm;
