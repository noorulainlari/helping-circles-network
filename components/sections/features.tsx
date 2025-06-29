import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageCircle, Calendar, Shield, Zap, Globe } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Create Circles",
    description: "Start your own helping circle around shared interests, goals, or causes.",
  },
  {
    icon: MessageCircle,
    title: "Connect & Chat",
    description: "Engage in meaningful conversations with like-minded individuals.",
  },
  {
    icon: Calendar,
    title: "Organize Events",
    description: "Plan meetups, workshops, and collaborative activities.",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Moderated spaces ensuring respectful and supportive interactions.",
  },
  {
    icon: Zap,
    title: "Take Action",
    description: "Turn conversations into real-world impact and positive change.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with people worldwide or focus on your local community.",
  },
]

export function Features() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to build meaningful connections
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform provides all the tools you need to create, manage, and grow your helping circles.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
