export interface DirectoryItem {
  type: string
  name: string
  contents?: Record<string, DirectoryItem>
  content: string
}
