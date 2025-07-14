"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function CirclesPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

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
      color: "#dbeafe",
      emoji: "💻",
    },
    {
      name: "Sustainable Living",
      description: "Learn and share tips for eco-friendly living and environmental consciousness",
      category: "Environment",
      members: 892,
      color: "#dcfce7",
      emoji: "🌱",
    },
    {
      name: "Creative Writers",
      description: "Support and feedback for aspiring writers, poets, and storytellers",
      category: "Arts & Culture",
      members: 634,
      color: "#f3e8ff",
      emoji: "✍️",
    },
    {
      name: "Fitness Accountability",
      description: "Stay motivated on your fitness journey with supportive workout partners",
      category: "Health & Wellness",
      members: 1156,
      color: "#fef2f2",
      emoji: "💪",
    },
    {
      name: "Entrepreneur Network",
      description: "Connect with fellow entrepreneurs, share experiences, and grow together",
      category: "Business",
      members: 789,
      color: "#fffbeb",
      emoji: "🚀",
    },
    {
      name: "Language Exchange",
      description: "Practice languages with native speakers from around the world",
      category: "Education",
      members: 923,
      color: "#eef2ff",
      emoji: "🗣️",
    },
  ]

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🤝 Helping Circles</h1>
              <p className="text-gray-600">Welcome back, {user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => router.push("/admin")} variant="outline">
                Admin Panel
              </Button>
              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>
            Browse Circles
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
            Find and join communities that match your interests and goals
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
          {circles.map((circle, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #f3f4f6",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)"
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <div
                  style={{
                    background: circle.color,
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    marginRight: "1rem",
                  }}
                >
                  {circle.emoji}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.25rem", color: "#1f2937" }}>
                    {circle.name}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
                    {circle.members.toLocaleString()} members
                  </p>
                </div>
              </div>

              <p style={{ color: "#6b7280", marginBottom: "1.5rem", lineHeight: "1.5" }}>{circle.description}</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    background: circle.color,
                    color: "#374151",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontWeight: "500",
                  }}
                >
                  {circle.category}
                </span>
                <button
                  style={{
                    background: "#2563eb",
                    color: "white",
                    padding: "0.5rem 1.5rem",
                    border: "none",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#1d4ed8"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#2563eb"
                  }}
                >
                  Join Circle
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Don't see a circle that fits your interests?</p>
          <button
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              color: "white",
              padding: "0.75rem 2rem",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            🚀 Create Your Own Circle
          </button>
        </div>
      </div>
    </div>
  )
}
