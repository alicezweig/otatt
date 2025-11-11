import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { NumberInput } from "@heroui/number-input"
import { useState } from "react"

interface TaskInputProps {
  task: string
  hours: number
  minutes: number
  working: boolean
  setTask: (task: string) => void
  setHours: (hours: number) => void
  setMinutes: (minutes: number) => void
  setWorking: (working: boolean) => void
}

export function TaskInput(props: TaskInputProps) {
  const { task, hours, minutes, working, setTask, setHours, setMinutes, setWorking } = props
  const [formErrors, setFormErrors] = useState({
    task: false,
    time: false
  })

  function onStart() {
    if (task.length === 0) {
      setFormErrors(prev => ({ ...prev, task: true }))
    } else if (hours === 0 && minutes === 0) {
      setFormErrors(prev => ({ ...prev, time: true }))
    } else {
      setWorking(true)
    }
  }

  function onTaskInputChange(value: string) {
    setTask(value)
    setFormErrors(prev => ({ ...prev, task: false }))
  }

  function onHoursInputChange(value: number) {
    setHours(value)
    setFormErrors(prev => ({ ...prev, time: false }))
  }

  function onMinutesInputChange(value: number) {
    setMinutes(value)
    setFormErrors(prev => ({ ...prev, time: false }))
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <h1 className="text-4xl md:text-5xl text-white">One Task at a Time</h1>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-1">
        <Input
          className="w-full lg:w-60"
          classNames={{
            inputWrapper: "inputWrapper",
            label: "label",
            input: "input"
          }}
          label="What is your task?"
          value={task}
          onValueChange={onTaskInputChange}
          isInvalid={formErrors.task}
        />
        <NumberInput
          classNames={{
            base: "baseNumberInput",
            inputWrapper: "inputWrapper",
            label: "label",
            input: "input"
          }}
          minValue={0}
          maxValue={24}
          label="Hours"
          value={hours}
          onValueChange={onHoursInputChange}
          isInvalid={formErrors.time}
        />
        <NumberInput
          classNames={{
            base: "baseNumberInput",
            inputWrapper: "inputWrapper",
            label: "label",
            input: "input"
          }}
          minValue={0}
          maxValue={59}
          label="Minutes"
          value={minutes}
          onValueChange={onMinutesInputChange}
          isInvalid={formErrors.time}
        />
      </div>
      <Button
        size="md"
        variant="solid"
        color="default"
        isDisabled={working}
        onPress={() => onStart()}
        className={"bg-green-700 hover:bg-green-500"}
      >
        <p className="label">Start</p>
      </Button>
    </div>
  )
}
