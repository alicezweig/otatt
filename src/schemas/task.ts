import { z } from "zod"

export const taskSchema = z.object({
  id: z.number().int(),
  task: z.string().min(1),
  hours: z.number().int().min(0),
  minutes: z.number().int().min(0).max(59)
})

export type Task = z.infer<typeof taskSchema>

export const taskSchemaIn = taskSchema.omit({ id: true })

export type TaskIn = z.infer<typeof taskSchemaIn>