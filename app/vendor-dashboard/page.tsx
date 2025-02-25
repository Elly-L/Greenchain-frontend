"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import { useRoles } from "@/context/roles-context"
import { Loader2 } from "lucide-react"

type VendorData = {
  name: string
  description: string
  pricePerUnit: string
  createdAt: string
}

export default function VendorDashboard() {
  const router = useRouter()
  const { account } = useWallet()
  const { isVendor } = useRoles()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<VendorData>({
    name: "",
    description: "",
    pricePerUnit: "",
    createdAt: "",
  })

  useEffect(() => {
    if (!account) return

    const vendorData = localStorage.getItem(`vendor-${account.toLowerCase()}`)
    if (vendorData) {
      setFormData(JSON.parse(vendorData))
    }
  }, [account])

  if (!account || !isVendor) {
    router.push("/")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!account) return

    try {
      setLoading(true)
      // In a real application, you would update this data in your smart contract
      localStorage.setItem(`vendor-${account.toLowerCase()}`, JSON.stringify(formData))

      toast({
        title: "Success",
        description: "Your vendor profile has been updated",
      })
    } catch (error: any) {
      toast({
        title: "Error",
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
          <CardDescription>Manage your vendor profile and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Vendor Name
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
                Description
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
                Price per Unit
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>View your vendor performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">{new Date(formData.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="font-medium">0 Credits</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

