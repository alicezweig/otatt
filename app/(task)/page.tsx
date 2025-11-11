"use client"

import { Link } from "@heroui/react"
import { useState } from "react"
import { TaskInput } from "./TaskInput"
import { TaskWorking } from "./TaskWorking"

export default function Task() {
  const [task, setTask] = useState("")
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [working, setWorking] = useState(false)

  return (
    <div className="relative flex size-full p-1 md:p-4 bg-zinc-900">
      <div className="absolute top-3 left-3">
        {!working && (
          <Link href="/log" className="text-white text-2xl" underline="hover">
            Log
          </Link>
        )}
      </div>
      {!working ? (
        <TaskInput
          task={task}
          hours={hours}
          minutes={minutes}
          working={working}
          setTask={setTask}
          setHours={setHours}
          setMinutes={setMinutes}
          setWorking={setWorking}
        />
      ) : (
        <TaskWorking
          task={task}
          hours={hours}
          minutes={minutes}
          setWorking={setWorking}
        />
      )}
    </div>
  )
}
