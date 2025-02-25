"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useDemoAuth } from "@/context/demo-auth-context"

export default function AdminSignIn() {
  const router = useRouter()
  const { login } = useDemoAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleDemoLogin = async () => {
    try {
      setLoading(true)
      login("admin")
      toast({
        title: "Demo Admin Login Successful",
        description: "You are now logged in as an admin",
      })
      router.push("/admin/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log in",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Admin Sign In</CardTitle>
          <CardDescription className="text-center">Please sign in with your admin credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="admin@example.com" defaultValue="admin@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input id="password" type="password" defaultValue="admin123" />
            </div>
            <Button type="button" className="w-full" onClick={handleDemoLogin} disabled={loading}>
              Demo Admin Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

