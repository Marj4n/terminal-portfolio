import React, { useEffect, useState } from "react"
import directory from "@/data/data-directory.json"

interface Props {
  children: React.ReactNode
}

const defaultDirectory = directory.default

export const DirectoryContext = React.createContext<{
  directory: string
  setDirectory: (dir: string) => void
}>({
  directory: defaultDirectory,
  setDirectory: () => {},
})

let setCurrentDirectory: (dir: string) => void

export const setDirectory = (dir: string) => {
  localStorage.setItem("directory", dir)
  setCurrentDirectory(dir)
}

export const DirectoryProvider: React.FC<Props> = ({ children }) => {
  const [currentDirectory, _setCurrentDirectory] =
    useState<string>(defaultDirectory)

  useEffect(() => {
    const savedDirectory = localStorage.getItem("directory")
    setDirectory(savedDirectory || defaultDirectory)
    _setCurrentDirectory(savedDirectory || defaultDirectory)
  }, [])

  setCurrentDirectory = _setCurrentDirectory

  return (
    <DirectoryContext.Provider
      value={{ directory: currentDirectory, setDirectory }}
    >
      {children}
    </DirectoryContext.Provider>
  )
}
