import * as React from "react"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const CreatePost = ({}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")
  const [content, setContent] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const postUrl = title.toLowerCase().replace(/\s+/g, "-")

    const fileContent = `---
title: ${title}
description: ${description}
date: "${new Date().toISOString().split("T")[0]}"
---

${content}
    `
    const data = {
      file: {
        title: title,
        content: fileContent,
      },
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        toast({
          title: `Post ${title} has been created.`,
          description: "You can view it now.",
          action: (
            <ToastAction
              altText="View"
              onClick={() => {
                setTimeout(() => {
                  router.push(`/`)
                }, 3000)
              }}
            >
              View all posts
            </ToastAction>
          ),
        })
      } else if (process.env.NODE_ENV === "production" && !response.ok) {
        // the feature is only available in development mode
        toast({
          title: "An error occurred.",
          description:
            "The feature is only available in development mode. plese clone the project and run it locally.",
          variant: "destructive",
        })
      } else {
        throw new Error("Network response was not ok.")
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setTitle("")
      setDescription("")
      setContent("")
      setLoading(false)
    }
  }

  return (
    <Layout>
      <h1>
        Create Post <Separator />
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter your title post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <Label htmlFor="desctiption">Description</Label>
          <Input
            id="description"
            type="text"
            placeholder="Enter your description post"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Enter your content post"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <br />
        {!loading ? (
          <Button type="submit">Create Post</Button>
        ) : (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        )}
      </form>
    </Layout>
  )
}

export default CreatePost
