import { db } from "../index"
import { tasksTable } from "../db/schema"
import { Task, TaskIn } from "../schemas/task"

export const getTasks = async (): Promise<Task[]> => {
  const tasks = await db.select().from(tasksTable)
  return tasks
}

export const writeTask = async (task: TaskIn) => {
  const taskDB = await db.insert(tasksTable).values(task).returning()
  return taskDB
}