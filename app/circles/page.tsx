import { CircleGrid } from "@/components/circles/circle-grid"
import { CircleFilters } from "@/components/circles/circle-filters"
import { CreateCircleButton } from "@/components/circles/create-circle-button"
import { Suspense } from "react"

export default function CirclesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Circles</h1>
            <p className="text-gray-600">Find and join communities that match your interests</p>
          </div>
          <CreateCircleButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CircleFilters />
          </div>
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading circles...</div>}>
              <CircleGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
