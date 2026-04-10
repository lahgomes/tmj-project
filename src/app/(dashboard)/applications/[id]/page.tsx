"use client"

import { use, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/status-badge"
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  Circle,
  ExternalLink,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react"

type ApplicationStatus =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "GHOSTED"

type WorkModel = "REMOTE" | "HYBRID" | "ONSITE"

type Stage = {
  id: string
  name: string
  order: number
  completed: boolean
  scheduledAt: string | null
  notes: string | null
  createdAt: string
}

type Note = {
  id: string
  content: string
  createdAt: string
}

type Application = {
  id: string
  jobTitle: string
  company: string
  jobUrl: string | null
  platform: string
  workModel: WorkModel
  location: string | null
  salary: string | null
  tags: string[]
  description: string | null
  status: ApplicationStatus
  createdAt: string
  stages: Stage[]
  notes: Note[]
}

const workModelLabel: Record<WorkModel, string> = {
  REMOTE: "Remoto",
  HYBRID: "Híbrido",
  ONSITE: "Presencial",
}

const ALL_STATUSES: ApplicationStatus[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "GHOSTED",
]

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()

  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Stage dialog state
  const [stageDialogOpen, setStageDialogOpen] = useState(false)
  const [stageName, setStageName] = useState("")
  const [stageScheduledAt, setStageScheduledAt] = useState("")
  const [stageNotes, setStageNotes] = useState("")
  const [savingStage, setSavingStage] = useState(false)

  // Note state
  const [noteContent, setNoteContent] = useState("")
  const [savingNote, setSavingNote] = useState(false)

  const fetchApplication = useCallback(async () => {
    const res = await fetch(`/api/applications/${id}`)
    if (res.status === 404) {
      setNotFound(true)
      setLoading(false)
      return
    }
    const data = await res.json()
    setApplication(data)
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchApplication()
  }, [fetchApplication])

  async function updateStatus(status: ApplicationStatus) {
    const res = await fetch(`/api/applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      const data = await res.json()
      setApplication((prev) =>
        prev ? { ...prev, status: data.status } : null
      )
    }
  }

  async function deleteApplication() {
    if (
      !window.confirm(
        "Excluir esta candidatura? Esta ação não pode ser desfeita."
      )
    )
      return
    const res = await fetch(`/api/applications/${id}`, { method: "DELETE" })
    if (res.ok) router.push("/applications")
  }

  async function addStage() {
    if (!stageName.trim()) return
    setSavingStage(true)

    const body: Record<string, unknown> = {
      name: stageName,
      order: application?.stages.length ?? 0,
    }
    if (stageNotes.trim()) body.notes = stageNotes
    if (stageScheduledAt)
      body.scheduledAt = new Date(stageScheduledAt).toISOString()

    const res = await fetch(`/api/applications/${id}/stages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    setSavingStage(false)

    if (res.ok) {
      const stage = await res.json()
      setApplication((prev) =>
        prev ? { ...prev, stages: [...prev.stages, stage] } : null
      )
      setStageName("")
      setStageScheduledAt("")
      setStageNotes("")
      setStageDialogOpen(false)
    }
  }

  async function toggleStage(stageId: string, completed: boolean) {
    const res = await fetch(`/api/stages/${stageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    })
    if (res.ok) {
      setApplication((prev) =>
        prev
          ? {
              ...prev,
              stages: prev.stages.map((s) =>
                s.id === stageId ? { ...s, completed } : s
              ),
            }
          : null
      )
    }
  }

  async function deleteStage(stageId: string) {
    const res = await fetch(`/api/stages/${stageId}`, { method: "DELETE" })
    if (res.ok) {
      setApplication((prev) =>
        prev
          ? { ...prev, stages: prev.stages.filter((s) => s.id !== stageId) }
          : null
      )
    }
  }

  async function addNote() {
    if (!noteContent.trim()) return
    setSavingNote(true)

    const res = await fetch(`/api/applications/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: noteContent }),
    })

    setSavingNote(false)

    if (res.ok) {
      const note = await res.json()
      setApplication((prev) =>
        prev ? { ...prev, notes: [note, ...prev.notes] } : null
      )
      setNoteContent("")
    }
  }

  async function deleteNote(noteId: string) {
    const res = await fetch(`/api/notes/${noteId}`, { method: "DELETE" })
    if (res.ok) {
      setApplication((prev) =>
        prev
          ? { ...prev, notes: prev.notes.filter((n) => n.id !== noteId) }
          : null
      )
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm">
        Carregando...
      </div>
    )
  }

  if (notFound || !application) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground mb-4">Candidatura não encontrada.</p>
        <Button asChild variant="outline">
          <Link href="/applications">Voltar para Candidaturas</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/applications">
            <ArrowLeft className="size-4 mr-2" />
            Candidaturas
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{application.jobTitle}</h1>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
              <Briefcase className="size-3.5" />
              <span>{application.company}</span>
              {application.location && (
                <>
                  <span>·</span>
                  <MapPin className="size-3.5" />
                  <span>{application.location}</span>
                </>
              )}
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={deleteApplication}
            className="shrink-0"
          >
            <Trash2 className="size-4 mr-2" />
            Excluir
          </Button>
        </div>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={application.status} />
          <Badge variant="outline">{workModelLabel[application.workModel]}</Badge>
          <Badge variant="outline">{application.platform}</Badge>
          {application.salary && (
            <Badge variant="outline">{application.salary}</Badge>
          )}
          {application.jobUrl && (
            <Button variant="ghost" size="sm" asChild className="h-6 px-2">
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-3.5 mr-1" />
                Ver vaga
              </a>
            </Button>
          )}
        </div>

        {/* Tags */}
        {application.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {application.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Status Update */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Atualizar Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={application.status}
            onValueChange={(v) => updateStatus(v as ApplicationStatus)}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALL_STATUSES.map((s) => {
                const labels: Record<string, string> = {
                  APPLIED: "Candidatado",
                  SCREENING: "Triagem",
                  INTERVIEW: "Entrevista",
                  OFFER: "Oferta",
                  REJECTED: "Rejeitado",
                  GHOSTED: "Sem resposta",
                }
                return (
                  <SelectItem key={s} value={s}>
                    {labels[s]}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Stages */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Etapas</CardTitle>
          <Dialog open={stageDialogOpen} onOpenChange={setStageDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="size-4 mr-2" />
                Adicionar Etapa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Etapa</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label>Nome da Etapa *</Label>
                  <Input
                    placeholder="Entrevista técnica, entrevista com RH..."
                    value={stageName}
                    onChange={(e) => setStageName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Data Agendada (opcional)</Label>
                  <Input
                    type="datetime-local"
                    value={stageScheduledAt}
                    onChange={(e) => setStageScheduledAt(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Observações (opcional)</Label>
                  <Textarea
                    placeholder="O que preparar, dados de contato..."
                    value={stageNotes}
                    onChange={(e) => setStageNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={addStage}
                  disabled={!stageName.trim() || savingStage}
                >
                  {savingStage ? "Salvando..." : "Adicionar Etapa"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {application.stages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma etapa adicionada. Registre entrevistas, testes e outras etapas aqui.
            </p>
          ) : (
            <div className="space-y-3">
              {application.stages.map((stage) => (
                <div key={stage.id} className="flex items-start gap-3">
                  <button
                    onClick={() => toggleStage(stage.id, !stage.completed)}
                    className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {stage.completed ? (
                      <CheckCircle2 className="size-5 text-green-600" />
                    ) : (
                      <Circle className="size-5" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        stage.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {stage.name}
                    </p>
                    {stage.scheduledAt && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Calendar className="size-3" />
                        {new Date(stage.scheduledAt).toLocaleString("pt-BR", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    )}
                    {stage.notes && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {stage.notes}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => deleteStage(stage.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Anotações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Adicione uma anotação sobre essa candidatura..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={3}
            />
            <Button
              size="sm"
              onClick={addNote}
              disabled={!noteContent.trim() || savingNote}
            >
              {savingNote ? "Salvando..." : "Adicionar Anotação"}
            </Button>
          </div>

          {application.notes.length > 0 && <Separator />}

          <div className="space-y-3">
            {application.notes.map((note) => (
              <div key={note.id} className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(note.createdAt).toLocaleString("pt-BR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => deleteNote(note.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      {application.description && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Descrição da Vaga</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap text-muted-foreground">
              {application.description}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
