import { getQuote } from "@/api"

import * as cow from "cowsay-browser"

export const cowsay = async (args: string[]): Promise<string> => {
  let output = ""

  if (args.length < 1 || args[0] === "") {
    return cow.say({
      text: "Usage: cowsay [arg] || cowsay quote. Example: cowsay hello",
    })
  } else if (args[0] === "quote") {
    const quote = (await getQuote()).quote
    return cow.say({ text: quote })
  } else {
    output = args.join(" ")
    return cow.say({ text: output })
  }
}
