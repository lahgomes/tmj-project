import { handlers } from "@/lib/auth"

// NextAuth handles GET and POST on /api/auth/* automatically
// GET  — used for session checks, CSRF token, providers list
// POST — used for sign in and sign out
export const { GET, POST } = handlers
