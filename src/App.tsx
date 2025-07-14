import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Heart, Users, MessageSquare, Calendar, Globe } from "lucide-react"
import { Link } from "react-router-dom"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Helping Circles</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link to="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Connect, Support, and Build Community Together
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join circles of like-minded individuals who share your interests, goals, and values. 
            Create meaningful connections and support each other's growth.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/auth/signup">
              <Button size="lg" className="px-8 py-3">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/circles">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Browse Circles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Helping Circles?</h3>
            <p className="text-lg text-gray-600">Discover the power of community-driven support</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Find Your Tribe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with people who share your passions, interests, and goals in life.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Share & Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Exchange knowledge, experiences, and support through meaningful conversations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Join Events</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Participate in virtual and local meetups, workshops, and community events.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Global Network</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with like-minded individuals from around the world or in your local area.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Try It Out</h3>
          <Card className="p-8">
            <CardHeader>
              <CardTitle>Demo Accounts</CardTitle>
              <CardDescription>Test the platform with these demo credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Admin Account</h4>
                  <p className="text-sm text-gray-600">Email: admin@demo.com</p>
                  <p className="text-sm text-gray-600">Password: admin123</p>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">User Account</h4>
                  <p className="text-sm text-gray-600">Email: user@demo.com</p>
                  <p className="text-sm text-gray-600">Password: user123</p>
                </div>
              </div>
              <Link to="/auth/signin">
                <Button className="mt-4">Try Demo Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-blue-400 mr-2" />
            <span className="text-lg font-semibold">Helping Circles</span>
          </div>
          <p className="text-gray-400">Building stronger communities, one circle at a time.</p>
        </div>
      </footer>
    </div>
  )
}