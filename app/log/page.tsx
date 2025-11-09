import { Suspense } from "react"
import { server } from "../index"
import Log from "./Log"

export default async function GetLogEntries() {
  // const logEntries = await server.getTaskList.query()
  
  const logEntriesPromise = server.getTaskList.query()
  
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Log logPromise={logEntriesPromise} />
      </Suspense>
    </div>
  )
}
