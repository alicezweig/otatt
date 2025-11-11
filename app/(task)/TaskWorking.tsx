import { Button } from "@heroui/button"
import { useEffect, useState } from "react"

interface TaskWorkingProps {
  task: string
  hours: number
  minutes: number
  setWorking: (working: boolean) => void
}

export function TaskWorking(props: TaskWorkingProps) {
  const { task, hours, minutes, setWorking } = props
  const [countdown, setCountdown] = useState({
    hours: hours,
    minutes: minutes,
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

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <div className="flex flex-col w-full justify-center items-center gap-10">
        <p className="text-4xl text-white">{task}</p>
        <div>
          <p className="text-4xl text-white">
            {countdown.hours} : {countdown.minutes} : {countdown.seconds}
          </p>
        </div>
        <Button
          size="md"
          variant="solid"
          color="default"
          onPress={() => setWorking(false)}
          className={"bg-red-900 hover:bg-red-800"}
        >
          <p className="label">Stop</p>
        </Button>
      </div>
    </div>
  )
}
