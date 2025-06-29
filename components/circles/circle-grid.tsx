"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MapPin, Globe } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"

interface Circle {
  id: string
  name: string
  description: string | null
  category: string
  location: string | null
  is_virtual: boolean
  member_count: number
  image_url?: string | null
  created_by: {
    full_name: string | null
    avatar_url?: string | null
  }
}

export function CircleGrid() {
  const [circles, setCircles] = useState<Circle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchCircles() {
      try {
        // First, let's try a simpler query to avoid potential issues
        const { data, error } = await supabase
          .from("circles")
          .select(`
            id,
            name,
            description,
            category,
            location,
            is_virtual,
            image_url,
            created_by,
            profiles!circles_created_by_fkey(full_name, avatar_url)
          `)
          .eq("is_private", false)
          .order("created_at", { ascending: false })
          .limit(12)

        if (error) {
          console.error("Error fetching circles:", error)
          setError(error.message)
          // Set some mock data for development
          setCircles([
            {
              id: "1",
              name: "Tech Innovators",
              description: "A community for technology enthusiasts and innovators",
              category: "Technology",
              location: "San Francisco, CA",
              is_virtual: true,
              member_count: 25,
              created_by: {
                full_name: "John Doe",
                avatar_url: null,
              },
            },
            {
              id: "2",
              name: "Sustainable Living",
              description: "Learn and share tips for eco-friendly living",
              category: "Environment",
              location: "Portland, OR",
              is_virtual: false,
              member_count: 18,
              created_by: {
                full_name: "Jane Smith",
                avatar_url: null,
              },
            },
          ])
        } else {
          const formattedCircles: Circle[] =
            data?.map((circle: any) => ({
              id: circle.id,
              name: circle.name || "Untitled Circle",
              description: circle.description,
              category: circle.category || "General",
              location: circle.location,
              is_virtual: circle.is_virtual || false,
              member_count: 0, // We'll calculate this separately
              image_url: circle.image_url,
              created_by: {
                full_name: circle.profiles?.full_name || "Anonymous",
                avatar_url: circle.profiles?.avatar_url,
              },
            })) || []
          setCircles(formattedCircles)
        }
      } catch (err) {
        console.error("Unexpected error:", err)
        setError("Failed to load circles")
        // Set mock data as fallback
        setCircles([
          {
            id: "1",
            name: "Welcome Circle",
            description: "A place to get started with Helping Circles",
            category: "General",
            location: null,
            is_virtual: true,
            member_count: 1,
            created_by: {
              full_name: "System",
              avatar_url: null,
            },
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCircles()
  }, [supabase])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error && circles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Unable to load circles at the moment.</p>
        <p className="text-sm text-gray-400">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {circles.map((circle) => (
        <Card key={circle.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-1">{circle.name}</CardTitle>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {circle.category}
                  </Badge>
                  {circle.is_virtual ? (
                    <div className="flex items-center text-xs text-gray-500">
                      <Globe className="h-3 w-3 mr-1" />
                      Virtual
                    </div>
                  ) : (
                    circle.location && (
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {circle.location}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600 line-clamp-2">
              {circle.description || "No description available"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={circle.created_by.avatar_url || undefined} />
                  <AvatarFallback className="text-xs">{circle.created_by.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">by {circle.created_by.full_name || "Anonymous"}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Users className="h-3 w-3 mr-1" />
                {circle.member_count} members
              </div>
            </div>
            <Link href={`/circles/${circle.id}`}>
              <Button className="w-full">View Circle</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
