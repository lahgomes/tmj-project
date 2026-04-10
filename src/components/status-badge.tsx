import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ApplicationStatus =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "GHOSTED"

const statusConfig: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  APPLIED: {
    label: "Candidatado",
    className:
      "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300",
  },
  SCREENING: {
    label: "Triagem",
    className:
      "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/40 dark:text-amber-300",
  },
  INTERVIEW: {
    label: "Entrevista",
    className:
      "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/40 dark:text-purple-300",
  },
  OFFER: {
    label: "Oferta",
    className:
      "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/40 dark:text-green-300",
  },
  REJECTED: {
    label: "Rejeitado",
    className:
      "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/40 dark:text-red-300",
  },
  GHOSTED: {
    label: "Sem resposta",
    className:
      "bg-zinc-100 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400",
  },
}

interface StatusBadgeProps {
  status: ApplicationStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge
      variant="secondary"
      className={cn(config.className, "border-0", className)}
    >
      {config.label}
    </Badge>
  )
}
