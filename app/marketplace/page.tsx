"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"

// Sample vendor data
const vendors = [
  {
    id: 1,
    name: "EcoTrust Carbon",
    pricePerUnit: 25,
    description: "Verified carbon credits from renewable energy projects",
    rating: 4.5,
    totalSales: 1500,
  },
  {
    id: 2,
    name: "Green Forest Initiative",
    pricePerUnit: 30,
    description: "Forest conservation and reforestation carbon credits",
    rating: 4.8,
    totalSales: 2200,
  },
  {
    id: 3,
    name: "Solar Credit Solutions",
    pricePerUnit: 22,
    description: "Carbon credits from large-scale solar installations",
    rating: 4.3,
    totalSales: 1800,
  },
  {
    id: 4,
    name: "Wind Power Credits",
    pricePerUnit: 28,
    description: "Credits generated from wind farm projects worldwide",
    rating: 4.6,
    totalSales: 1950,
  },
  {
    id: 5,
    name: "Ocean Carbon Capture",
    pricePerUnit: 35,
    description: "Blue carbon credits from marine ecosystem conservation",
    rating: 4.4,
    totalSales: 1200,
  },
  {
    id: 6,
    name: "Sustainable Agriculture Co",
    pricePerUnit: 27,
    description: "Credits from sustainable farming practices",
    rating: 4.2,
    totalSales: 1600,
  },
]

type SortOption = "price-asc" | "price-desc" | "rating-desc" | "sales-desc"

export default function Marketplace() {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("rating-desc")

  // Filter and sort vendors
  const filteredVendors = vendors
    .filter((vendor) => vendor.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.pricePerUnit - b.pricePerUnit
        case "price-desc":
          return b.pricePerUnit - a.pricePerUnit
        case "rating-desc":
          return b.rating - a.rating
        case "sales-desc":
          return b.totalSales - a.totalSales
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 md:max-w-sm">
          <Input placeholder="Search vendors..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Lowest Price</SelectItem>
            <SelectItem value="price-desc">Highest Price</SelectItem>
            <SelectItem value="rating-desc">Highest Rating</SelectItem>
            <SelectItem value="sales-desc">Most Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{vendor.name}</span>
                <span className="text-lg font-normal text-muted-foreground">${vendor.pricePerUnit}/unit</span>
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>
                  {vendor.rating} ({vendor.totalSales} sales)
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{vendor.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="text-center text-muted-foreground">No vendors found matching your search.</div>
      )}
    </div>
  )
}

