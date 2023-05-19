import React, { useEffect, useState } from "react"
import { useTheme } from "@/utils/themeProvider"

export const Ps1 = () => {
  const [hostname, setHostname] = useState("")
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window !== undefined) {
      setHostname(window.location.hostname)
    }
  }, [])

  return (
    <div>
      <span
        style={{
          color: theme.green,
        }}
      >
        guest@{hostname}
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        :
        <span
          style={{
            color: theme.yellow,
          }}
        >
          ~
        </span>
        $
      </span>
    </div>
  )
}

export default Ps1
