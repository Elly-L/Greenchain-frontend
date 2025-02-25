"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useWallet } from "@/context/wallet-context"
import { getContract } from "@/lib/contract"

type UserRoles = {
  isAdmin: boolean
  isVendor: boolean
}

type RolesContextType = UserRoles & {
  checkRoles: () => Promise<void>
}

const RolesContext = createContext<RolesContextType>({
  isAdmin: false,
  isVendor: false,
  checkRoles: async () => {},
})

export function RolesProvider({ children }: { children: React.ReactNode }) {
  const { account, provider } = useWallet()
  const [roles, setRoles] = useState<UserRoles>({
    isAdmin: false,
    isVendor: false,
  })

  const checkRoles = useCallback(async () => {
    if (!account || !provider) {
      setRoles({ isAdmin: false, isVendor: false })
      return
    }

    try {
      const contract = getContract(provider)
      const adminAddress = await contract.admin()
      const isAdmin = adminAddress.toLowerCase() === account.toLowerCase()

      // In a real application, you would check vendor status from the contract
      // For now, we'll check localStorage as an example
      const vendorData = localStorage.getItem(`vendor-${account.toLowerCase()}`)
      const isVendor = Boolean(vendorData)

      setRoles({ isAdmin, isVendor })
    } catch (error) {
      console.error("Failed to check roles:", error)
      setRoles({ isAdmin: false, isVendor: false })
    }
  }, [account, provider])

  useEffect(() => {
    checkRoles()
  }, [checkRoles])

  return <RolesContext.Provider value={{ ...roles, checkRoles }}>{children}</RolesContext.Provider>
}

export const useRoles = () => useContext(RolesContext)

