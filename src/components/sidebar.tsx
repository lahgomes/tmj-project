"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, Briefcase, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/applications", icon: Briefcase, label: "Candidaturas" },
]

interface SidebarProps {
  user: {
    name?: string | null | undefined
    email?: string | null | undefined
  }
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ user, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r bg-background transition-transform duration-300",
        "md:static md:z-auto md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="flex items-start justify-between px-4 py-5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-lg"
          onClick={onClose}
        >
          <Briefcase className="size-5" />
          <span>TMJ</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="-mr-2 md:hidden"
          onClick={onClose}
        >
          <X className="size-4" />
          <span className="sr-only">Fechar menu</span>
        </Button>
      </div>
      <p className="px-4 -mt-3 text-xs text-muted-foreground pb-3">Track My Jobs</p>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/applications" &&
              pathname.startsWith("/applications"))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <Separator />

      {/* User footer */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-2">
          <p className="text-sm font-medium truncate">{user.name ?? "Usuário"}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="size-4 mr-2" />
          Sair
        </Button>
      </div>
    </aside>
  )
}
