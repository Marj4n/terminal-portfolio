import { getMainColor } from "@/api"
import directory from "@/data/data-directory.json"
import { DirectoryItem } from "@/interfaces/directory"
import get from "lodash/get"

import { formatDir } from "../formatDir"

export const ls = async (): Promise<string> => {
  const currentDir = localStorage.getItem("directory")

  if (!currentDir) {
    return "No directory found"
  }

  const formattedDir = formatDir(currentDir)
  const targetDirectory = (get(directory, formattedDir) as DirectoryItem) || {}

  // Generate the directory listing
  const contents = Object.values(targetDirectory.contents || {})

  const mainColor = getMainColor()

  const listDir = `total ${contents.length + 2}
drwxr-xr-x 1 root root 4096 May 19 16:28 <span style="color: ${mainColor}">.</span>
drwxr-xr-x 1 root root 4096 May 19 16:28 <span style="color: ${mainColor}">..</span>
${contents
  .map((item: DirectoryItem) => {
    if (item.type === "directory") {
      return `-rw-r--r-- 1 root root  147 May 19 16:28 <span style="color: ${mainColor}">${item.name}</span>`
    } else {
      return `-rw-r--r-- 1 root root  147 May 19 16:28 ${item.name}`
    }
  })
  .join("\n")}
`

  return listDir
}
