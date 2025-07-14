import { useAuth } from "../components/providers/auth-provider"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function CirclesPage() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/signin")
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading circles...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const circles = [
    {
      name: "Tech Innovators",
      description: "A community for technology enthusiasts and innovators sharing the latest trends",
      category: "Technology",
      members: 1247,
      color: "bg-blue-100",
      emoji: "💻",
    },
    {
      name: "Sustainable Living",
      description: "Learn and share tips for eco-friendly living and environmental consciousness",
      category: "Environment",
      members: 892,
      color: "bg-green-100",
      emoji: "🌱",
    },
    {
      name: "Creative Writers",
      description: "Support and feedback for aspiring writers, poets, and storytellers",
      category: "Arts & Culture",
      members: 634,
      color: "bg-purple-100",
      emoji: "✍️",
    },
    {
      name: "Fitness Accountability",
      description: "Stay motivated on your fitness journey with supportive workout partners",
      category: "Health & Wellness",
      members: 1156,
      color: "bg-red-100",
      emoji: "💪",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🤝 Helping Circles</h1>
              <p className="text-gray-600">Welcome back, {user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate("/admin")} variant="outline">
                Admin Panel
              </Button>
              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse Circles
          </h2>
          <p className="text-lg text-gray-600">
            Find and join communities that match your interests and goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {circles.map((circle, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className={`${circle.color} w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4`}>
                    {circle.emoji}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{circle.name}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {circle.members.toLocaleString()} members
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-gray-600">
                  {circle.description}
                </CardDescription>
                <div className="flex justify-between items-center">
                  <span className={`${circle.color} text-gray-700 text-xs px-3 py-1 rounded-full font-medium`}>
                    {circle.category}
                  </span>
                  <Button size="sm">
                    Join Circle
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Don't see a circle that fits your interests?</p>
          <Button size="lg">
            🚀 Create Your Own Circle
          </Button>
        </div>
      </div>
    </div>
  )
}