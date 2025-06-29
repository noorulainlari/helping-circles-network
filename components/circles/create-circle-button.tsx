"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import Link from "next/link"

export function CreateCircleButton() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Link href="/auth/signin">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Sign In to Create Circle
        </Button>
      </Link>
    )
  }

  return (
    <Link href="/circles/create">
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Create Circle
      </Button>
    </Link>
  )
}
