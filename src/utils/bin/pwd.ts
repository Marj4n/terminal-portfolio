export const pwd = async (): Promise<string> => {
  const currentDir = localStorage.getItem("directory")
  if (!currentDir) {
    return "No directory found"
  }
  return currentDir
}
