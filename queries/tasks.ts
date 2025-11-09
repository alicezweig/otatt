import { db } from "../src/index"
import { tasksTable } from "../src/db/schema"

export const getTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  const tasks = await db.select().from(tasksTable)
  return tasks
}