import { createTRPCClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../server"


export const server = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000"
    })
  ]
})

