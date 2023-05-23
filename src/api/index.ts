import config from "@/data/config.json"
import themes from "@/data/themes.json"
import { db } from "@/lib/firebase"
import axios from "axios"
import {
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore"

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`
  )

  return data
}

export const getGithubFollowers = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}`
  )

  return data.followers
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

export const getVisitorCount = async () => {
  const countDocRef = doc(collection(db, "visitors"), "count")

  try {
    const countDocSnapshot = await getDoc(countDocRef)
    if (countDocSnapshot.exists()) {
      const count = countDocSnapshot.data().count
      return count
    } else {
      return "Visitor count not available"
    }
  } catch (error) {
    console.error("Error fetching visitor count:", error)
  }
}

export const incrementVisitorCount = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Visitor count increment is only allowed in production mode.")
    return
  }

  const countDocRef = doc(collection(db, "visitors"), "count")
  console.log("Incrementing visitor count...")

  try {
    const countDocSnapshot = await getDoc(countDocRef)

    if (countDocSnapshot.exists()) {
      await updateDoc(countDocRef, { count: increment(1) })
      console.log("Visitor count incremented successfully.")
    } else {
      await setDoc(countDocRef, { count: 1 })
      console.log("Created count document with initial count of 1.")
    }
  } catch (error) {
    console.error("Error incrementing visitor count:", error)
  }
}
