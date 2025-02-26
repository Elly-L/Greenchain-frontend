"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import Image from "next/image"

const DEMO_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"

const walletOptions = [
  {
    name: "MetaMask",
    icon: "/metamask.svg",
    description: "Connect using MetaMask wallet",
  },
  {
    name: "Coinbase Wallet",
    icon: "/coinbase.svg",
    description: "Connect using Coinbase wallet",
  },
  {
    name: "WalletConnect",
    icon: "/walletconnect.svg",
    description: "Connect using WalletConnect",
  },
  {
    name: "Trust Wallet",
    icon: "/trustwallet.svg",
    description: "Connect using Trust Wallet",
  },
]

export function ConnectWallet() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = async (walletName: string) => {
    setSelectedWallet(walletName)
    setIsConnecting(true)

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsConnecting(false)
    setIsConnected(true)
    setIsOpen(false)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setSelectedWallet(null)
  }

  if (isConnected) {
    return (
      <Button variant="outline" onClick={handleDisconnect}>
        {DEMO_ADDRESS.slice(0, 6)}...{DEMO_ADDRESS.slice(-4)}
      </Button>
    )
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Connect Wallet</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription>Choose your preferred wallet to connect to our platform</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleConnect(wallet.name)}
                disabled={isConnecting}
                className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted transition-colors disabled:opacity-50"
              >
                <div className="h-10 w-10 relative">
                  <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.name} fill className="object-contain" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium">{wallet.name}</h3>
                  <p className="text-sm text-muted-foreground">{wallet.description}</p>
                </div>
                {isConnecting && selectedWallet === wallet.name && <Loader2 className="h-4 w-4 animate-spin" />}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

