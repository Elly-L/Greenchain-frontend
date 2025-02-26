"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ConnectWallet } from "@/components/connect-wallet"
import { RegisterDialog } from "@/components/auth/register-dialog"
import { UserNav } from "@/components/layout/user-nav"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useDemoAuth } from "@/context/demo-auth-context"

const roleNavigation = {
  buyer: [
    { name: "Marketplace", href: "/" },
    { name: "My Orders", href: "/orders" },
    { name: "Profile", href: "/profile" },
    { name: "View Blockchain", href: "/blockchain" },
    { name: "About", href: "/about" },
  ],
  vendor: [
    { name: "Marketplace", href: "/" },
    { name: "My Listings", href: "/vendor/listings" },
    { name: "Groups", href: "/vendor/groups" },
    { name: "Chama", href: "/vendor/chama" },
    { name: "Profile", href: "/profile" },
    { name: "View Blockchain", href: "/blockchain" },
    { name: "About", href: "/about" },
  ],
  admin: [
    { name: "Admin Dashboard", href: "/admin/dashboard" },
    { name: "Manage Users", href: "/admin/users" },
    { name: "Manage Vendors", href: "/admin/vendors" },
    { name: "View Blockchain", href: "/blockchain" },
    { name: "About", href: "/about" },
  ],
  default: [
    { name: "Marketplace", href: "/" },
    { name: "View Blockchain", href: "/blockchain" },
    { name: "About", href: "/about" },
  ],
}

export function Nav() {
  const pathname = usePathname()
  const { user, isAuthenticated } = useDemoAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = user?.role ? roleNavigation[user.role] : roleNavigation.default

  const NavItems = () => (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "inline-flex items-center px-1 py-2 text-sm font-medium",
            pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setIsOpen(false)}
        >
          {item.name}
        </Link>
      ))}
    </>
  )

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold text-primary">GreenChain</span>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavItems />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Desktop Auth */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {!isAuthenticated ? <RegisterDialog /> : <UserNav />}
              <ConnectWallet />
            </div>
            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col h-full w-[240px] sm:w-[300px]">
                <div className="flex-1">
                  {/* Mobile User Nav */}
                  {isAuthenticated && (
                    <div className="mb-4 pb-4 border-b">
                      <UserNav />
                    </div>
                  )}
                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-3">
                    <NavItems />
                  </div>
                </div>
                {/* Mobile Auth */}
                <div className="pt-4 border-t">{!isAuthenticated ? <RegisterDialog /> : <ConnectWallet />}</div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

