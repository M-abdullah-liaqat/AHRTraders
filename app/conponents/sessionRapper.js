"use client"
import { SessionProvider } from "next-auth/react"
function sessionRapper({children}) {

  return (
    <SessionProvider>
        { children }
    </SessionProvider>
  )
}

export default sessionRapper
