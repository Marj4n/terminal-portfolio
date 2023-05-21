import config from "@/data/config.json"
import themes from "@/data/themes.json"
import axios from "axios"

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`
  )

  return data
}

export const getWeather = async (city: string) => {
  const { data } = await axios.get(`https://wttr.in/${city}?ATm`)

  return data
}

export const getQuote = async () => {
  const { data } = await axios.get("https://api.quotable.io/random")

  return {
    quote: `“${data.content}” — ${data.author}`,
  }
}

export const getPlatform = (): "Unknown" | "Windows" | "MacOS" | "Linux" => {
  let os: "Unknown" | "Windows" | "MacOS" | "Linux" = "Unknown"

  if (navigator.userAgent.indexOf("Win") != -1) {
    os = "Windows"
  }

  if (navigator.userAgent.indexOf("Mac") != -1) {
    os = "MacOS"
  }

  if (navigator.userAgent.indexOf("Linux") != -1) {
    os = "Linux"
  }

  return os
}

export const getMainColor = () => {
  const platform = getPlatform()
  const themeName = localStorage.getItem("theme")
  const theme = themes.find((theme) => theme.name.toLowerCase() === themeName)
  console.log(theme)

  switch (platform) {
    case "MacOS":
      return theme?.cyan
    case "Windows":
      return theme?.blue
    case "Linux":
      return theme?.red
  }
}
