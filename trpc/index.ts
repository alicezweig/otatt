import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { getTasks } from "../queries/tasks"


export const t = initTRPC.create()
export const createTRPCContext = async () => {
  return {}
}
const publicProcedure = t.procedure
export const createCallerFactory = t.createCallerFactory
const router = t.router

const taskSchema = z.object({
  id: z.number().int(),
  task: z.string().min(1),
  hours: z.number().int().min(0),
  minutes: z.number().int().min(0).max(59)
})
export type Task = z.infer<typeof taskSchema>

export const appRouter = router({
  getTaskList: publicProcedure
    .input(z.void())
    .output(z.array(taskSchema))
    .query(async () => {
      const tasks = await getTasks()
      return tasks
    })
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
