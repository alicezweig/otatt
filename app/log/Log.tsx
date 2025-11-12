"use client"

import { Link } from "@heroui/link"
import { use } from "react"

const logEntries = [
  {
    task: "Task 1",
    hours: 1,
    minutes: 1
  },
  {
    task: "Task 2",
    hours: 2,
    minutes: 2
  }
]

// TODO connect drizzle schema top trpc zod to here

interface LogProps {
  logEntries: Promise<Array<{ id: number; task: string; hours: number; minutes: number }>>
}

export default function Log(props: LogProps) {
  const { logEntries } = props
  const entries = use(logEntries)

  return (
    <div className="flex flex-col size-full p-1 md:p-3 gap-3">
      <div className="">
        <Link href="/" className="text-white text-2xl" underline="hover">
          Home
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        {entries.map((logEntry, index) => (
          <div key={index} className="grid w-fit grid-flow-col grid-cols-5 gap-1">
            <p className="col-span-1">{index + 1}.</p>
            <h1 className="col-span-8">{logEntry.task}</h1>
            <p className="col-span-4">
              {logEntry.hours} hours, {logEntry.minutes} minutes
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
