import { getSpotifyPlaylists, getSpotifyTopTracks, getSpotifyUser } from "@/api"
import config from "@/data/config.json"
import { Playlist } from "@/interfaces/playlist"
import { Track } from "@/interfaces/tracks"
import { getUser } from "@/lib/spotify"

export const spotify = async (args: string[]): Promise<string> => {
  switch (args[0]) {
    case "top-song":
      const tracks: Track[] = await getSpotifyTopTracks()

      if (Array.isArray(tracks) && tracks.length > 0) {
        return tracks
          .map(
            (track: Track, index: number) =>
              `<div style="display: flex;">${index + 1}. <img src="${
                track.cover
              }" style="width: 50px; margin-right:10px;"/><div style="display: flex; flex-direction: column;"><a href="${
                track.songUrl
              }"><strong>${track.title}</strong></a><span>${
                track.artist
              }</span></div></div>`
          )
          .join("\n")
      } else {
        return "No top tracks found"
      }
    case "playlist":
      const playlists: Playlist[] = await getSpotifyPlaylists()
      const user: any = await getSpotifyUser()

      if (Array.isArray(playlists) && playlists.length > 0) {
        const filteredPlaylists = playlists.filter(
          (playlist: Playlist) => playlist.owner === user.name
        ) // Ganti "__" dengan nama pemilik yang diinginkan
        if (filteredPlaylists.length > 0) {
          return filteredPlaylists
            .map(
              (playlist: Playlist, index: number) =>
                `<div style="display: flex;">${index + 1}. <img src="${
                  playlist.cover
                }" style="width: 50px; margin-right:10px;"/><div style="display: flex; flex-direction: column;"><a href="${
                  playlist.playlistUrl
                }"><strong>${playlist.name}</strong></a><span>${
                  playlist.tracks
                } songs</span></div></div>`
            )
            .join("\n")
        } else {
          return "No playlists found for the specified owner"
        }
      } else {
        return "No playlists found"
      }
    case "me":
      window.open(`https://open.spotify.com/user/${config.social.spotify}/`)

      return "Opening spotify..."
    case "ls":
      return `me, playlist, top-song`
    default:
      return `Usage: spotify [arg]. Example: spotify top-song
Type 'spotify ls' to see all available commands.`
  }
}
