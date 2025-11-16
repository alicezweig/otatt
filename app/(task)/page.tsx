import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Task } from "./Task"

export default async function Page() {
  // const session = await auth()
  // if (!session?.user) {
  //   redirect("/signin")
  // }
  return <Task />
}