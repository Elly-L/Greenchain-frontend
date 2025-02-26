"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDemoAuth } from "@/context/demo-auth-context"
import { demoAdminStats } from "@/lib/demo-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
  const router = useRouter()
  const { user } = useDemoAuth()

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/admin")
    }
  }, [user, router])

  if (!user || user.role !== "admin") return null

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoAdminStats.overview.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoAdminStats.overview.totalVendors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoAdminStats.overview.totalTransactions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume (USD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${demoAdminStats.overview.totalVolume.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities and events</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoAdminStats.recentActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Metrics</CardTitle>
            <CardDescription>Current market statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Price</span>
                <span className="font-medium">${demoAdminStats.marketMetrics.averagePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available Credits</span>
                <span className="font-medium">
                  {demoAdminStats.marketMetrics.totalCreditsAvailable.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Credits Sold</span>
                <span className="font-medium">{demoAdminStats.marketMetrics.totalCreditsSold.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Growth</span>
                <span className="font-medium">{demoAdminStats.marketMetrics.monthlyGrowth}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

