"use strict"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const NotFoundPage = () => {
  const router = useRouter()
  const count = 3
  const [secondsLeft, setSecondsLeft] = useState(count)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1)
    }, 1000)

    if (secondsLeft === 0) {
      clearInterval(interval)
      router.push("/")
    }

    return () => clearInterval(interval)
  }, [router, secondsLeft])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="ml-2">
        Redirecting to home page in {secondsLeft} seconds...
      </p>
    </div>
  )
}

export default NotFoundPage
