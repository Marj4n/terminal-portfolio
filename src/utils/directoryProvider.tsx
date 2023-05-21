import React, { useEffect, useState } from "react"
import directory from "@/data/data-directory.json"

interface Props {
  children: React.ReactNode
}

export const DirectoryContext = React.createContext<{
  directory: string
  setDirectory: (dir: string) => void
}>({
  directory: directory.default,
  setDirectory: () => {},
})

let setCurrentDirectory: (dir: string) => void

export const setDirectory = (dir: string) => {
  localStorage.setItem("directory", dir)
  setCurrentDirectory(dir)
}

export const DirectoryProvider: React.FC<Props> = ({ children }) => {
  const [currentDirectory, _setCurrentDirectory] = useState<string>(
    directory.default
  )

  useEffect(() => {
    const savedDirectory = localStorage.getItem("directory")
    setDirectory(savedDirectory || directory.default)
    _setCurrentDirectory(savedDirectory || directory.default)
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
