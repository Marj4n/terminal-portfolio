import React, { useEffect, useState } from "react"
import { isMobile } from "@/utils/isMobile"
import { useTheme } from "@/utils/themeProvider"

export const Ps1 = () => {
  const [hostname, setHostname] = useState("")
  const { theme } = useTheme()
  const _isMobile = isMobile()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname)
    }
  }, [])

  if (typeof window === "undefined" || _isMobile) {
    return (
      <div>
        <span
          style={{
            color: theme.green,
          }}
        >
          guest
        </span>
        {">>>"}
      </div>
    )
  }

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
