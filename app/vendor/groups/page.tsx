"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDemoAuth } from "@/context/demo-auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Demo data for groups
const demoGroups = [
  {
    id: 1,
    name: "Kenya Forest Group",
    totalCredits: 50000,
    members: 15,
    minContribution: 1000,
    description: "Collective forest conservation credits from various projects in Kenya",
  },
  {
    id: 2,
    name: "Solar Alliance",
    totalCredits: 75000,
    members: 20,
    minContribution: 2000,
    description: "Combined solar energy carbon credits from East Africa",
  },
  {
    id: 3,
    name: "Wind Power Coalition",
    totalCredits: 100000,
    members: 25,
    minContribution: 5000,
    description: "United wind farm carbon credits from multiple locations",
  },
]

export default function VendorGroups() {
  const router = useRouter()
  const { user } = useDemoAuth()
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [contribution, setContribution] = useState("")

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      router.push("/")
    }
  }, [user, router])

  if (!user || user.role !== "vendor") return null

  const handleJoinGroup = (groupId: number) => {
    // In a real app, this would make an API call to join the group
    console.log(`Joining group ${groupId} with ${contribution} credits`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Carbon Credit Groups</CardTitle>
          <CardDescription>Join groups to combine your carbon credits for larger offerings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {demoGroups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Credits</span>
                        <span className="font-medium">{group.totalCredits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Members</span>
                        <span className="font-medium">{group.members}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Min. Contribution</span>
                        <span className="font-medium">{group.minContribution.toLocaleString()} credits</span>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Join Group</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Join {group.name}</DialogTitle>
                          <DialogDescription>Enter the number of credits you want to contribute</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Credit Contribution</label>
                            <Input
                              type="number"
                              placeholder={`Minimum ${group.minContribution} credits`}
                              min={group.minContribution}
                              value={contribution}
                              onChange={(e) => setContribution(e.target.value)}
                            />
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => handleJoinGroup(group.id)}
                            disabled={!contribution || Number(contribution) < group.minContribution}
                          >
                            Confirm Join
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

