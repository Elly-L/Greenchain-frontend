import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Allow access to /admin for login page
  if (request.nextUrl.pathname === "/admin") {
    return NextResponse.next()
  }

  // Protect other admin routes
  if (request.nextUrl.pathname.startsWith("/admin/")) {
    // In a real app, we would check for admin authentication here
    // For demo purposes, we'll just allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

