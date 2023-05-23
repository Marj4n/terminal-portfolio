import figlet, { Fonts, Options } from "figlet"

export const ascii = async (args: string[]): Promise<string> => {
  const [font, ...textArr] = args
  const text = textArr.join(" ")
  console.log(font)

  if (text === "listfonts") {
    return "standard, 3d, 3d2"
  }

  if (!text && !font) {
    return `Usage: ascii [font] [text]. Example: ascii 3d hello
      Use 'ascii listfonts' to list all fonts.`
  }

  let selectedFont: Fonts
  switch (font) {
    case "3d":
      selectedFont = "Larry 3D"
      break
    case "3d2":
      selectedFont = "Isometric3"
      break
    default:
      selectedFont = "Standard"
      break
  }

  try {
    const fontOptions: Options = {
      font: selectedFont,
      horizontalLayout: "default",
      verticalLayout: "default",
    }

    const asciiText = await new Promise<string>((resolve, reject) => {
      figlet.text(text || font, fontOptions, (err, data) => {
        if (err) {
          console.error(err)
          reject(err)
        } else if (data) {
          console.log(data)
          resolve(data)
        } else {
          reject("Failed to generate ASCII art")
        }
      })
    })

    return asciiText
  } catch (err) {
    console.error(err)
    return "Failed to generate ASCII art"
  }
}
