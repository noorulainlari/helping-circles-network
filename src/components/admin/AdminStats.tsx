
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, Wallet, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

const AdminStats = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      description: "Active: 987 | Inactive: 247",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-500",
    },
    {
      title: "Active Packages",
      value: "₹12,45,000",
      description: "From 987 activations",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-l-green-500",
    },
    {
      title: "Total Withdrawals",
      value: "₹8,75,000",
      description: "456 completed withdrawals",
      icon: Wallet,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-l-purple-500",
    },
    {
      title: "Platform Revenue",
      value: "₹1,23,000",
      description: "This month earnings",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-l-orange-500",
    },
  ];

  const pendingItems = [
    { title: "Pending Activations", count: 12, color: "text-orange-600" },
    { title: "Pending Withdrawals", count: 8, color: "text-red-600" },
    { title: "Support Tickets", count: 5, color: "text-blue-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className={`border-l-4 ${stat.borderColor}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                  <div className={`w-8 h-8 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                    <IconComponent className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
            Pending Actions
          </CardTitle>
          <CardDescription>Items requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pendingItems.map((item) => (
              <div key={item.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600">Needs review</p>
                </div>
                <div className={`text-2xl font-bold ${item.color}`}>
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
