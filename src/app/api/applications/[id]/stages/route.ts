import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stageSchema } from "@/lib/validations"

type Params = { params: Promise<{ id: string }> }

async function getApplicationForUser(id: string, userId: string) {
  return prisma.application.findFirst({
    where: { id, userId },
    select: { id: true },
  })
}

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const application = await getApplicationForUser(id, session.user.id)

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 })
  }

  const stages = await prisma.stage.findMany({
    where: { applicationId: id },
    orderBy: { order: "asc" },
    include: { stageNotes: { orderBy: { createdAt: "desc" } } },
  })

  return NextResponse.json(stages)
}

export async function POST(request: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const application = await getApplicationForUser(id, session.user.id)

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 })
  }

  const body = await request.json()
  const parsed = stageSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    )
  }

  const stage = await prisma.stage.create({
    data: { ...parsed.data, applicationId: id },
  })

  return NextResponse.json(stage, { status: 201 })
}
