import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl
      const isLoggedIn = !!auth?.user

      // Routes accessible without login
      const publicRoutes = ["/", "/login", "/register"]
      const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
      )

      if (!isLoggedIn && !isPublicRoute) return false

      if (isLoggedIn && pathname === "/") {
        return Response.redirect(new URL("/dashboard", request.url))
      }

      return true
    },
  },
}
