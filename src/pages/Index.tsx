
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Wallet, Shield } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                P2P Help System
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Join the Future of 
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> P2P Helping</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                A peer-to-peer helping platform where members support each other through direct transfers and earn through referrals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold">P2P Transfers</h3>
                      <p className="text-sm text-gray-600">Direct user-to-user payments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Referral Income</h3>
                      <p className="text-sm text-gray-600">Multi-level referral system</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-8 h-8 text-purple-500" />
                    <div>
                      <h3 className="font-semibold">ROI Returns</h3>
                      <p className="text-sm text-gray-600">Regular returns on investment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-orange-500" />
                    <div>
                      <h3 className="font-semibold">Secure Platform</h3>
                      <p className="text-sm text-gray-600">Protected transactions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Side - Login/Register Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {showLogin ? "Welcome Back" : "Join Us Today"}
                </CardTitle>
                <CardDescription>
                  {showLogin ? "Sign in to your account" : "Create your account to get started"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showLogin ? <LoginForm /> : <RegisterForm />}
                
                <div className="mt-6 text-center">
                  <Button
                    variant="link"
                    onClick={() => setShowLogin(!showLogin)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {showLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
