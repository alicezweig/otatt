"use client"

import { Suspense } from "react"
import { trpc } from "@/app/trpc"
import Log from "./Log"

export default function GetLogEntries() {
  const logEntries = trpc.getTaskList.useQuery()

  return (
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        {/* <Log logEntries={logEntries} /> */}
      {/* </Suspense> */}
      {logEntries.data?.map(entry => <div>{entry}</div>)}
    </div>
  )
}
