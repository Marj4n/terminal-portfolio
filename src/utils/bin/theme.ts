import Themes from "@/data/themes.json"

export const theme = async (
  args: string[],
  callback: (value: string) => string
): Promise<string> => {
  if (args.length === 0) {
    return `Usage: theme [arg]
Args:
  - ls: list all themes
  - set: set a theme
  - random: set a random theme

Example: 
  theme ls # to list all themes
  theme set Gruvbox # to set a theme`
  }

  switch (args[0]) {
    case "ls":
      let result = Themes.map((theme) => theme.name.toLowerCase()).join(", ")
      result += "\n\n"

      return result
    case "set":
      const selectedTheme = args[1]

      return callback(selectedTheme)
    case "random":
      const randomTheme = Themes[Math.floor(Math.random() * Themes.length)]

      return callback(randomTheme.name.toLowerCase())
  }

  return `Unknown argument '${args[0]}'.`
}
