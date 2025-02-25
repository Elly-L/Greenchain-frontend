"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useWallet } from "@/context/wallet-context"
import { getContract } from "@/lib/contract"
import { isAdmin, isVendor } from "@/lib/auth"

interface AuthContextType {
  isAdmin: boolean
  isVendor: boolean
  checkRoles: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  isVendor: false,
  checkRoles: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { account, provider } = useWallet()
  const [roles, setRoles] = useState({
    isAdmin: false,
    isVendor: false,
  })

  const checkRoles = useCallback(async () => {
    if (!account || !provider) {
      setRoles({ isAdmin: false, isVendor: false })
      return
    }

    try {
      // Check admin status from contract
      const contract = getContract(provider)
      const adminAddress = await contract.admin()

      // Update roles
      setRoles({
        isAdmin: isAdmin(account, adminAddress),
        isVendor: isVendor(account),
      })
    } catch (error) {
      console.error("Failed to check roles:", error)
      setRoles({ isAdmin: false, isVendor: false })
    }
  }, [account, provider])

  useEffect(() => {
    checkRoles()
  }, [checkRoles])

  return <AuthContext.Provider value={{ ...roles, checkRoles }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

