import { PrismaClient } from "@/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

// Singleton pattern: reuse the same PrismaClient instance across hot reloads in development.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // PrismaNeon receives the pool config (not a Pool instance).
  // Prisma 7 with adapter uses the factory pattern: PrismaNeon.connect() returns the adapter.
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
