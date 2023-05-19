import React from "react"
import { MetaProps } from "@/types/layout"

import Head from "./Head"
import Navigation from "./Navigation"

type LayoutProps = {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const WEBSITE_HOST_URL = "https://nextjs-typescript-mdx-blog.vercel.app"

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
        <Navigation />
      </header>
      <main className="relative ">
        <div className="mx-auto max-w-5xl px-8 py-4">{children}</div>
      </main>
      <footer className="py-8">
        <div className="mx-auto max-w-5xl px-8">
          Built by{" "}
          <a
            className="text-gray-900 dark:text-white"
            href="https://github.com/Marjannnnnn"
          >
            Marjannnnnn
          </a>
        </div>
      </footer>
    </>
  )
}

export default Layout
