import React from "react"
import { GetStaticProps } from "next"
import Link from "next/link"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/api"
import { PostType } from "@/types/post"
import { format, parseISO } from "date-fns"

type IndexProps = {
  posts: PostType[]
}

export const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <Layout>
      <h1>Home Page</h1>
      <p>Next.js starter for your next blog or personal site. Built with:</p>
      <ul className="my-6 list-disc pl-4">
        <li>
          <a
            href={"https://nextjs.org/"}
            className="text-gray-900 dark:text-white"
          >
            Next.js
          </a>
        </li>
        <li className="mt-2">
          <a
            href={"https://www.typescriptlang.org/"}
            className="text-gray-900 dark:text-white"
          >
            Typescript
          </a>
        </li>
        <li className="mt-2">
          <a
            href={"https://mdxjs.com/"}
            className="text-gray-900 dark:text-white"
          >
            MDX
          </a>
        </li>
        <li className="mt-2">
          <a
            className="text-gray-900 dark:text-white"
            href={"https://tailwindcss.com/"}
          >
            Tailwind CSS
          </a>
        </li>
        <li className="mt-2">
          <a
            className="text-gray-900 dark:text-white"
            href={"https://ui.shadcn.com/"}
          >
            Shadcn
          </a>
        </li>
      </ul>

      <Link
        className="mr-6"
        href="https://github.com/Marjannnnnn/nextjs-typescript-mdx-blog-starter"
      >
        <Button
          variant="default"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Get the source code!
        </Button>
      </Link>
      <Link href="/posts/create">
        <Button variant="outline">Create Post</Button>
      </Link>

      {posts.map((post) => (
        <article key={post.slug} className="mt-12">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {format(parseISO(post.date!), "MMMM dd, yyyy")}
          </p>
          <h1 className="mb-2 text-xl">
            <Link
              as={`/posts/${post.slug}`}
              href={`/posts/[slug]`}
              className="text-gray-900 dark:text-white dark:hover:text-blue-400"
            >
              {post.title}
            </Link>
          </h1>
          <p className="mb-3">{post.description}</p>
          <p>
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              Read More
            </Link>
          </p>
        </article>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["date", "description", "slug", "title"])

  return {
    props: { posts },
  }
}

export default Index
