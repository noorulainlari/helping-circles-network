
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Eye, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WithdrawalManagement = () => {
  const { toast } = useToast();
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");

  // Mock data - replace with real API calls
  const [withdrawals, setWithdrawals] = useState([
    {
      id: "1",
      user: { name: "John Doe", email: "john@example.com", id: "AB1234" },
      amount: 5000,
      method: "bank_transfer",
      details: { account: "****1234", bank: "State Bank" },
      status: "pending",
      requestedAt: "2024-01-20 10:30 AM",
      proofUrl: "/proof1.jpg"
    },
    {
      id: "2", 
      user: { name: "Jane Smith", email: "jane@example.com", id: "CD5678" },
      amount: 2500,
      method: "upi",
      details: { upi: "jane@paytm" },
      status: "pending",
      requestedAt: "2024-01-20 09:15 AM",
      proofUrl: null
    }
  ]);

  const handleApprove = (withdrawalId: string) => {
    setWithdrawals(prev => 
      prev.map(w => w.id === withdrawalId ? { ...w, status: "completed" } : w)
    );
    toast({
      title: "Withdrawal Approved",
      description: "The withdrawal has been approved and processed.",
    });
  };

  const handleReject = (withdrawalId: string) => {
    setWithdrawals(prev => 
      prev.map(w => w.id === withdrawalId ? { ...w, status: "rejected" } : w)
    );
    toast({
      title: "Withdrawal Rejected",
      description: "The withdrawal has been rejected and funds returned.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
          Withdrawal Management
        </CardTitle>
        <CardDescription>Review and process user withdrawal requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Details</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{withdrawal.user.name}</div>
                      <div className="text-sm text-gray-600">{withdrawal.user.email}</div>
                      <div className="text-xs text-gray-500">ID: {withdrawal.user.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">₹{withdrawal.amount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant="outline">{withdrawal.method.replace('_', ' ').toUpperCase()}</Badge>
                      <div className="text-xs mt-1">
                        {withdrawal.method === 'bank_transfer' && 
                          `${withdrawal.details.bank} - ${withdrawal.details.account}`}
                        {withdrawal.method === 'upi' && withdrawal.details.upi}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                  <TableCell>
                    <span className="text-sm">{withdrawal.requestedAt}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedWithdrawal(withdrawal)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Withdrawal Details</DialogTitle>
                          </DialogHeader>
                          {selectedWithdrawal && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold">User Information</h4>
                                <p>{selectedWithdrawal.user.name}</p>
                                <p className="text-sm text-gray-600">{selectedWithdrawal.user.email}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Amount</h4>
                                <p className="text-lg">₹{selectedWithdrawal.amount.toLocaleString()}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Payment Method</h4>
                                <p>{selectedWithdrawal.method.replace('_', ' ').toUpperCase()}</p>
                              </div>
                              {selectedWithdrawal.proofUrl && (
                                <div>
                                  <h4 className="font-semibold">Payment Proof</h4>
                                  <img 
                                    src={selectedWithdrawal.proofUrl} 
                                    alt="Payment proof" 
                                    className="w-full h-32 object-cover border rounded"
                                  />
                                </div>
                              )}
                              <div>
                                <h4 className="font-semibold">Admin Notes</h4>
                                <Textarea
                                  placeholder="Add notes..."
                                  value={adminNotes}
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                />
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  onClick={() => handleApprove(selectedWithdrawal.id)}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                                <Button 
                                  onClick={() => handleReject(selectedWithdrawal.id)}
                                  variant="destructive"
                                  className="flex-1"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {withdrawal.status === "pending" && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleApprove(withdrawal.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(withdrawal.id)}
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WithdrawalManagement;
