"use client"
import { getQueryClient, getUrl, trpc } from "@/trpc/client"
import { HeroUIProvider } from "@heroui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/react-query"
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // transformer: superjson, <-- if you use a data transformer
          url: getUrl()
        })
      ]
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>{children}</HeroUIProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
