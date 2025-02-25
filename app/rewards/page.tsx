"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import { getContract, formatAmount } from "@/lib/contract"
import { Loader2 } from "lucide-react"

export default function Rewards() {
  const { account, provider } = useWallet()
  const [rewards, setRewards] = useState("0")
  const [loading, setLoading] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchRewards() {
      if (!account || !provider) return

      try {
        setLoading(true)
        const contract = getContract(provider)
        const rewards = await contract.rewards(account)
        setRewards(formatAmount(rewards))
      } catch (error) {
        console.error("Failed to fetch rewards:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRewards()
  }, [account, provider])

  async function handleClaim() {
    if (!account || !provider) return

    try {
      setClaiming(true)
      const contract = getContract(provider)
      const tx = await contract.claimRewards()
      await tx.wait()

      toast({
        title: "Success",
        description: "Successfully claimed rewards",
      })
      setRewards("0")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setClaiming(false)
    }
  }

  if (!account) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Please connect your wallet to view rewards</p>
      </div>
    )
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Rewards</CardTitle>
        <CardDescription>Claim your staking rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Available Rewards</label>
          <p className="text-2xl font-bold">{loading ? "Loading..." : `${rewards} CC`}</p>
        </div>
        <Button onClick={handleClaim} className="w-full" disabled={claiming || rewards === "0"}>
          {claiming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Claim Rewards
        </Button>
      </CardContent>
    </Card>
  )
}

