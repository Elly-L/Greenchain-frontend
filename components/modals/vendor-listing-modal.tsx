<style>
@media (max-width: 768px) {
    body, html {
        overflow-x: hidden !important; /* Prevent horizontal scrolling */
    }

    .my-listing-container {
        display: flex;
        flex-direction: column; /* Force vertical layout */
        align-items: center;
        width: 100%;
    }

    .listing-item {
        width: 100%; /* Ensure items take full width to prevent overflow */
    }

    .listing-grid {
        display: flex;
        flex-direction: column; /* Stack items vertically */
        gap: 10px; /* Add spacing between items */
    }
}
</style>
"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImagePlus, Loader2 } from "lucide-react"

interface VendorListingModalProps {
  listing?: any
  isOpen: boolean
  onClose: () => void
  mode: "add" | "edit"
}

export function VendorListingModal({ listing, isOpen, onClose, mode }: VendorListingModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(
    listing || {
      title: "",
      price: "",
      available: "",
      projectType: "",
      verification: "",
      location: "",
      description: "",
      detailedDescription: "",
      image: "/placeholder.svg",
    },
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: mode === "add" ? "Listing Created" : "Listing Updated",
        description:
          mode === "add" ? "Your listing has been created successfully" : "Your listing has been updated successfully",
      })
      setLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{mode === "add" ? "Add New Listing" : "Edit Listing"}</DialogTitle>
              <DialogDescription>
                {mode === "add" ? "Create a new carbon credit listing" : "Edit your carbon credit listing"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-lg border">
                  <Image src={formData.image || "/placeholder.svg"} alt="Listing image" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <label className="cursor-pointer">
                      <Input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      <div className="flex flex-col items-center text-white">
                        <ImagePlus className="h-8 w-8 mb-2" />
                        <span className="text-sm">Click to upload image</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter listing title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price per Unit (USD)</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Enter price per unit"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Available Credits</label>
                    <Input
                      type="number"
                      value={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.value })}
                      placeholder="Enter available credits"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Type</label>
                    <Input
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      placeholder="e.g., Wind Energy, Solar, Forest Conservation"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Verification Standard</label>
                    <Input
                      value={formData.verification}
                      onChange={(e) => setFormData({ ...formData, verification: e.target.value })}
                      placeholder="e.g., Gold Standard, Verra VCS"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Enter project location"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Short Description</label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of your project"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Detailed Description</label>
                  <Textarea
                    value={formData.detailedDescription}
                    onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                    placeholder="Provide detailed information about your project"
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {mode === "add" ? "Create Listing" : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

