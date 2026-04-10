import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type Params = { params: Promise<{ id: string }> }

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const note = await prisma.note.findFirst({
    where: { id },
    include: { application: { select: { userId: true } } },
  })

  if (!note || note.application.userId !== session.user.id) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 })
  }

  await prisma.note.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
