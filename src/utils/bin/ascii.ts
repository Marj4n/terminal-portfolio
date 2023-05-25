import { getQuote } from "@/api"
import figlet, { Fonts, Options } from "figlet"

export const ascii = async (args: string[]): Promise<string> => {
  let output = ""
  let font: Fonts = "Standard" // Default font

  figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" })

  if (args.length < 1 || args[0] === "") {
    return `Usage: ascii [arg] -[font]. Example: ascii hello || ascii hello -Doom
--
Type 'ascii ls' to list all fonts
--`
  } else if (args[0] === "ls") {
    return "Standard, 3D-ASCII, 3D-ASCII, 3x5, Acrobatic, Alligator, Alligator2, Alpha, Alphabet, Avatar, B1FF, Banner, Banner3-D, Banner3, Banner4, Barbwire, Basic, Bear, Bell, Benjamin, Big, Bigfig, Binary, Block, Blocks, Bloody, Bolger, Braced, Bright, Broadway, Bubble, Bulbhead, Caligraphy, Caligraphy2, Cards, Catwalk, Chiseled, Chunky, Coinstak, Cola, Colossal, Computer, Contessa, Contrast, Cosmike, Crawford, Crawford2, Crazy, Cricket, Cursive, Cyberlarge, Cybermedium, Cybersmall, Cygnet, DANC4, Dancing Font, Decimal, Diamond, Digital, Doh, Doom, Double, DWhistled, Electronic, Elite, Epic, Fender, Filter, Flipped, Fuzzy, Georgi16, Georgia11, Ghost, Ghoulish, Glenyn, Goofy, Gothic, Graceful, Gradient, Graffiti, Greek, Heart Left, Heart Right, Hex, Hieroglyphs, Hollywood, ICQ, Impossible, Invita, Isometric1, Isometric2, Isometric3, Isometric4, Italic, Ivrit, Jacky, Jazmine, Jerusalem, Katakana, Kban, Keyboard, Knob, Konto Slant, Konto, LCD, Lean, Letters, Linux, Lockergnome"
  } else {
    // setelah - juga bawa
    const fontFlag = args.find((arg) => arg.startsWith("-"))
    if (fontFlag && fontFlag.length > 1) {
      // bawa yg ada spasinya
      font = fontFlag.slice(1) as Fonts
      args = args.filter((arg) => !arg.startsWith("-"))
    }

    output = args.join(" ")

    return new Promise<string>((resolve, reject) => {
      figlet.text(
        output,
        {
          font: font,
        },
        (err, data) => {
          if (err) {
            console.error(err)
            reject(err)
          } else if (data) {
            console.log(data)
            resolve(data)
          } else {
            reject(new Error("Failed to generate ASCII art"))
          }
        }
      )
    })
  }
}
