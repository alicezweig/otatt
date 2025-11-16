import { z } from "zod"

export const userSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  password: z.string().min(2)
})

export type User = z.infer<typeof userSchema>

export const userSchemaIn = userSchema.omit({ id: true })

export type UserIn = z.infer<typeof userSchemaIn>