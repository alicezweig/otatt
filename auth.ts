import { CredentialsSignin } from "@auth/core/errors"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./src/queries/user"
import { User } from "./src/schemas/user"
import { verifyPassword } from "./src/utils/auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com"
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****"
        }
      },
      authorize: async (credentials): Promise<User | null> => {
        if (!credentials?.email || !credentials?.password) {
          throw new CredentialsSignin("Missing credentials")
        }

        let user: User | null = null

        user = await getUserByEmail(credentials.email as string)

        if (!user) {
          throw new CredentialsSignin("User does not exist")
        }

        if (!(await verifyPassword(credentials.password as string, user.password))) {
          throw new CredentialsSignin("Invalid credentials")
        }
        return user
      }
    })
  ]
})
