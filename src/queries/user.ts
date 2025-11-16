import { eq } from "drizzle-orm"
import { usersTable } from "../db/schema"
import { db } from "../index"
import { User } from "../schemas/user"

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const rows = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      password: usersTable.password
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1)
  return rows[0] ?? null
}
