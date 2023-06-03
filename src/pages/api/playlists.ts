import type { NextApiRequest, NextApiResponse } from "next"
import { getPlaylists } from "@/lib/spotify"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getPlaylists()
  const { items } = await response.json()

  const playlists = items.map((playlist: any) => ({
    name: playlist.name,
    cover: playlist.images[0].url,
    playlistUrl: playlist.external_urls.spotify,
    owner: playlist.owner.display_name,
    tracks: playlist.tracks.total,
  }))

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  )

  return res.status(200).json({ playlists })
}
