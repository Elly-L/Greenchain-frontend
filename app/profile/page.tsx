"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDemoAuth } from "@/context/demo-auth-context"
import { demoUsers } from "@/lib/demo-data"

export default function Profile() {
  const router = useRouter()
  const { user } = useDemoAuth()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) return null

  // Get demo profile data based on role
  const profile = demoUsers.find(
    (demoUser) =>
      demoUser.role === user.role &&
      (user.role === "buyer" ? demoUser.name === "Joe Smith" : demoUser.name === "Laura Chen"),
  )

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VCHnVdgJc3nvzz2ezEWorXyh99kzaM.png"
                alt="Profile picture"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{profile?.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-1">
              <p className="text-sm font-medium text-muted-foreground">Location</p>
              <p className="text-sm">{profile?.location}</p>
            </div>

            {user.role === "buyer" && (
              <>
                <div className="grid gap-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Purchases</p>
                  <p className="text-sm">{profile?.totalPurchases} transactions</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium text-muted-foreground">Credits Bought</p>
                  <p className="text-sm">{profile?.creditsBought} credits</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium text-muted-foreground">Preferred Project Types</p>
                  <p className="text-sm">{profile?.preferences?.projectTypes.join(", ")}</p>
                </div>
              </>
            )}

            {user.role === "vendor" && (
              <>
                <div className="grid gap-1">
                  <p className="text-sm font-medium text-muted-foreground">Company Name</p>
                  <p className="text-sm">{profile?.companyName}</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                  <p className="text-sm">{profile?.totalSales} transactions</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium text-muted-foreground">Credits Available</p>
                  <p className="text-sm">{profile?.creditsAvailable} credits</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium text-muted-foreground">Credits Sold</p>
                  <p className="text-sm">{profile?.creditsSold} credits</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

