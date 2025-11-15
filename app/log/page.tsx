import { HydrateClient, trpc } from "@/trpc/server"
import { Link } from "@heroui/link"
import { Suspense } from "react"
import Log from "./Log"
import { ErrorBoundary } from "react-error-boundary"

export default function GetLogEntries() {
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
