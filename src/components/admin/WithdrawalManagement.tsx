
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, CheckCircle, XCircle, Clock, ArrowDownLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WithdrawalManagement = () => {
  const { toast } = useToast();
  const [withdrawals, setWithdrawals] = useState([
    {
      id: "W001",
      userId: "AB1234",
      userName: "John Doe",
      amount: 1000,
      method: "UPI",
      details: "john@okhdfcbank",
      status: "pending",
      requestDate: "2024-01-20",
      assignedTo: "CD5678 (Jane Smith)",
    },
    {
      id: "W002", 
      userId: "EF9012",
      userName: "Mike Johnson",
      amount: 500,
      method: "Bank Transfer",
      details: "HDFC Bank - 123456789",
      status: "completed",
      requestDate: "2024-01-18",
      assignedTo: "GH3456 (Sarah Wilson)",
    },
    {
      id: "W003",
      userId: "CD5678",
      userName: "Jane Smith", 
      amount: 750,
      method: "Google Pay",
      details: "9876543210",
      status: "pending",
      requestDate: "2024-01-21",
      assignedTo: "Waiting for assignment",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const handleApprove = (withdrawalId: string) => {
    setWithdrawals(prev => 
      prev.map(w => 
        w.id === withdrawalId 
          ? { ...w, status: "completed" }
          : w
      )
    );
    toast({
      title: "Withdrawal Approved",
      description: `Withdrawal ${withdrawalId} has been approved successfully`,
    });
  };

  const handleReject = (withdrawalId: string) => {
    setWithdrawals(prev => 
      prev.map(w => 
        w.id === withdrawalId 
          ? { ...w, status: "rejected" }
          : w
      )
    );
    toast({
      title: "Withdrawal Rejected",
      description: `Withdrawal ${withdrawalId} has been rejected`,
      variant: "destructive",
    });
  };

  const pendingWithdrawals = withdrawals.filter(w => w.status === "pending");
  const totalPendingAmount = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="space-y-6">
      {/* Withdrawal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold">{pendingWithdrawals.length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold">₹{totalPendingAmount.toLocaleString()}</p>
              </div>
              <ArrowDownLeft className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Processed</p>
                <p className="text-2xl font-bold">₹8,75,000</p>
              </div>
              <ArrowDownLeft className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Withdrawal Requests</CardTitle>
              <CardDescription>Manage user withdrawal requests and P2P assignments</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by user ID, name, or withdrawal ID..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Withdrawals Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request Details</TableHead>
                  <TableHead>User Info</TableHead>
                  <TableHead>Amount & Method</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal) => (
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
                      <div className="text-sm">
                        {withdrawal.assignedTo.includes("Waiting") ? (
                          <Badge variant="outline" className="text-orange-600">
                            Not Assigned
                          </Badge>
                        ) : (
                          <div>
                            <div className="font-medium text-xs">{withdrawal.assignedTo}</div>
                            <Badge variant="secondary" className="text-xs">Assigned</Badge>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(withdrawal.status)}
                        {getStatusBadge(withdrawal.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {withdrawal.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleApprove(withdrawal.id)}
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleReject(withdrawal.id)}
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">Showing 1-3 of 45 withdrawals</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawalManagement;
