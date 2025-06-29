"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const categories = [
  "Technology",
  "Health & Wellness",
  "Arts & Culture",
  "Business",
  "Environment",
  "Education",
  "Sports & Fitness",
  "Travel",
  "Food & Cooking",
  "Personal Development",
]

const locations = [
  "Virtual",
  "Local",
  "San Francisco, CA",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Austin, TX",
  "Seattle, WA",
]

export function CircleFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-sm text-gray-900 mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <Label htmlFor={category} className="text-sm text-gray-700">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium text-sm text-gray-900 mb-3">Location</h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox id={location} />
                <Label htmlFor={location} className="text-sm text-gray-700">
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium text-sm text-gray-900 mb-3">Circle Size</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="small" />
              <Label htmlFor="small" className="text-sm text-gray-700">
                Small (1-10 members)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medium" />
              <Label htmlFor="medium" className="text-sm text-gray-700">
                Medium (11-50 members)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="large" />
              <Label htmlFor="large" className="text-sm text-gray-700">
                Large (50+ members)
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
