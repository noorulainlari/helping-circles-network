
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, UserPlus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const users = [
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
    },
    {
      id: "CD5678",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "+91 8765432109",
      status: "inactive",
      package: "Not Activated",
      walletBalance: 0,
      referrer: "None",
      joinDate: "2024-01-20",
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
    },
  ];

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactive</Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage all platform users</CardDescription>
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
                <TableHead>Wallet</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
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
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      {user.status === "inactive" ? (
                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                          <CheckCircle className="w-3 h-3" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <XCircle className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">Showing 1-3 of 1,234 users</p>
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
