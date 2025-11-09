"use client"

import { Input } from "@heroui/input"
import { NumberInput } from "@heroui/number-input"
import { useState } from "react"

export default function Task() {
  const [task, setTask] = useState("")
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)

  return (
    <div className="flex size-full p-1 md:p-4 bg-zinc-900">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <h1 className="text-4xl md:text-5xl text-white">One Task at a Time</h1>
        <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-1">
          <Input
            classNames={{
              input: "input",
              inputWrapper: "inputWrapper",
              innerWrapper: "innerWrapper",
              label: "label"
            }}
            className="w-full lg:w-60"
            label="What is your task?"
            value={task}
            onValueChange={value => setTask(value)}
          />
          <NumberInput
            classNames={{
              base: "baseNumberInput",
              input: "input",
              inputWrapper: "inputWrapper",
              innerWrapper: "innerWrapper",
              label: "label",
              stepperWrapper: "stepperWrapper"
            }}
            minValue={0}
            maxValue={24}
            label="Hours"
            value={hours}
            onValueChange={setHours}
          />
          <NumberInput
            classNames={{
              base: "baseNumberInput",
              input: "input",
              inputWrapper: "inputWrapper",
              innerWrapper: "innerWrapper",
              label: "label",
              stepperWrapper: "stepperWrapper"
            }}
            minValue={0}
            maxValue={59}
            label="Minutes"
            value={minutes}
            onValueChange={setMinutes}
          />
        </div>
      </div>
    </div>
  )
}
