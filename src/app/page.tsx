import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  LayoutDashboard,
  ListChecks,
  StickyNote,
} from "lucide-react"

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard com visão geral",
    description:
      "Acompanhe quantas candidaturas você enviou, quantas estão em andamento e quantas ofertas recebeu — tudo em um só lugar.",
  },
  {
    icon: ListChecks,
    title: "Etapas do processo seletivo",
    description:
      "Registre cada fase: triagem, entrevista técnica, entrevista com RH, proposta. Marque como concluído e acompanhe o progresso.",
  },
  {
    icon: StickyNote,
    title: "Anotações por candidatura",
    description:
      "Guarde informações importantes sobre cada vaga: contatos, pontos de atenção, feedback recebido.",
  },
  {
    icon: Briefcase,
    title: "Controle de status",
    description:
      "Candidatado, triagem, entrevista, oferta, rejeitado ou sem resposta — mantenha cada vaga organizada com o status correto.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base">
            <Briefcase className="size-4" />
            <span>TMJ</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Criar conta</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-16">
        <Badge variant="secondary" className="mb-6">
          Gratuito para usar
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          Buscar emprego é difícil.{" "}
          <span className="text-muted-foreground">
            Se organizar não precisa ser.
          </span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Recolocação, mudança de área, primeiro emprego — qualquer busca tem
          suas etapas. O TMJ te ajuda a acompanhar cada candidatura, registrar
          os processos e manter o foco sem perder o controle.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button size="lg" asChild>
            <Link href="/register">Começar agora — é grátis</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Já tenho uma conta</Link>
          </Button>
        </div>
      </section>

      {/* Features — visualmente conectado ao Hero com divisor suave */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-medium tracking-widest uppercase text-muted-foreground mb-10">
            O que você encontra aqui
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 rounded-xl border bg-card p-5"
              >
                <div className="shrink-0 size-10 rounded-lg bg-muted flex items-center justify-center">
                  <feature.icon className="size-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t bg-muted/30 px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Pronto para ter mais clareza na sua busca?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Crie sua conta e comece a organizar suas candidaturas agora. Simples,
          rápido e gratuito.
        </p>
        <Button size="lg" asChild>
          <Link href="/register">Criar conta grátis</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TMJ — Track My Jobs
      </footer>
    </div>
  );
}
