import { taskSchema, taskSchemaIn } from "@/src/schemas/task"
import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { getTasks, writeTask } from "../src/queries/tasks"

export const t = initTRPC.create()
export const createTRPCContext = async () => {
  return {}
}
const publicProcedure = t.procedure
export const createCallerFactory = t.createCallerFactory
const router = t.router

// TODO splitting router by modules
export const appRouter = router({
  getTaskList: publicProcedure
    .input(z.void())
    .output(z.array(taskSchema))
    .query(async () => {
      const tasks = await getTasks()
      return tasks
    }),
  writeTask: publicProcedure.input(taskSchemaIn).mutation(async ({ input }) => {
    await writeTask(input)
  })
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
