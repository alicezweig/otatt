import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: number
    email: string
    password: string
  }
  
  interface Session {
    user: User & DefaultSession["user"]
  }
}