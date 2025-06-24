
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Network, 
  Gift,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Join the Future of <br />
            <span className="text-blue-600">Peer-to-Peer Finance</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Connect with a global community of investors and earn consistent returns 
            through our secure helping circles network. Start your financial journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Helping Circles?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven financial strategies 
              to deliver exceptional results for our community members.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Consistent Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Earn daily ROI with our proven investment packages. 
                  Multiple tiers available to match your investment goals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Referral Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Build your network and earn bonus commissions. 
                  Multi-level referral system with attractive incentives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Secure Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Bank-level security with transparent processes. 
                  Your investments and personal data are fully protected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Follow these easy steps to begin your journey 
              with Helping Circles Network.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create your account with basic information and verify your email."
              },
              {
                step: "2", 
                title: "Choose Package",
                description: "Select an investment package that suits your budget and goals."
              },
              {
                step: "3",
                title: "Invite Friends",
                description: "Share your referral code and build your network for bonus earnings."
              },
              {
                step: "4",
                title: "Earn Daily",
                description: "Watch your investment grow with daily ROI and referral bonuses."
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Investment Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully designed investment packages. Each package offers 
              different returns and benefits to match your investment capacity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter Package",
                amount: "$100",
                roi: "1.0% Daily",
                duration: "100 Days",
                bonus: "$10 Referral",
                features: ["Daily ROI Distribution", "Basic Support", "Mobile App Access"]
              },
              {
                name: "Premium Package", 
                amount: "$500",
                roi: "1.2% Daily",
                duration: "120 Days", 
                bonus: "$25 Referral",
                features: ["Higher Daily Returns", "Priority Support", "Advanced Analytics", "Bonus Rewards"],
                popular: true
              },
              {
                name: "VIP Package",
                amount: "$1000",
                roi: "1.5% Daily",
                duration: "150 Days",
                bonus: "$50 Referral", 
                features: ["Maximum Returns", "VIP Support", "Exclusive Features", "Premium Benefits"]
              }
            ].map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-blue-500 border-2' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{pkg.amount}</div>
                  <CardDescription>{pkg.roi} for {pkg.duration}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-green-600 mb-2">
                      <Gift className="h-5 w-5 mr-2" />
                      <span className="font-medium">{pkg.bonus} Bonus</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}>
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: "10,000+", label: "Active Members" },
              { icon: DollarSign, value: "$2M+", label: "Total Distributed" },
              { icon: TrendingUp, value: "98%", label: "Success Rate" },
              { icon: Network, value: "50+", label: "Countries" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful investors who are already earning with Helping Circles.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            Create Account Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Helping Circles</h3>
              <p className="text-gray-400">
                Building the future of peer-to-peer finance through secure, 
                transparent, and profitable investment opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="#packages" className="hover:text-white">Packages</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: support@helpingcircles.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Finance St, Business City</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Helping Circles Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
