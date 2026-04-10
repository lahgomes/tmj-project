import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  CheckCircle2,
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
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <Badge variant="secondary" className="mb-6">
          Gratuito para usar
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          Organize sua busca por emprego em um só lugar
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Acompanhe cada candidatura, registre as etapas do processo seletivo e
          nunca mais perca o fio da meada na sua busca por emprego.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button size="lg" asChild>
            <Link href="/register">Começar agora — é grátis</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Já tenho uma conta</Link>
          </Button>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {[
            "Sem cartão de crédito",
            "Sem anúncios",
            "Dados só seus",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-green-600" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            Tudo que você precisa para gerenciar sua busca
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="shrink-0 size-10 rounded-lg bg-background border flex items-center justify-center">
                  <feature.icon className="size-5 text-muted-foreground" />
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
      <section className="border-t px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Pronto para organizar sua busca?
        </h2>
        <p className="text-muted-foreground mb-8">
          Crie sua conta gratuitamente e comece a acompanhar suas candidaturas
          agora.
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
