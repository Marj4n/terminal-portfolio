import React from "react"
import Link from "next/link"

import ThemeSwitch from "./ThemeSwitch"
import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"

const Navigation = (): JSX.Element => {
  return (
    <div className="mx-auto max-w-5xl px-8">
      <div className="flex items-center justify-between py-6">
        <nav>
          <Link className="py-4 pr-6 text-gray-900 dark:text-white" href="/">
            Home
          </Link>
          <Link
            className="px-6 py-4 text-gray-900 dark:text-white"
            href="/about"
          >
            About
          </Link>
        </nav>
        <nav className="flex items-center space-x-1">
          <Link
            href={"https://github.com/Marjannnnnn"}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
                className: "text-gray-900 dark:text-white",
              })}
            >
              <Icons.gitHub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={"https://www.instagram.com/__kevnnn_/"}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
                className: "text-gray-900 dark:text-white",
              })}
            >
              <Icons.instagram className="h-5 w-5 fill-current" />
              <span className="sr-only">Instagram</span>
            </div>
          </Link>
          <ThemeSwitch />
        </nav>
      </div>
    </div>
  )
}

export default Navigation
