"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

type WorkModel = "REMOTE" | "HYBRID" | "ONSITE"

const PLATFORMS = [
  "LinkedIn",
  "Gupy",
  "Indeed",
  "Catho",
  "InfoJobs",
  "InHire",
  "Greenhouse",
  "Trampos.co",
  "Outros",
]

export default function NewApplicationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    jobTitle: "",
    company: "",
    jobUrl: "",
    platform: "",
    platformCustom: "",
    workModel: "REMOTE" as WorkModel,
    location: "",
    salary: "",
    tags: "",
    description: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const tags = form.tags
      ? form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : []

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobTitle: form.jobTitle,
        company: form.company,
        jobUrl: form.jobUrl || undefined,
        platform: form.platform === "Outros" ? form.platformCustom : form.platform,
        workModel: form.workModel,
        location: form.location || undefined,
        salary: form.salary || undefined,
        tags,
        description: form.description || undefined,
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError("Algo deu errado")
      return
    }

    router.push(`/applications/${data.id}`)
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-2">
          <Link href="/applications">
            <ArrowLeft className="size-4 mr-2" />
            Voltar para Candidaturas
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Nova Candidatura</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detalhes da Vaga</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="jobTitle">Cargo *</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Desenvolvedor Frontend"
                  value={form.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Empresa *</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Plataforma *</Label>
                <Select
                  value={form.platform}
                  onValueChange={(v) =>
                    setForm((prev) => ({ ...prev, platform: v, platformCustom: "" }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.platform === "Outros" && (
                  <Input
                    name="platformCustom"
                    placeholder="Nome da plataforma"
                    value={form.platformCustom}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Modalidade *</Label>
                <Select
                  value={form.workModel}
                  onValueChange={(v) =>
                    setForm((prev) => ({
                      ...prev,
                      workModel: v as WorkModel,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REMOTE">Remoto</SelectItem>
                    <SelectItem value="HYBRID">Híbrido</SelectItem>
                    <SelectItem value="ONSITE">Presencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="São Paulo, SP"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="salary">Faixa Salarial</Label>
                <Input
                  id="salary"
                  name="salary"
                  placeholder="R$ 8.000 – R$ 12.000"
                  value={form.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="jobUrl">URL da Vaga</Label>
              <Input
                id="jobUrl"
                name="jobUrl"
                type="url"
                placeholder="https://linkedin.com/jobs/..."
                value={form.jobUrl}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tags">Tags / Stack</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="React, TypeScript, Node.js"
                value={form.tags}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                Separe por vírgulas
              </p>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="description">Descrição / Observações</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Cole a descrição da vaga ou adicione observações..."
                rows={4}
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Candidatura"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/applications">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
