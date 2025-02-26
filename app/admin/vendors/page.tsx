"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDemoAuth } from "@/context/demo-auth-context"
import { vendors } from "@/lib/demo-data"
import { Search, UserPlus } from "lucide-react"

export default function ManageVendors() {
  const router = useRouter()
  const { user } = useDemoAuth()
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/admin")
    }
  }, [user, router])

  if (!user || user.role !== "admin") return null

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.description.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Vendors</CardTitle>
              <CardDescription>View and manage platform vendors</CardDescription>
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Vendor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Desktop view */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-4 text-left">Name</th>
                  <th className="py-4 px-4 text-left">Project Type</th>
                  <th className="py-4 px-4 text-left">Price/Unit</th>
                  <th className="py-4 px-4 text-left">Total Sales</th>
                  <th className="py-4 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b">
                    <td className="py-4 px-4">{vendor.name}</td>
                    <td className="py-4 px-4">{vendor.projectType}</td>
                    <td className="py-4 px-4">${vendor.pricePerUnit}</td>
                    <td className="py-4 px-4">{vendor.totalSales}</td>
                    <td className="py-4 px-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="border rounded-lg p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Name</span>
                    <span>{vendor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Project Type</span>
                    <span>{vendor.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Price/Unit</span>
                    <span>${vendor.pricePerUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total Sales</span>
                    <span>{vendor.totalSales}</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

