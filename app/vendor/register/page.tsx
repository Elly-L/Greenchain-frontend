"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import { useAuth } from "@/context/auth-context"
import { storeVendorData } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface VendorFormData {
  name: string
  description: string
  pricePerUnit: string
  website: string
  contactEmail: string
}

export default function VendorRegistration() {
  const router = useRouter()
  const { account } = useWallet()
  const { checkRoles } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<VendorFormData>({
    name: "",
    description: "",
    pricePerUnit: "",
    website: "",
    contactEmail: "",
  })

  // Redirect if not connected
  if (!account) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Please connect your wallet to register as a vendor</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!account) return

    try {
      setLoading(true)

      // Store vendor data
      storeVendorData(account, {
        ...formData,
        createdAt: new Date().toISOString(),
        address: account,
      })

      // Update roles to reflect new vendor status
      await checkRoles()

      toast({
        title: "Registration Successful",
        description: "You have successfully registered as a vendor",
      })

      // Redirect to vendor dashboard
      router.push("/vendor/dashboard")
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Register as Vendor</CardTitle>
        <CardDescription>Complete this form to become a carbon credit vendor on our platform</CardDescription>
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
            Register as Vendor
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

