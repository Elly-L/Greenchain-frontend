export type UserRole = "buyer" | "vendor" | "admin" | null

export interface DemoUser {
  role: UserRole
  email?: string
  name?: string
  businessName?: string
}

