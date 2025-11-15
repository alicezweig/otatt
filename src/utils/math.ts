export function timeToSeconds(hours: number, minutes: number) {
  return hours * 60 * 60 + minutes * 60
}

export function secondsToTime(countdown: number) {
  const hours = Math.floor(countdown / 3600)
  const minutes = Math.floor((countdown % 3600) / 60)
  const seconds = countdown % 60
  return { hours, minutes, seconds }
}