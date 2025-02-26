"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DisclaimerModal() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [hasAccepted, setHasAccepted] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("disclaimerAccepted")
    if (accepted) {
      setShowDisclaimer(false)
      setHasAccepted(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("disclaimerAccepted", "true")
    setShowDisclaimer(false)
    setHasAccepted(true)
  }

  if (hasAccepted) return null

  return (
    <>
      {/* Blur overlay */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />

      <Dialog open={showDisclaimer} onOpenChange={() => {}} modal>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0">
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl">Important Disclaimer</DialogTitle>
                <DialogDescription>Please read carefully before proceeding</DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4">
                <div className="prose prose-sm">
                  <p className="text-muted-foreground">
                    This platform is a prototype/mockup demonstration of the GreenChain carbon credit trading platform.
                    Please be aware of the following:
                  </p>

                  <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                    <li>
                      All data, transactions, and functionality presented are simulated and do not represent real
                      blockchain transactions or carbon credits
                    </li>
                    <li>No real cryptocurrency or financial transactions are processed through this demonstration</li>
                    <li>
                      User accounts, wallet connections, and marketplace listings are for demonstration purposes only
                    </li>
                    <li>
                      Any resemblance to real persons, organizations, or actual carbon credit projects is purely
                      coincidental
                    </li>
                    <li>
                      This prototype is intended to showcase the user interface and potential functionality of the
                      platform
                    </li>
                  </ul>

                  <p className="mt-4 text-muted-foreground">
                    By clicking &quot;I Understand & Continue&quot;, you acknowledge that you understand this is a
                    prototype demonstration and not a functional trading platform.
                  </p>
                </div>

                <div className="pt-4">
                  <Button onClick={handleAccept} className="w-full">
                    I Understand & Continue
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}

