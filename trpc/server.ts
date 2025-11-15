import { appRouter, createCallerFactory, createTRPCContext } from "@/trpc/index"
import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { cache } from "react"
import "server-only"; // <-- ensure this file cannot be imported from the client
import { makeQueryClient } from "./query-client"

export const getQueryClient = cache(makeQueryClient)
const caller = createCallerFactory(appRouter)(createTRPCContext)

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
)
