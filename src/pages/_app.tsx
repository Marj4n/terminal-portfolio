import React from "react"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"

import "@/styles/globals.css"
import { Toaster } from "@/components/ui/toaster"

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  )
}

export default MyApp
