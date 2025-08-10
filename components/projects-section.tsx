"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

type Project = {
  key: string
  name: string
  blurb: string
  tech: string[]
  image: string
  details: string
  link?: string
}

const projects: Project[] = [
  {
    key: "shrinveda",
    name: "ShrinVeda — Online Library",
    blurb: "Study materials + notices for B.Tech students",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript", "REST APIs"],
    image: "/study-library-ui.png",
    details:
      "A clean library for accessing semester-wise notes, notices, and resources. Roadmap includes AI features for mock tests, interviews, and personalized mentorship.",
  },
  {
    key: "wanderwise",
    name: "Wanderwise — Travel Booking",
    blurb: "MERN full-stack for destination booking & itineraries",
    tech: ["MongoDB", "Express", "React", "Node", "Auth", "Payments"],
    image: "/placeholder-9ypta.png",
    details:
      "Explore, plan, and book trips with secure authentication, responsive UI, and transaction workflows.",
  
    },
  {
    key: "rozgarnow",
    name: "RozgarNow — Local Services",
    blurb: "Connect skilled workers with clients in real time",
    tech: ["MERN", "Notifications", "Reviews", "Secure Payments"],
    image: "/local-services-marketplace.png",
    details:
      "Real-time matching, verified profiles, user reviews, and payment integrations for trust and scale.",
      link: "https://rozgaar-now.vercel.app/",
    },
]

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="font-serif text-3xl">Projects</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.button
            key={p.key}
            className="text-left"
            onClick={() => setActive(p)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group h-full overflow-hidden transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-pink-300/60 dark:hover:ring-indigo-400/60">
              <CardHeader className="p-0">

                {p.link?<iframe src={p.link} className="h-40 w-full" />:<img src={p.image || "/placeholder.svg"} alt={`${p.name} preview`} className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
           }   </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                <div className="my-3  flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              {p.link &&  <a className="bg-gradient-to-r from-purple-600 ml-2 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out cursor-pointer" target="_blank" href={p.link}>Demo</a>}
              </CardContent>

            </Card>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{active?.name}</DialogTitle>
            <DialogDescription>{active?.blurb}</DialogDescription>
          </DialogHeader>
          {active && (
            <div className="space-y-3">
              <img
                src={active.image || "/placeholder.svg"}
                alt={`${active.name} large preview`}
                className="aspect-video w-full rounded-md object-cover"
              />
              <p className="text-sm text-muted-foreground">{active.details}</p>
              <div className="flex flex-wrap gap-2">
                {active.tech.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
