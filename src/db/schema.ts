import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const tasksTable = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  task: text().notNull(),
  hours: int().notNull(),
  minutes: int().notNull(),
})
