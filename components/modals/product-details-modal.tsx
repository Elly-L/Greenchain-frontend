"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useDemoAuth } from "@/context/demo-auth-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface ProductDetailsModalProps {
  product: any | null
  isOpen: boolean
  onClose: () => void
}

const DEMO_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const { user } = useDemoAuth()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  if (!product) {
    return null
  }

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Account Required",
        description: "Please register or sign in to make a purchase",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    // Simulate transaction processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Purchase Successful",
      description: `Successfully purchased ${product.name} credits`,
    })
    setIsProcessing(false)
    onClose()
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
                <Button onClick={handlePurchase} className="w-full" disabled={isProcessing}>
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isProcessing ? "Processing..." : "Purchase Credits"}
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

