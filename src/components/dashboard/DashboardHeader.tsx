
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, LogOut, Menu, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  userId: string;
  email: string;
  status: string;
}

interface DashboardHeaderProps {
  user: User;
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                P2P Dashboard
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Welcome back, {user.name}</p>
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Status Badge */}
            <Badge variant={user.status === "active" ? "default" : "destructive"} className="hidden sm:inline-flex">
              {user.status}
            </Badge>

            {/* User ID */}
            <Badge variant="secondary" className="hidden md:inline-flex">
              ID: {user.userId}
            </Badge>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Logout */}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
