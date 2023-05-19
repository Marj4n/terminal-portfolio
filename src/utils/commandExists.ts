import * as bin from "./bin"

export const commandExists = (command: string) => {
  const commands = ["clear", "cls", "ls", ...Object.keys(bin)]

  return commands.indexOf(command.split(" ")[0]) !== -1
}
