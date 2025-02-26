"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { blockchainTransactions } from "@/lib/demo-data"
import { Search } from "lucide-react"

export default function Blockchain() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredTransactions = blockchainTransactions.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(search.toLowerCase()) ||
      tx.from.toLowerCase().includes(search.toLowerCase()) ||
      tx.to.toLowerCase().includes(search.toLowerCase()) ||
      tx.type.toLowerCase().includes(search.toLowerCase())

    if (filter === "all") return matchesSearch
    return matchesSearch && tx.type.toLowerCase() === filter.toLowerCase()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain Transactions</CardTitle>
        <CardDescription>View all carbon credit transactions on the blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by hash, address, or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="carbon sale">Carbon Sales</SelectItem>
                <SelectItem value="chama deduction">Chama Deductions</SelectItem>
                <SelectItem value="payment to vendor">Vendor Payments</SelectItem>
                <SelectItem value="group pool contribution">Group Contributions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop view */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-4 text-left">Transaction Hash</th>
                  <th className="py-4 px-4 text-left">Type</th>
                  <th className="py-4 px-4 text-left">From</th>
                  <th className="py-4 px-4 text-left">To</th>
                  <th className="py-4 px-4 text-left">Amount (USD)</th>
                  <th className="py-4 px-4 text-left">Credits</th>
                  <th className="py-4 px-4 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="py-4 px-4 font-mono text-sm">{tx.hash}</td>
                    <td className="py-4 px-4">{tx.type}</td>
                    <td className="py-4 px-4 font-mono text-sm">{tx.from}</td>
                    <td className="py-4 px-4 font-mono text-sm">{tx.to}</td>
                    <td className="py-4 px-4">${tx.amount.toLocaleString()}</td>
                    <td className="py-4 px-4">{tx.credits.toLocaleString()}</td>
                    <td className="py-4 px-4">{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="border rounded-lg p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium">Hash</span>
                    <span className="font-mono text-sm text-right">{tx.hash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Type</span>
                    <span>{tx.type}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium">From</span>
                    <span className="font-mono text-sm text-right">{tx.from}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium">To</span>
                    <span className="font-mono text-sm text-right">{tx.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Amount</span>
                    <span>${tx.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Credits</span>
                    <span>{tx.credits.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Timestamp</span>
                    <span>{tx.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">No transactions found matching your search.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

