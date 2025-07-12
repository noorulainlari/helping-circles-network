import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Users, MessageSquare, Calendar, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Helping Circles</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Stronger{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Communities
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with like-minded people, share experiences, and create meaningful relationships through helping circles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Join a Circle <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/circles">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse Circles
              </Button>
            </Link>
          </div>

          {/* Demo Logins */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Accounts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Admin:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">admin@demo.com / admin123</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">User:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">user@demo.com / user123</code>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
            <p className="text-gray-600">
              Find and join circles that match your interests and goals.
            </p>
          </div>
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Share</h3>
            <p className="text-gray-600">
              Share experiences, ask questions, and support each other.
            </p>
          </div>
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Grow</h3>
            <p className="text-gray-600">
              Participate in events and activities that help you grow.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}