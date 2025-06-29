import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Search, MessageCircle, Zap } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover Circles",
    description: "Browse through various helping circles based on your interests and goals.",
  },
  {
    icon: UserPlus,
    title: "Join or Create",
    description: "Join existing circles or create your own to bring like-minded people together.",
  },
  {
    icon: MessageCircle,
    title: "Connect & Share",
    description: "Engage in meaningful conversations, share resources, and support each other.",
  },
  {
    icon: Zap,
    title: "Take Action",
    description: "Turn discussions into real-world actions and create positive impact together.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600">
            Getting started with Helping Circles is simple and straightforward.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
