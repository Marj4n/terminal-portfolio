import { getQuote } from "@/api"

import * as cow from "cowsay-browser"

export const cowsay = async (args: string[]): Promise<string> => {
  let output = ""

  switch (args[0]) {
    case "":
    case undefined:
      return cow.say({
        text: "Usage: cowsay [arg] || cowsay quote. Example: cowsay hello",
      })

    case "quote":
      const quote = (await getQuote()).quote
      return cow.say({ text: quote })

    default:
      output = args.join(" ")
      return cow.say({ text: output })
  }
}
