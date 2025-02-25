"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useDemoAuth } from "@/context/demo-auth-context"
import { demoListings } from "@/lib/demo-data"
import { VendorListingModal } from "@/components/modals/vendor-listing-modal"

export default function VendorListings() {
  const router = useRouter()
  const { user } = useDemoAuth()
  const [selectedListing, setSelectedListing] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      router.push("/")
    }
  }, [user, router])

  if (!user || user.role !== "vendor") return null

  const handleAddNew = () => {
    setModalMode("add")
    setSelectedListing(null)
    setIsModalOpen(true)
  }

  const handleEditListing = (listing: any) => {
    setModalMode("edit")
    setSelectedListing(listing)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Listing
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoListings.map((listing) => (
          <Card
            key={listing.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleEditListing(listing)}
          >
            <div className="aspect-video relative">
              <Image
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{listing.title}</span>
                <span className="text-lg font-normal text-muted-foreground">${listing.price}/unit</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available</span>
                  <span>{listing.available} credits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sold</span>
                  <span>{listing.sold} credits</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <VendorListingModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  )
}

