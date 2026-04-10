import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/lib/validations"
import { authConfig } from "@/lib/auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // 1. Validate input shape with Zod
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        // 2. Find user by email
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.password) return null

        // 3. Compare password with stored hash
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return null

        // 4. Return user object (NextAuth will encode this into the JWT)
        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    // Add user id to the JWT token
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    // Add user id to the session object (accessible via auth() or useSession())
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string
      return session
    },
  },
})
