import fs from "fs"
import path from "path"

export default async function upload(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  } else {
    try {
      const { file } = req.body

      // get the file content from the request body
      const content = file.content

      // create a unique file name based on the title
      const fileName = `${file.title.toLowerCase().replace(/\s+/g, "-")}.mdx`

      // define the path where the file will be saved
      const filePath = path.join(process.cwd(), "src/posts", fileName)

      // create the file and write the content to it
      fs.writeFileSync(filePath, content)

      res.status(200).json({ message: `File ${fileName} created successfully` })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error creating file" })
    }
  }
}
