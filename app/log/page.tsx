import { auth } from "@/auth"
import { HydrateClient, trpc } from "@/trpc/server"
import { Link } from "@heroui/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import Log from "./Log"

export default async function GetLogEntries() {
  const session = await auth()
  if (!session?.user) {
    redirect("/signin")
  }
  void trpc.getTaskList.prefetch()

  return (
    <HydrateClient>
      <div className="flex flex-col size-full p-1 md:p-3 gap-3">
        <div className="">
          <Link href="/" className="text-white text-2xl" underline="hover">
            Home
          </Link>
        </div>
        <ErrorBoundary fallback={<div>Error loading log</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <Log />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrateClient>
  )
}
