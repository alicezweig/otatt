"use client"
import {use} from 'react'


export default function Log({logPromise}) {
  const logEntries = use(logPromise)
  return <div>
    {logEntries.map((logEntry, index) => (
      <div key={index}>
        <h1>{logEntry.task}</h1>
        <p>{logEntry.hours} hours and {logEntry.minutes} minutes</p>
      </div>
    ))}
  </div>
}