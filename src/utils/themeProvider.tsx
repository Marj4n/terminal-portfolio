import React, { useEffect, useState } from "react"
import config from "@/data/config.json"
import Themes from "@/data/themes.json"
import { Theme } from "@/interfaces/theme"

export interface ThemeContextType {
  setTheme: (name: string) => string
  theme: Theme
}

const initialContext: ThemeContextType = {
  setTheme: () => "",
  theme: Themes[0],
}

const ThemeContext = React.createContext<ThemeContextType>(initialContext)

interface Props {
  children: React.ReactNode
}

export const useTheme = () => React.useContext(ThemeContext)

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Themes[0])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    setTheme(
      savedTheme
        ? Themes.find((t) => t.name === savedTheme) || Themes[0]
        : Themes[0]
    )
    handleSetTheme(savedTheme || Themes[0].name)
  }, [])

  const handleSetTheme = (name: string) => {
    const selectedTheme = Themes.find(
      (t) => t.name.toLowerCase() === name.toLowerCase()
    )
    if (selectedTheme) {
      setTheme(selectedTheme)
      localStorage.setItem("theme", selectedTheme.name)
      return `Theme ${selectedTheme.name} set successfully!`
    } else {
      return `Theme '${name}' not found. Try 'theme ls' to see the list of available themes.`
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
