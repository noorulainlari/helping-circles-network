
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Edit, Trash2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PackageManagement = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Starter Package",
      amount: 1000,
      level1Commission: 5,
      level2Commission: 3,
      level3Commission: 1,
      activeUsers: 567,
      status: "active",
    },
    {
      id: 2,
      name: "Growth Package", 
      amount: 1500,
      level1Commission: 5,
      level2Commission: 3,
      level3Commission: 1,
      activeUsers: 234,
      status: "active",
    },
    {
      id: 3,
      name: "Premium Package",
      amount: 2500,
      level1Commission: 6,
      level2Commission: 4,
      level3Commission: 2,
      activeUsers: 123,
      status: "active",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: "",
    amount: "",
    level1Commission: "5",
    level2Commission: "3", 
    level3Commission: "1",
  });

  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const packageData = {
      id: packages.length + 1,
      name: newPackage.name,
      amount: parseInt(newPackage.amount),
      level1Commission: parseInt(newPackage.level1Commission),
      level2Commission: parseInt(newPackage.level2Commission),
      level3Commission: parseInt(newPackage.level3Commission),
      activeUsers: 0,
      status: "active",
    };

    setPackages([...packages, packageData]);
    setNewPackage({
      name: "",
      amount: "",
      level1Commission: "5",
      level2Commission: "3",
      level3Commission: "1",
    });
    setShowAddForm(false);

    toast({
      title: "Success",
      description: "Package created successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Package Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Packages</p>
                <p className="text-2xl font-bold">{packages.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Active Users</p>
                <p className="text-2xl font-bold">
                  {packages.reduce((sum, pkg) => sum + pkg.activeUsers, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ₹{packages.reduce((sum, pkg) => sum + (pkg.amount * pkg.activeUsers), 0).toLocaleString()}
                </p>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Package Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Package</CardTitle>
            <CardDescription>Create a new package with custom commission rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packageName">Package Name *</Label>
                <Input
                  id="packageName"
                  placeholder="e.g., Starter Package"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packageAmount">Package Amount (₹) *</Label>
                <Input
                  id="packageAmount"
                  type="number"
                  placeholder="e.g., 1000"
                  value={newPackage.amount}
                  onChange={(e) => setNewPackage({...newPackage, amount: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level1">Level 1 Commission (%)</Label>
                <Input
                  id="level1"
                  type="number"
                  value={newPackage.level1Commission}
                  onChange={(e) => setNewPackage({...newPackage, level1Commission: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level2">Level 2 Commission (%)</Label>
                <Input
                  id="level2"
                  type="number"
                  value={newPackage.level2Commission}
                  onChange={(e) => setNewPackage({...newPackage, level2Commission: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level3">Level 3 Commission (%)</Label>
                <Input
                  id="level3"
                  type="number"
                  value={newPackage.level3Commission}
                  onChange={(e) => setNewPackage({...newPackage, level3Commission: e.target.value})}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddPackage}>
                <Plus className="w-4 h-4 mr-2" />
                Create Package
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Packages List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Package Management</CardTitle>
              <CardDescription>Manage packages and commission rates</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Package
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{pkg.name}</h3>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Package Amount</p>
                          <p className="font-semibold text-lg">₹{pkg.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Commission Rates</p>
                          <p className="font-semibold">L1: {pkg.level1Commission}% | L2: {pkg.level2Commission}% | L3: {pkg.level3Commission}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Active Users</p>
                          <p className="font-semibold">{pkg.activeUsers}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Revenue</p>
                          <p className="font-semibold">₹{(pkg.amount * pkg.activeUsers).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageManagement;
