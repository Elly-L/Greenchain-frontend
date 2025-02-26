"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDemoAuth } from "@/context/demo-auth-context"

// Demo data for Chama fund
const chamaData = {
  totalPool: 25000,
  totalContributors: 45,
  projectsFunded: 3,
  recentTransactions: [
    {
      id: 1,
      date: "2024-02-25",
      type: "Contribution",
      amount: 500,
      project: "Forest Conservation",
    },
    {
      id: 2,
      date: "2024-02-24",
      type: "Funding",
      amount: 10000,
      project: "Mangrove Restoration",
    },
    {
      id: 3,
      date: "2024-02-23",
      type: "Contribution",
      amount: 750,
      project: "Solar Installation",
    },
  ],
  fundedProjects: [
    {
      id: 1,
      name: "Mangrove Restoration Project",
      location: "Lamu, Kenya",
      fundingReceived: 10000,
      status: "Active",
    },
    {
      id: 2,
      name: "Community Solar Initiative",
      location: "Kisumu, Kenya",
      fundingReceived: 8000,
      status: "Completed",
    },
    {
      id: 3,
      name: "Forest Conservation Program",
      location: "Mt. Kenya Region",
      fundingReceived: 7000,
      status: "Active",
    },
  ],
}

export default function ChamaPool() {
  const router = useRouter()
  const { user } = useDemoAuth()

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      router.push("/")
    }
  }, [user, router])

  if (!user || user.role !== "vendor") return null

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${chamaData.totalPool.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chamaData.totalContributors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projects Funded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chamaData.projectsFunded}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest contributions and funding allocations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chamaData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{transaction.project}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${transaction.amount}</p>
                    <p className="text-sm text-muted-foreground">{transaction.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funded Projects</CardTitle>
            <CardDescription>Projects supported by the Chama pool</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chamaData.fundedProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${project.fundingReceived}</p>
                    <p className="text-sm text-muted-foreground">{project.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

