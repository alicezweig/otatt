"use client"

import { trpc } from "@/trpc/client"

// TODO connect drizzle schema top trpc zod to here

export default function Log() {
  const [logEntries] = trpc.getTaskList.useSuspenseQuery()
  
  return (
    <div className="flex flex-col gap-1">
      {logEntries?.map((logEntry, index) => (
        <div key={index} className="grid w-fit grid-flow-col grid-cols-5 gap-1">
          <p className="col-span-1">{index + 1}.</p>
          <h1 className="col-span-8">{logEntry.task}</h1>
          <p className="col-span-4">
            {logEntry.hours} hours, {logEntry.minutes} minutes
          </p>
        </div>
      ))}
    </div>
  )
}
