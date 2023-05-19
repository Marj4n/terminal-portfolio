import React from "react"
import { History } from "@/components/history"
import { Input } from "@/components/input"
import config from "@/data/config.json"
import { useShell } from "@/utils/shellProvider"
import { useTheme } from "@/utils/themeProvider"

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const { history } = useShell()
  const { theme } = useTheme()

  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [history, inputRef])

  return (
    <div
      className="h-full overflow-hidden rounded"
      style={{
        borderColor: theme.yellow,
        padding: config.border ? 16 : 8,
        borderWidth: config.border ? 2 : 0,
      }}
    >
      <div ref={containerRef} className="h-full overflow-y-auto">
        <History history={history} />

        <Input inputRef={inputRef} containerRef={containerRef} />
      </div>
    </div>
  )
}

export default IndexPage
