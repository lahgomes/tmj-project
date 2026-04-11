"use client"

import { useState } from "react"
import { Briefcase, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"

interface DashboardShellProps {
  user: {
    name?: string | null | undefined
    email?: string | null | undefined
  }
  children: React.ReactNode
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Backdrop overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
          <div className="flex items-center gap-1.5 font-bold">
            <Briefcase className="size-4" />
            <span>TMJ</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-muted/30">{children}</main>
      </div>
    </div>
  )
}
