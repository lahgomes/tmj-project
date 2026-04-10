"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { Plus, Search } from "lucide-react"

type ApplicationStatus =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "GHOSTED"

type WorkModel = "REMOTE" | "HYBRID" | "ONSITE"

type Application = {
  id: string
  jobTitle: string
  company: string
  platform: string
  workModel: WorkModel
  status: ApplicationStatus
  location: string | null
  createdAt: string
  _count: { stages: number; notes: number }
}

const workModelLabel: Record<WorkModel, string> = {
  REMOTE: "Remoto",
  HYBRID: "Híbrido",
  ONSITE: "Presencial",
}

export default function ApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (statusFilter !== "ALL") params.set("status", statusFilter)

    fetch(`/api/applications?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setApplications(data)
        setLoading(false)
      })
  }, [search, statusFilter])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Candidaturas</h1>
        <Button asChild>
          <Link href="/applications/new">
            <Plus className="size-4 mr-2" />
            Nova Candidatura
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <form
          onSubmit={handleSearchSubmit}
          className="flex gap-2 flex-1 max-w-sm"
        >
          <Input
            placeholder="Buscar por cargo ou empresa..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit" variant="outline" size="icon">
            <Search className="size-4" />
          </Button>
        </form>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os status</SelectItem>
            <SelectItem value="APPLIED">Candidatado</SelectItem>
            <SelectItem value="SCREENING">Triagem</SelectItem>
            <SelectItem value="INTERVIEW">Entrevista</SelectItem>
            <SelectItem value="OFFER">Oferta</SelectItem>
            <SelectItem value="REJECTED">Rejeitado</SelectItem>
            <SelectItem value="GHOSTED">Sem resposta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Carregando...
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          {search || statusFilter !== "ALL"
            ? "Nenhuma candidatura encontrada para os filtros atuais."
            : "Nenhuma candidatura ainda. Adicione a primeira!"}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cargo / Empresa</TableHead>
              <TableHead>Plataforma</TableHead>
              <TableHead>Modalidade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow
                key={app.id}
                className="cursor-pointer"
                onClick={() => router.push(`/applications/${app.id}`)}
              >
                <TableCell>
                  <p className="font-medium">{app.jobTitle}</p>
                  <p className="text-sm text-muted-foreground">{app.company}</p>
                </TableCell>
                <TableCell className="text-sm">{app.platform}</TableCell>
                <TableCell className="text-sm">
                  {workModelLabel[app.workModel]}
                </TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(app.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
