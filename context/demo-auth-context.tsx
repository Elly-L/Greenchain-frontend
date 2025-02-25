"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import type { UserRole, DemoUser } from "@/types/auth"

interface DemoAuthContextType {
  user: DemoUser | null
  isAuthenticated: boolean
  login: (role: UserRole, userData?: Partial<DemoUser>) => void
  logout: () => void
}

const DemoAuthContext = createContext<DemoAuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null)

  const login = useCallback((role: UserRole, userData?: Partial<DemoUser>) => {
    console.log(`Demo login successful - Role: ${role}`)
    setUser({ role, ...userData })
  }, [])

  const logout = useCallback(() => {
    console.log("Demo logout")
    setUser(null)
  }, [])

  return (
    <DemoAuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  )
}

export const useDemoAuth = () => useContext(DemoAuthContext)

