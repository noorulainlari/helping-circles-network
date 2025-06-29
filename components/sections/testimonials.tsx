import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Entrepreneur",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Helping Circles has transformed how I connect with like-minded entrepreneurs. The support and resources I've found here are invaluable.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "I've learned so much from the tech circles here. The community is incredibly supportive and knowledgeable.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Wellness Coach",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The wellness circles have helped me grow both personally and professionally. Amazing community of caring individuals.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Community Says</h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear from members who have found meaningful connections and support.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
