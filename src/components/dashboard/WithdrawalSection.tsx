
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

interface User {
  walletBalance: number;
}

interface WithdrawalSectionProps {
  user: User;
}

const WithdrawalSection = ({ user }: WithdrawalSectionProps) => {
  const [withdrawalRequests] = useState([
    {
      id: "W001",
      amount: 1000,
      status: "pending",
      date: "2024-01-20",
      method: "UPI",
    },
    {
      id: "W002",
      amount: 500,
      status: "completed",
      date: "2024-01-18",
      method: "Bank Transfer",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <ArrowDownLeft className="w-5 h-5 mr-2 text-green-500" />
              Withdrawals
            </CardTitle>
            <CardDescription>Manage your withdrawal requests</CardDescription>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Request Withdrawal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {withdrawalRequests.length > 0 ? (
          <div className="space-y-3">
            {withdrawalRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(request.status)}
                  <div>
                    <div className="font-medium">₹{request.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">
                      {request.date} • {request.method}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              </div>
            ))}
            
            <Button variant="outline" size="sm" className="w-full mt-3">
              View All Withdrawals
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <ArrowDownLeft className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No withdrawal requests yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Minimum withdrawal: ₹500
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WithdrawalSection;
