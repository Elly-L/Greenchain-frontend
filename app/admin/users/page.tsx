"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDemoAuth } from "@/context/demo-auth-context"
import { demoUsers } from "@/lib/demo-data"
import { Search, UserPlus } from "lucide-react"

export default function ManageUsers() {
  const router = useRouter()
  const { user } = useDemoAuth()
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/admin")
    }
  }, [user, router])

  if (!user || user.role !== "admin") return null

  const filteredUsers = demoUsers.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>View and manage platform users</CardDescription>
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Desktop view */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-4 text-left">Name</th>
                  <th className="py-4 px-4 text-left">Email</th>
                  <th className="py-4 px-4 text-left">Role</th>
                  <th className="py-4 px-4 text-left">Join Date</th>
                  <th className="py-4 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-4 px-4">{user.name}</td>
                    <td className="py-4 px-4">{user.email}</td>
                    <td className="py-4 px-4 capitalize">{user.role}</td>
                    <td className="py-4 px-4">{user.joinDate}</td>
                    <td className="py-4 px-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Name</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Email</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Role</span>
                    <span className="capitalize">{user.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Join Date</span>
                    <span>{user.joinDate}</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

