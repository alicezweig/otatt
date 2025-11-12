import { createHTTPServer } from "@trpc/server/adapters/standalone"
import { z } from "zod"
import { getTasks } from "../queries/tasks"
import { publicProcedure, router } from "./trpc"

export const taskSchema = z.object({
  id: z.number().int(),
  task: z.string().min(1),
  hours: z.number().int().min(0),
  minutes: z.number().int().min(0).max(59)
})

export type Task = z.infer<typeof taskSchema>

const appRouter = router({
  getTaskList: publicProcedure
    .input(z.void())
    .output(z.array(taskSchema))
    .query(async () => {
      const tasks = await getTasks()
      console.log(tasks)
      return tasks
    })
})

const server = createHTTPServer({
  router: appRouter
})

server.listen(3000)

export type AppRouter = typeof appRouter
