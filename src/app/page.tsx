"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"
import { TypewriterText } from "@/components/typewriter-text"
import {
  Briefcase,
  LayoutDashboard,
  ListChecks,
  StickyNote,
} from "lucide-react"

type AuthTab = "login" | "register"

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
  const [modal, setModal] = useState<{ open: boolean; tab: AuthTab }>({
    open: false,
    tab: "login",
  })

  function openModal(tab: AuthTab) {
    setModal({ open: true, tab })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AuthModal
        open={modal.open}
        defaultTab={modal.tab}
        onOpenChange={(open) => setModal((prev) => ({ ...prev, open }))}
      />

      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="group flex cursor-pointer items-center gap-1.5 font-bold text-base">
            <Briefcase className="size-4" />
            <span>TMJ</span>
            <span className="font-normal text-sm text-muted-foreground sm:max-w-0 sm:overflow-hidden sm:whitespace-nowrap sm:transition-all sm:duration-500 sm:ease-in-out sm:group-hover:max-w-48">
              {" "}Track My Jobs
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => openModal("login")}>
              Entrar
            </Button>
            <Button size="sm" onClick={() => openModal("register")}>
              Criar conta
            </Button>
          </div>
        </div>
      </header>

      <section className="flex flex-col items-center text-center px-4 sm:px-6 pt-14 pb-12 sm:pt-24 sm:pb-16">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          Buscar emprego é difícil.
        </h1>

        <p className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground max-w-2xl">
          <TypewriterText text="Se organizar não precisa ser." delay={55} />
        </p>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
          O TMJ te ajuda a organizar cada candidatura, registrar os processos
          e manter o foco em conseguir a vaga certa.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto" onClick={() => openModal("register")}>
            Comece agora, é grátis
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => openModal("login")}>
            Já tenho uma conta
          </Button>
        </div>
      </section>

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

      <section className="border-t bg-muted/30 px-4 sm:px-6 py-12 sm:py-20 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
          Pronto para ter mais clareza na sua busca?
        </h2>
        <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
          Crie sua conta e comece a organizar suas candidaturas agora. Simples,
          rápido e gratuito.
        </p>
        <Button size="lg" className="w-full max-w-xs sm:w-auto" onClick={() => openModal("register")}>
          Criar conta grátis
        </Button>
      </section>

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
