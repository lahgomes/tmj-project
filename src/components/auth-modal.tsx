"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type AuthTab = "login" | "register"

interface AuthModalProps {
  open: boolean
  defaultTab?: AuthTab
  onOpenChange: (open: boolean) => void
}

export function AuthModal({
  open,
  defaultTab = "login",
  onOpenChange,
}: AuthModalProps) {
  const router = useRouter()
  const [tab, setTab] = useState<AuthTab>(defaultTab)

  // Sync tab and reset errors when modal opens
  useEffect(() => {
    if (open) {
      setTab(defaultTab)
      setLoginError("")
      setRegisterError("")
    }
  }, [open, defaultTab])

  // Login state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  // Register state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [registerError, setRegisterError] = useState("")
  const [registerLoading, setRegisterLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError("")
    setLoginLoading(true)

    const result = await signIn("credentials", {
      email: loginForm.email,
      password: loginForm.password,
      redirect: false,
    })

    setLoginLoading(false)

    if (result?.error) {
      setLoginError("E-mail ou senha inválidos")
      return
    }

    onOpenChange(false)
    router.push("/dashboard")
    router.refresh()
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setRegisterError("")

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError("As senhas não coincidem")
      return
    }

    setRegisterLoading(true)

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      setRegisterLoading(false)
      setRegisterError(data.error || "Algo deu errado")
      return
    }

    // Auto sign-in after successful register
    const result = await signIn("credentials", {
      email: registerForm.email,
      password: registerForm.password,
      redirect: false,
    })

    setRegisterLoading(false)

    if (result?.error) {
      setTab("login")
      return
    }

    onOpenChange(false)
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Track My Jobs</DialogTitle>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="flex rounded-lg border p-1 gap-1">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-md py-1.5 text-sm font-medium transition-colors",
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        {/* Login form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {loginError}
              </p>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="login-email">E-mail</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="meu-email@exemplo.com"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="login-password">Senha</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loginLoading}>
              {loginLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        )}

        {/* Register form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            {registerError && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {registerError}
              </p>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="register-name">Nome</Label>
              <Input
                id="register-name"
                placeholder="Seu nome"
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="register-email">E-mail</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="meu-email@exemplo.com"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="register-password">Senha</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="register-confirm">Confirmar senha</Label>
              <Input
                id="register-confirm"
                type="password"
                placeholder="••••••••"
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={registerLoading}>
              {registerLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
