"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import { useAuth } from "@/context/auth-context"
import { getVendorData, storeVendorData } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface VendorData {
  name: string
  description: string
  pricePerUnit: string
  website: string
  contactEmail: string
  createdAt: string
}

export default function VendorDashboard() {
  const router = useRouter()
  const { account } = useWallet()
  const { isVendor } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<VendorData>({
    name: "",
    description: "",
    pricePerUnit: "",
    website: "",
    contactEmail: "",
    createdAt: "",
  })

  // Load vendor data
  useEffect(() => {
    if (account) {
      const data = getVendorData(account)
      if (data) {
        setFormData(data)
      }
    }
  }, [account])

  // Protect route
  if (!account || !isVendor) {
    router.push("/")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!account) return

    try {
      setLoading(true)

      // Update vendor data
      storeVendorData(account, {
        ...formData,
        address: account,
      })

      toast({
        title: "Profile Updated",
        description: "Your vendor profile has been successfully updated",
      })
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vendor Dashboard</CardTitle>
          <CardDescription>Manage your vendor profile and view performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Business Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Business Description
              </label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="pricePerUnit" className="text-sm font-medium">
                Price per Carbon Credit Unit (USD)
              </label>
              <Input
                id="pricePerUnit"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerUnit}
                onChange={(e) => setFormData((prev) => ({ ...prev, pricePerUnit: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">
                Website URL
              </label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                placeholder="https://"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contactEmail" className="text-sm font-medium">
                Contact Email
              </label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>View your business performance statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">{new Date(formData.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="font-medium">0 Credits</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Listings</p>
              <p className="font-medium">1</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

