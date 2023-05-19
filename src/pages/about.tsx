import React from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export const About = (): JSX.Element => {
  const { toast } = useToast()
  return (
    <Layout
      customMeta={{
        title: "About - Marjannnnnn",
      }}
    >
      <h1>About Page</h1>
      <p>Welcome to the about page</p>
      <h2 className="pb-4">This is toast :</h2>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Scheduled: Catch up ",
            description: new Date().toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })
        }}
      >
        Add to calendar
      </Button>
    </Layout>
  )
}

export default About
