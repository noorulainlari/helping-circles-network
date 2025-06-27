
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Wallet,
  Gift,
  CheckCircle
} from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">P2P Help Network</span>
          </div>
          <div className="space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button>Sign In / Sign Up</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Join the P2P Help Network
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A secure peer-to-peer help system where members support each other. Earn through referrals and ROI distributions.
          </p>
          {!user && (
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-4">
                Get Started Today <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Secure & Safe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced security measures and transparent processes ensure your safety.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>ROI Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn regular returns on your investment through our distribution system.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Gift className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>3-Level Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn 5%, 3%, and 1% commission from your referrals across 3 levels.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Wallet className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Easy Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Quick and hassle-free withdrawal process with multiple payment options.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle>P2P Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automated peer-to-peer matching system for seamless transactions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete transparency in all transactions and earnings history.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account with basic information</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Package</h3>
              <p className="text-gray-600">Select from ₹1000, ₹1500, ₹3000, or ₹5000 packages</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-gray-600">System matches you with another member for P2P transfer</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Earning</h3>
              <p className="text-gray-600">Earn ROI and referral commissions regularly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Available Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1000, 1500, 3000, 5000].map((amount) => (
              <Card key={amount} className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">₹{amount.toLocaleString()}</CardTitle>
                  <CardDescription>
                    {amount === 1000 && 'Basic Package'}
                    {amount === 1500 && 'Standard Package'}
                    {amount === 3000 && 'Premium Package'}
                    {amount === 5000 && 'VIP Package'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Regular ROI distributions</p>
                    <p>• 3-level referral bonuses</p>
                    <p>• P2P withdrawal matching</p>
                    <p>• Full transaction history</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of members who are already earning through our secure P2P help network.
          </p>
          {!user && (
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Join Now - It's Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">P2P Help Network</span>
              </div>
              <p className="text-gray-400">
                A secure and transparent peer-to-peer help system for mutual financial growth.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>ROI Distributions</li>
                <li>3-Level Referrals</li>
                <li>P2P Matching</li>
                <li>Secure Withdrawals</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Packages</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Basic - ₹1,000</li>
                <li>Standard - ₹1,500</li>
                <li>Premium - ₹3,000</li>
                <li>VIP - ₹5,000</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 P2P Help Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
