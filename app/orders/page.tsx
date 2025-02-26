"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDemoAuth } from "@/context/demo-auth-context"
import { demoOrders } from "@/lib/demo-data"

export default function Orders() {
  const router = useRouter()
  const { user } = useDemoAuth()

  useEffect(() => {
    if (!user || user.role !== "buyer") {
      router.push("/")
    }
  }, [user, router])

  if (!user || user.role !== "buyer") {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
        <CardDescription>View your carbon credit purchase history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Desktop view */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-4 text-left">Date</th>
                  <th className="py-4 px-4 text-left">Vendor</th>
                  <th className="py-4 px-4 text-left">Amount</th>
                  <th className="py-4 px-4 text-left">Price</th>
                  <th className="py-4 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-4 px-4">{order.date}</td>
                    <td className="py-4 px-4">{order.vendor}</td>
                    <td className="py-4 px-4">{order.amount} credits</td>
                    <td className="py-4 px-4">${order.price}</td>
                    <td className="py-4 px-4 capitalize">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {demoOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Date</span>
                  <span>{order.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Vendor</span>
                  <span>{order.vendor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Amount</span>
                  <span>{order.amount} credits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Price</span>
                  <span>${order.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

