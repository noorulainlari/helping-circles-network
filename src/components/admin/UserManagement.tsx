
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Filter, UserPlus, Edit, Trash2, CheckCircle, XCircle, Eye, Upload, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const [users, setUsers] = useState([
    {
      id: "AB1234",
      name: "John Doe",
      email: "john@example.com",
      mobile: "+91 9876543210",
      status: "active",
      package: "₹1000",
      walletBalance: 2500,
      referrer: "CD5678",
      joinDate: "2024-01-15",
      paymentStatus: "verified",
      paymentSlip: "/payment-slip-1.jpg"
    },
    {
      id: "CD5678",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "+91 8765432109",
      status: "pending_payment",
      package: "₹1500",
      walletBalance: 0,
      referrer: "None",
      joinDate: "2024-01-20",
      paymentStatus: "pending_verification",
      paymentSlip: "/payment-slip-2.jpg"
    },
    {
      id: "EF9012",
      name: "Mike Johnson",
      email: "mike@example.com",
      mobile: "+91 7654321098",
      status: "active",
      package: "₹1500",
      walletBalance: 3200,
      referrer: "AB1234",
      joinDate: "2024-01-18",
      paymentStatus: "verified",
      paymentSlip: "/payment-slip-3.jpg"
    },
    {
      id: "GH3456",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      mobile: "+91 6543210987",
      status: "pending_payment",
      package: "₹2500",
      walletBalance: 0,
      referrer: "AB1234",
      joinDate: "2024-01-22",
      paymentStatus: "pending_verification",
      paymentSlip: "/payment-slip-4.jpg"
    },
  ]);

  const handleActivateUser = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: "active", paymentStatus: "verified" }
          : user
      )
    );
    toast({
      title: "User Activated",
      description: "User has been activated successfully after payment verification.",
    });
  };

  const handleRejectPayment = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: "inactive", paymentStatus: "rejected" }
          : user
      )
    );
    toast({
      title: "Payment Rejected",
      description: "Payment has been rejected. User needs to resubmit payment.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending_payment":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Payment</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case "pending_verification":
        return <Badge className="bg-yellow-100 text-yellow-800"><Upload className="w-3 h-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage all platform users and verify payments</CardDescription>
          </div>
          <Button className="mt-4 md:mt-0">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Users Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-xs text-gray-500">ID: {user.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.package}</Badge>
                  </TableCell>
                  <TableCell>{getPaymentStatusBadge(user.paymentStatus)}</TableCell>
                  <TableCell>
                    <span className="font-medium">₹{user.walletBalance.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    {user.referrer !== "None" ? (
                      <Badge variant="secondary">{user.referrer}</Badge>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {/* View/Edit User Details */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>User Details & Payment Verification</DialogTitle>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="space-y-6">
                              {/* User Information */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Personal Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><strong>Name:</strong> {selectedUser.name}</p>
                                    <p><strong>Email:</strong> {selectedUser.email}</p>
                                    <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
                                    <p><strong>User ID:</strong> {selectedUser.id}</p>
                                    <p><strong>Join Date:</strong> {selectedUser.joinDate}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Account Status</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm">Status:</span>
                                      {getStatusBadge(selectedUser.status)}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm">Payment:</span>
                                      {getPaymentStatusBadge(selectedUser.paymentStatus)}
                                    </div>
                                    <p className="text-sm"><strong>Package:</strong> {selectedUser.package}</p>
                                    <p className="text-sm"><strong>Wallet Balance:</strong> ₹{selectedUser.walletBalance.toLocaleString()}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Payment Slip Verification */}
                              {selectedUser.paymentSlip && (
                                <div>
                                  <h4 className="font-semibold mb-2 flex items-center">
                                    <DollarSign className="w-4 h-4 mr-1" />
                                    Payment Verification
                                  </h4>
                                  <div className="border rounded-lg p-4 bg-gray-50">
                                    <div className="mb-3">
                                      <Label>Payment Slip</Label>
                                      <div className="mt-2">
                                        <img 
                                          src={selectedUser.paymentSlip} 
                                          alt="Payment slip" 
                                          className="w-full max-w-md h-48 object-cover border rounded cursor-pointer hover:opacity-80"
                                          onClick={() => window.open(selectedUser.paymentSlip, '_blank')}
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Click to view full size</p>
                                      </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                      <Label htmlFor="verificationNotes">Verification Notes</Label>
                                      <Textarea
                                        id="verificationNotes"
                                        placeholder="Add notes about payment verification..."
                                        className="mt-1"
                                      />
                                    </div>

                                    {selectedUser.paymentStatus === "pending_verification" && (
                                      <div className="flex space-x-2">
                                        <Button 
                                          onClick={() => handleActivateUser(selectedUser.id)}
                                          className="bg-green-600 hover:bg-green-700 text-white flex-1"
                                        >
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          Verify & Activate
                                        </Button>
                                        <Button 
                                          onClick={() => handleRejectPayment(selectedUser.id)}
                                          variant="destructive"
                                          className="flex-1"
                                        >
                                          <XCircle className="w-4 h-4 mr-2" />
                                          Reject Payment
                                        </Button>
                                      </div>
                                    )}

                                    {selectedUser.paymentStatus === "verified" && (
                                      <div className="p-3 bg-green-50 border border-green-200 rounded flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                        <span className="text-green-700 font-medium">Payment Verified & User Activated</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {/* Quick Actions for Pending Payments */}
                      {user.paymentStatus === "pending_verification" && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleActivateUser(user.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectPayment(user.id)}
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </>
                      )}

                      {/* Edit Button */}
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-sm text-blue-600">Total Users</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.status === "active").length}
            </div>
            <div className="text-sm text-green-600">Active Users</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {users.filter(u => u.paymentStatus === "pending_verification").length}
            </div>
            <div className="text-sm text-yellow-600">Pending Verification</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              ₹{users.reduce((sum, u) => sum + u.walletBalance, 0).toLocaleString()}
            </div>
            <div className="text-sm text-purple-600">Total Wallet Balance</div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">Showing {filteredUsers.length} of {users.length} users</p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
