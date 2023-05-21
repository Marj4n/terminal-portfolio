import { getWeather } from "../../api"
import { isMobile } from "../isMobile"

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join("+")

  if (isMobile()) {
    setTimeout(function () {
      window.open(`https://www.google.com/search?q=weather+${city}`, "_self")
    }, 1000)
    return "Opening google weather..."
  }

  if (!city) {
    return "Usage: weather [city]. Example: weather casablanca"
  }

  const weather = await getWeather(city)

  return weather
}
