export const formatDir = (dir) => {
  return dir.split("/").filter(Boolean).join(".contents.")
}
