import { secondsToTime, timeToSeconds } from "@/src/utils/math"
import { trpc } from "@/trpc/client"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { NumberInput } from "@heroui/number-input"
import { useEffect, useRef, useState } from "react"

const tickInterval = 200

interface TaskInputProps {
  working: boolean
  setWorking: (working: boolean) => void
}

export function TaskInput(props: TaskInputProps) {
  const { working, setWorking } = props
  const [task, setTask] = useState("")
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [formErrors, setFormErrors] = useState({
    task: false,
    time: false
  })
  const [tick, setTick] = useState<number>(0)
  const taskWrittenRef = useRef(false)
  const mutation = trpc.writeTask.useMutation()

  useEffect(() => {
    if (!working || tick === 0) return

    const interval = setInterval(() => {
      if (tick === 0) return
      setTick(prev => prev - 1)
    }, tickInterval)

    return () => clearInterval(interval)
  }, [hours, minutes, mutation, task, tick, working])

  useEffect(() => {
    if (working && tick === 0 && !taskWrittenRef.current) {
      mutation.mutate({ task, hours, minutes })
      taskWrittenRef.current = true
    }
  }, [hours, minutes, mutation, task, tick, working])

  function onStart() {
    if (task.length === 0) {
      setFormErrors(prev => ({ ...prev, task: true }))
    } else if (hours === 0 && minutes === 0) {
      setFormErrors(prev => ({ ...prev, time: true }))
    } else {
      setTick(timeToSeconds(hours, minutes) - 1)
      setWorking(true)
    }
  }

  function onStop() {
    setWorking(false)
    setTick(0)
    taskWrittenRef.current = false
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

  function countdown(tick: number) {
    const { hours, minutes, seconds } = secondsToTime(tick)
    return `${hours} : ${minutes} : ${seconds}`
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <h1 className="flex basis-1 text-4xl md:text-5xl text-white">
        {working ? task : "One Task at a Time"}
      </h1>
      <div className="flex basis-20 flex-col lg:flex-row w-full justify-center items-center gap-1">
        {!working && (
          <>
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
          </>
        )}
        {working && <p className="text-4xl text-white">{countdown(tick)}</p>}
      </div>
      <Button
        size="md"
        variant="solid"
        color="default"
        onPress={() => (working ? onStop() : onStart())}
        className={`basis-10 ${working ? "buttonRed" : "buttonGreen"}`}
      >
        <p className="label">{working ? "Stop" : "Start"}</p>
      </Button>
    </div>
  )
}
