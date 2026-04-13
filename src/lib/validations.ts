import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>

export const applicationSchema = z.object({
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  company: z.string().min(1, "Company is required"),
  jobUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  platform: z.string().min(1, "Platform is required"),
  workModel: z.enum(["REMOTE", "HYBRID", "ONSITE"]).default("REMOTE"),
  location: z.string().optional(),
  salary: z.string().optional(),
  tags: z.array(z.string()).default([]),
  description: z.string().optional(),
  status: z
    .enum(["APPLIED", "SCREENING", "INTERVIEW", "OFFER", "REJECTED", "GHOSTED"])
    .default("APPLIED"),
})

export const updateApplicationSchema = applicationSchema.partial()

export type ApplicationSchema = z.infer<typeof applicationSchema>
export type UpdateApplicationSchema = z.infer<typeof updateApplicationSchema>

export const stageSchema = z.object({
  name: z.string().min(1, "Stage name is required"),
  order: z.number().int().optional(),
  completed: z.boolean().optional(),
  scheduledAt: z.string().datetime({ offset: true }).optional().nullable(),
  notes: z.string().optional(),
})

export const updateStageSchema = stageSchema.partial()

export type StageSchema = z.infer<typeof stageSchema>
export type UpdateStageSchema = z.infer<typeof updateStageSchema>

export const noteSchema = z.object({
  content: z.string().min(1, "Note content is required"),
  stageId: z.string().optional(),
})

export type NoteSchema = z.infer<typeof noteSchema>
