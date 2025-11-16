"use client"
import { Link } from "@heroui/react"
import { useState } from "react"
import { TaskInput } from "./TaskInput"

export function Task() {
  const [working, setWorking] = useState(false)

  return (
    <div className="relative flex size-full p-1 md:p-3">
      <div className="absolute top-3 left-3">
        {!working && (
          <Link href="/log" className="text-white text-2xl" underline="hover">
            Log
          </Link>
        )}
      </div>
      <TaskInput working={working} setWorking={setWorking} />
    </div>
  )
}
