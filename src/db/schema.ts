import { int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core"

export const tasksTable = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  task: text().notNull(),
  hours: int().notNull(),
  minutes: int().notNull()
})

export const usersTable = sqliteTable(
  "users",
  {
    id: int().primaryKey({ autoIncrement: true }),
    email: text().notNull(),
    password: text().notNull()
  },
  t => ({
    emailUnique: unique().on(t.email)
  })
)
