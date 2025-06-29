import { ArrowRight, Users, Heart, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Join thousands building supportive communities.{" "}
              <Link href="/about" className="font-semibold text-blue-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Learn more <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Connect, Support, and{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Grow Together
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Join meaningful helping circles where people support each other's goals, share resources, and build lasting
            connections. Create positive change in your community and beyond.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Start Your Circle
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/circles">
              <Button variant="outline" size="lg">
                Browse Circles
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">10,000+ Members</h3>
              <p className="mt-2 text-sm text-gray-600">Active community members</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">500+ Circles</h3>
              <p className="mt-2 text-sm text-gray-600">Active helping circles</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">50+ Countries</h3>
              <p className="mt-2 text-sm text-gray-600">Global community reach</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
