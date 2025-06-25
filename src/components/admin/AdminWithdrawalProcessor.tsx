
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminWithdrawalProcessor = () => {
  const { toast } = useToast();
  const [processingWithdrawals, setProcessingWithdrawals] = useState([
    {
      id: "W001",
      userId: "AB1234",
      userName: "John Doe",
      amount: 1000,
      method: "UPI",
      details: "john@okhdfcbank",
      requestDate: "2024-01-20",
      processorId: null,
      status: "pending"
    },
    {
      id: "W002",
      userId: "EF9012", 
      userName: "Mike Johnson",
      amount: 500,
      method: "Bank Transfer",
      details: "HDFC Bank - 123456789",
      requestDate: "2024-01-18",
      processorId: "PROC001",
      status: "assigned"
    }
  ]);

  const handleAssignToSelf = (withdrawalId: string) => {
    setProcessingWithdrawals(prev =>
      prev.map(w =>
        w.id === withdrawalId
          ? { ...w, processorId: "CURRENT_ADMIN", status: "assigned" }
          : w
      )
    );
    toast({
      title: "Withdrawal Assigned",
      description: `Withdrawal ${withdrawalId} has been assigned to you`,
    });
  };

  const handleProcessWithdrawal = (withdrawalId: string, action: 'complete' | 'reject') => {
    setProcessingWithdrawals(prev =>
      prev.map(w =>
        w.id === withdrawalId
          ? { ...w, status: action === 'complete' ? 'completed' : 'rejected' }
          : w
      )
    );
    
    toast({
      title: action === 'complete' ? "Withdrawal Completed" : "Withdrawal Rejected",
      description: `Withdrawal ${withdrawalId} has been ${action}d`,
      variant: action === 'complete' ? "default" : "destructive"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      case "assigned":
        return <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Withdrawal Processing</h2>
        <p className="text-gray-600">Manage and process withdrawal requests</p>
      </div>

      {/* Processing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Processing</p>
                <p className="text-2xl font-bold">
                  {processingWithdrawals.filter(w => w.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned to Me</p>
                <p className="text-2xl font-bold">
                  {processingWithdrawals.filter(w => w.processorId === 'CURRENT_ADMIN').length}
                </p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Processing Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Queue</CardTitle>
          <CardDescription>Withdrawal requests requiring processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request Details</TableHead>
                  <TableHead>User Info</TableHead>
                  <TableHead>Amount & Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processingWithdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{withdrawal.id}</div>
                        <div className="text-sm text-gray-600">{withdrawal.requestDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{withdrawal.userName}</div>
                        <div className="text-sm text-gray-600">ID: {withdrawal.userId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">₹{withdrawal.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{withdrawal.method}</div>
                        <div className="text-xs text-gray-500">{withdrawal.details}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(withdrawal.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {withdrawal.status === 'pending' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAssignToSelf(withdrawal.id)}
                          >
                            Assign to Me
                          </Button>
                        )}
                        {withdrawal.status === 'assigned' && withdrawal.processorId === 'CURRENT_ADMIN' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => handleProcessWithdrawal(withdrawal.id, 'complete')}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleProcessWithdrawal(withdrawal.id, 'reject')}
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Reject
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
    </div>
  );
};

export default AdminWithdrawalProcessor;
