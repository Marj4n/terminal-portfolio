import React, { useEffect } from "react"
import Head from "next/head"
import { Layout } from "@/components/layout"

import "@/styles/global.css"
import { DirectoryProvider } from "@/utils/directoryProvider"
import { ShellProvider } from "@/utils/shellProvider"
import { ThemeProvider } from "@/utils/themeProvider"

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onClickAnywhere = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    localStorage.setItem("visitedAt", new Date().toString())
  }, [])

  return (
    <ThemeProvider>
      <ShellProvider>
        <DirectoryProvider>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
              key="viewport"
            />
            <title>Marjan | Terminal</title>
          </Head>

          <Layout onClick={onClickAnywhere}>
            <Component {...pageProps} inputRef={inputRef} />
          </Layout>
        </DirectoryProvider>
      </ShellProvider>
    </ThemeProvider>
  )
}

export default App
