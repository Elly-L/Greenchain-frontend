import type React from "react"
import { WalletProvider } from "@/context/wallet-context"
import { DemoAuthProvider } from "@/context/demo-auth-context"
import { Nav } from "@/components/layout/nav"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { DisclaimerModal } from "@/components/disclaimer-modal"
import "@/styles/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <DemoAuthProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <DisclaimerModal />
              <Nav />
              <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </DemoAuthProvider>
        </WalletProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
