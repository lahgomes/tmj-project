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
        platform: form.platform,
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
      setError(data.error ?? "Something went wrong")
      return
    }

    router.push(`/applications/${data.id}`)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-2">
          <Link href="/applications">
            <ArrowLeft className="size-4 mr-2" />
            Back to Applications
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">New Application</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Frontend Developer"
                  value={form.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Company *</Label>
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
                <Label htmlFor="platform">Platform *</Label>
                <Input
                  id="platform"
                  name="platform"
                  placeholder="LinkedIn, Gupy, Indeed..."
                  list="platform-suggestions"
                  value={form.platform}
                  onChange={handleChange}
                  required
                />
                <datalist id="platform-suggestions">
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p} />
                  ))}
                </datalist>
              </div>
              <div className="space-y-1.5">
                <Label>Work Model *</Label>
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
                    <SelectItem value="REMOTE">Remote</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                    <SelectItem value="ONSITE">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="São Paulo, SP"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="salary">Salary Range</Label>
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
              <Label htmlFor="jobUrl">Job URL</Label>
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
                Separate with commas
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Job Description / Notes</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Paste the job description or add your notes..."
                rows={4}
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Application"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/applications">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
