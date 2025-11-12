import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { NumberInput } from "@heroui/number-input"
import { useEffect, useState } from "react"

interface TaskInputProps {
  working: boolean
  setWorking: (working: boolean) => void
}

interface Countdown {
  hours: number
  minutes: number
  seconds: number
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
  const [countdown, setCountdown] = useState<Countdown>({
    hours: 0,
    minutes: 0,
    seconds: 59
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          clearInterval(interval)
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function onStart() {
    if (task.length === 0) {
      setFormErrors(prev => ({ ...prev, task: true }))
    } else if (hours === 0 && minutes === 0) {
      setFormErrors(prev => ({ ...prev, time: true }))
    } else {
      setCountdown(prev => ({ ...prev, hours, minutes }))
      setWorking(!working)
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
        {working && (
          <p className="text-4xl text-white">
            {countdown.hours} : {countdown.minutes} : {countdown.seconds}
          </p>
        )}
      </div>
      <Button
        size="md"
        variant="solid"
        color="default"
        onPress={() => onStart()}
        className={`basis-10 ${working ? "buttonRed" : "buttonGreen"}`}
      >
        <p className="label">{working ? "Stop" : "Start"}</p>
      </Button>
    </div>
  )
}
