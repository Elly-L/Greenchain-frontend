"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/context/wallet-context"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ProductDetailsModalProps {
  product: any | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const { account } = useWallet()
  const { toast } = useToast()

  if (!product) {
    return null
  }

  const handlePurchase = () => {
    if (!account) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to make a purchase",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Purchase Initiated",
      description: "Transaction simulation in progress...",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
              <DialogDescription>Carbon Credit Details</DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <div className="rounded-lg overflow-hidden border">
                <div className="aspect-video relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name || "Product image"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Price per Unit</span>
                    <span className="text-2xl font-bold text-primary">${product.pricePerUnit}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Project Type</div>
                      <div>{product.projectType}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Location</div>
                      <div>{product.location}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Verification</div>
                      <div>{product.verification}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Available Credits</div>
                      <div>{product.availableCredits?.toLocaleString() || 0} credits</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Description</div>
                    <p className="text-sm leading-relaxed">{product.detailedDescription}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handlePurchase} className="w-full">
                  Purchase Credits
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

