import { createHTTPServer } from "@trpc/server/adapters/standalone"
import { publicProcedure, router } from "./trpc"
import { getTasks } from "../queries/tasks"

const appRouter = router({
  getTaskList: publicProcedure.query(async () => {
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
