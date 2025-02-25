"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useDemoAuth } from "@/context/demo-auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UserRole } from "@/types/auth"

export function RegisterDialog() {
  const router = useRouter()
  const { login } = useDemoAuth()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const handleDemoLogin = (role: UserRole, data: any = {}) => {
    login(role, data)
    setOpen(false)
    toast({
      title: "Demo Login Successful",
      description: `You are now logged in as a ${role}`,
    })

    // Redirect based on role
    if (role === "vendor") {
      router.push("/vendor/dashboard")
    } else if (role === "buyer") {
      router.push("/orders")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register or Sign In</DialogTitle>
          <DialogDescription>Choose your account type to continue</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="buyer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buyer">Buyer</TabsTrigger>
            <TabsTrigger value="vendor">Vendor</TabsTrigger>
          </TabsList>
          <TabsContent value="buyer" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="buyer-email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="buyer-email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="buyer-password" className="text-sm font-medium">
                  Password
                </label>
                <Input id="buyer-password" type="password" />
              </div>
              <Button className="w-full" onClick={() => handleDemoLogin("buyer", { email: "buyer@example.com" })}>
                Demo Login as Buyer
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="vendor" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="vendor-name" className="text-sm font-medium">
                  Business Name
                </label>
                <Input id="vendor-name" placeholder="Your business name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="vendor-email" className="text-sm font-medium">
                  Business Email
                </label>
                <Input id="vendor-email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="vendor-password" className="text-sm font-medium">
                  Password
                </label>
                <Input id="vendor-password" type="password" />
              </div>
              <Button
                className="w-full"
                onClick={() =>
                  handleDemoLogin("vendor", {
                    email: "vendor@example.com",
                    businessName: "Demo Vendor",
                  })
                }
              >
                Demo Login as Vendor
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

