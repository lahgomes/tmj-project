import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { updateStageSchema } from "@/lib/validations"

type Params = { params: Promise<{ id: string }> }

async function getStageForUser(id: string, userId: string) {
  const stage = await prisma.stage.findFirst({
    where: { id },
    include: { application: { select: { userId: true } } },
  })
  if (!stage || stage.application.userId !== userId) return null
  return stage
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const stage = await getStageForUser(id, session.user.id)

  if (!stage) {
    return NextResponse.json({ error: "Stage not found" }, { status: 404 })
  }

  const body = await request.json()
  const parsed = updateStageSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    )
  }

  const updated = await prisma.stage.update({
    where: { id },
    data: parsed.data,
  })

  return NextResponse.json(updated)
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const stage = await getStageForUser(id, session.user.id)

  if (!stage) {
    return NextResponse.json({ error: "Stage not found" }, { status: 404 })
  }

  await prisma.stage.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
