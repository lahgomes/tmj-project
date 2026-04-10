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
      "Acompanhe quantas candidaturas você enviou, quantas estão em andamento e quantas ofertas recebeu, tudo em um só lugar.",
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
      "Candidatado, triagem, entrevista, oferta, rejeitado ou sem resposta. Mantenha cada vaga organizada com o status correto.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="group flex cursor-default items-center gap-1.5 font-bold text-base">
            <Briefcase className="size-4" />
            <span>TMJ</span>
            <span className="max-w-0 overflow-hidden whitespace-nowrap font-normal text-sm text-muted-foreground transition-all duration-500 ease-in-out group-hover:max-w-48">
              {" "}Track My Jobs
            </span>
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
      <section className="flex flex-col items-center text-center px-4 sm:px-6 pt-14 pb-12 sm:pt-24 sm:pb-16">
        <Badge variant="secondary" className="mb-5 sm:mb-6">
          Gratuito para usar
        </Badge>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          Buscar emprego é difícil.{" "}
          <span className="text-muted-foreground">
            Se organizar não precisa ser.
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
          O TMJ te ajuda a organizar cada candidatura, registrar os processos
          e manter o foco em conseguir a vaga certa.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/register">Começar agora, é grátis</Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/login">Já tenho uma conta</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-medium tracking-widest uppercase text-muted-foreground mb-8 sm:mb-10">
            O que você encontra aqui
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 rounded-xl border bg-card p-4 sm:p-5"
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
      <section className="border-t bg-muted/30 px-4 sm:px-6 py-12 sm:py-20 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
          Pronto para ter mais clareza na sua busca?
        </h2>
        <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
          Crie sua conta e comece a organizar suas candidaturas agora. Simples,
          rápido e gratuito.
        </p>
        <Button size="lg" className="w-full max-w-xs sm:w-auto" asChild>
          <Link href="/register">Criar conta grátis</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 sm:px-6 py-5 sm:py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TMJ · feito com carinho por{" "}
        <a
          href="https://www.linkedin.com/in/larissagomes19/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Larissa Gomes
        </a>
      </footer>
    </div>
  );
}
