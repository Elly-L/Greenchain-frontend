"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import { useRoles } from "@/context/roles-context"
import { Loader2 } from "lucide-react"

export default function RegisterVendor() {
  const router = useRouter()
  const { account } = useWallet()
  const { checkRoles } = useRoles()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerUnit: "",
  })

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
      // In a real application, you would send this data to your smart contract
      // For now, we'll store it in localStorage as an example
      localStorage.setItem(
        `vendor-${account.toLowerCase()}`,
        JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString(),
        }),
      )

      await checkRoles()

      toast({
        title: "Success",
        description: "You have successfully registered as a vendor",
      })

      router.push("/vendor-dashboard")
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
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Register as Vendor</CardTitle>
        <CardDescription>Fill out the form below to register as a carbon credit vendor</CardDescription>
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
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

