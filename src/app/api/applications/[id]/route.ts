import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { updateApplicationSchema } from "@/lib/validations"

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const application = await prisma.application.findFirst({
    where: { id, userId: session.user.id },
    include: {
      stages: { orderBy: { order: "asc" } },
      notes: {
        where: { stageId: null },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 })
  }

  return NextResponse.json(application)
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const existing = await prisma.application.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true },
  })

  if (!existing) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 })
  }

  const body = await request.json()
  const parsed = updateApplicationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    )
  }

  const application = await prisma.application.update({
    where: { id },
    data: parsed.data,
  })

  return NextResponse.json(application)
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const existing = await prisma.application.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true },
  })

  if (!existing) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 })
  }

  await prisma.application.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
