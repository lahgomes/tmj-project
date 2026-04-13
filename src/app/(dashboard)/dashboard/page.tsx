import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Briefcase, TrendingUp, MessageCircle, Trophy } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const userId = session.user.id

  const [total, active, interviews, offers, recent] = await Promise.all([
    prisma.application.count({ where: { userId } }),
    prisma.application.count({
      where: { userId, status: { in: ["APPLIED", "SCREENING", "INTERVIEW"] } },
    }),
    prisma.application.count({ where: { userId, status: "INTERVIEW" } }),
    prisma.application.count({ where: { userId, status: "OFFER" } }),
    prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ])

  const statsCards = [
    {
      title: "Total de Candidaturas",
      value: total,
      icon: Briefcase,
      description: "Histórico total",
    },
    {
      title: "Em Andamento",
      value: active,
      icon: TrendingUp,
      description: "Aplicado, triagem ou entrevista",
    },
    {
      title: "Entrevistas",
      value: interviews,
      icon: MessageCircle,
      description: "Em fase de entrevista",
    },
    {
      title: "Ofertas",
      value: offers,
      icon: Trophy,
      description: "Ofertas recebidas",
    },
  ]

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Bem-vindo de volta
          {session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Aqui está um resumo da sua busca por emprego.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Candidaturas Recentes</h2>
        <Button asChild variant="outline" size="sm">
          <Link href="/applications">Ver todas</Link>
        </Button>
      </div>

      {recent.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Nenhuma candidatura ainda.</p>
            <Button asChild>
              <Link href="/applications/new">Adicionar primeira candidatura</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col space-y-2">
          {recent.map((app) => (
            <Link key={app.id} href={`/applications/${app.id}`}>
              <Card className="hover:bg-accent/40 transition-colors cursor-pointer">
                <CardContent className="py-3 px-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{app.jobTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {app.company} · {app.platform}
                    </p>
                  </div>
                  <StatusBadge status={app.status} />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
