"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MapPin, Globe } from "lucide-react"
import { createClient } from "@/lib/supabase"
import Link from "next/link"

interface Circle {
  id: string
  name: string
  description: string
  category: string
  location: string
  is_virtual: boolean
  member_count: number
  image_url?: string
  created_by: {
    full_name: string
    avatar_url?: string
  }
}

export function CircleGrid() {
  const [circles, setCircles] = useState<Circle[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchCircles() {
      const { data, error } = await supabase
        .from("circles")
        .select(`
          *,
          created_by:profiles!circles_created_by_fkey(full_name, avatar_url),
          circle_members(count)
        `)
        .eq("is_private", false)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching circles:", error)
      } else {
        const formattedCircles =
          data?.map((circle) => ({
            ...circle,
            member_count: circle.circle_members?.[0]?.count || 0,
          })) || []
        setCircles(formattedCircles)
      }
      setLoading(false)
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
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {circle.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CardDescription className="text-sm text-gray-600 line-clamp-2">{circle.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={circle.created_by.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{circle.created_by.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">by {circle.created_by.full_name}</span>
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
