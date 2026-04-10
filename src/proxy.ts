import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

// Use only the edge-compatible config here (no Prisma, no Node.js APIs).
// The authorized() callback in authConfig handles route protection.
export default NextAuth(authConfig).auth

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
