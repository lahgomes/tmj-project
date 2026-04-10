import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 1. Validate request body with Zod
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, password } = parsed.data

    // 2. Check if email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      )
    }

    // 3. Hash the password (never store plain text passwords)
    // bcrypt cost factor 12 = ~250ms to hash, good balance of security/performance
    const hashedPassword = await bcrypt.hash(password, 12)

    // 4. Create the user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true }, // never return password
    })

    return NextResponse.json(user, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
