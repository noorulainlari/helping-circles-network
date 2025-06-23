
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import UserManagement from "@/components/admin/UserManagement";
import PackageManagement from "@/components/admin/PackageManagement";
import WithdrawalManagement from "@/components/admin/WithdrawalManagement";
import AdminWithdrawalProcessor from "@/components/admin/AdminWithdrawalProcessor";
import AdminSystemSettings from "@/components/admin/AdminSystemSettings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your P2P platform</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="processor">Process</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminStats />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="packages">
            <PackageManagement />
          </TabsContent>

          <TabsContent value="withdrawals">
            <WithdrawalManagement />
          </TabsContent>

          <TabsContent value="processor">
            <AdminWithdrawalProcessor />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
