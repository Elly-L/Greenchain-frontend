"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import { getContract, parseAmount } from "@/lib/contract"
import { Loader2 } from "lucide-react"

export default function Stake() {
  const { account, provider } = useWallet()
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function handleStake(e: React.FormEvent) {
    e.preventDefault()
    if (!account || !provider) return

    try {
      setLoading(true)
      const contract = getContract(provider)
      const tx = await contract.stake(parseAmount(amount))
      await tx.wait()

      toast({
        title: "Success",
        description: `Successfully staked ${amount} tokens`,
      })
      setAmount("")
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

  if (!account) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Please connect your wallet to stake tokens</p>
      </div>
    )
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Stake Tokens</CardTitle>
        <CardDescription>Stake your tokens to earn rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleStake} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.000000000000000001"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Stake Tokens
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

