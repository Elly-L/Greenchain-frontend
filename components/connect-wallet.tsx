"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/context/wallet-context"
import { Loader2 } from "lucide-react"

export function ConnectWallet() {
  const { account, connect, disconnect, isConnecting } = useWallet()

  if (account) {
    return (
      <Button variant="outline" onClick={disconnect}>
        {account.slice(0, 6)}...{account.slice(-4)}
      </Button>
    )
  }

  return (
    <Button onClick={connect} disabled={isConnecting}>
      {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Connect Wallet
    </Button>
  )
}

