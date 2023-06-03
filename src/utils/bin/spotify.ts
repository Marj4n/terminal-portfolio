import { getSpotifyTopTracks } from "@/api"
import { Track } from "@/interfaces/tracks"

export const spotify = async (args: string[]): Promise<string> => {
  switch (args[0]) {
    case "top":
      const response: Track[] = await getSpotifyTopTracks()

      if (Array.isArray(response) && response.length > 0) {
        return response
          .map(
            (track: Track, index: number) =>
              `<div style="display: flex;">1. <img src="${track.cover}" style="width: 50px; margin-right:10px;"/><div style="display: flex; flex-direction: column;"><a href="${track.songUrl}"><strong>${track.title}</strong></a><span>${track.artist}</span></div></div>`
          )
          .join("\n")
      } else {
        return "No top tracks found"
      }
    
    case "playlists":
    default:
      return `Usage: spotify [arg]. Example: spotify top
Type 'spotify ls' to see all available commands.`
  }
}
