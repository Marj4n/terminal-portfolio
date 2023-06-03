import type { NextApiRequest, NextApiResponse } from "next"
import { getUser } from "@/lib/spotify"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getUser()
  const { display_name, images } = await response.json()

  const user = {
    name: display_name,
    avatar: images[0].url,
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  )

  return res.status(200).json({ user })
}
