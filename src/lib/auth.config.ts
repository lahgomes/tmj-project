import type { NextAuthConfig } from "next-auth"

// This config is edge-compatible: no Prisma, no Node.js-only APIs.
// It is used by middleware.ts (Edge Runtime) to check auth status.
// The full config (with Prisma + Credentials provider) lives in auth.ts.
export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [], // providers are added in auth.ts only
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl
      const isLoggedIn = !!auth?.user

      const publicRoutes = ["/login", "/register"]
      const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
      )

      // Not logged in trying to access protected route → deny (redirects to signIn page)
      if (!isLoggedIn && !isPublicRoute) return false

      // Already logged in trying to access login/register → redirect to dashboard
      if (isLoggedIn && isPublicRoute) {
        return Response.redirect(new URL("/dashboard", request.url))
      }

      return true
    },
  },
}
