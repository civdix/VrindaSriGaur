"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <motion.div
        className="relative rounded-3xl border bg-background/60 p-8 shadow-sm backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
<div
  className="absolute inset-0 rounded-3xl ring-1 ring-pink-200/50 dark:ring-indigo-300/40 pointer-events-none"
  aria-hidden="true"
/>        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl">About Me</h2>
            <p className="mt-4 text-muted-foreground">
              {"I merge technology with creativity—building products, visual stories, and experiences. As a B.Tech (CSE, Cybersecurity) student with hands-on work across UI/UX, e‑commerce operations, and mentorship, I craft solutions that are empathetic, scalable, and user‑obsessed. I’m also a published poet and part‑time educator—because code and verses can both move people."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">E‑commerce Product Ops</Badge>
              <Badge variant="secondary">UI/UX & Branding</Badge>
              <Badge variant="secondary">Poetry & Storytelling</Badge>
              <Badge variant="secondary">Guidance & Mentorship</Badge>
              <Badge variant="secondary">Createch Visionary</Badge>
            </div>
          </div>
          <Card>
            <CardContent className="space-y-2 p-4 text-sm">
              <p><strong>Links:</strong> <a href="https://www.linkedin.com/in/vrinda-sri-gaur" target="_blank" rel="noreferrer">
  <Badge variant="outline" className="cursor-pointer underline">
    LinkedIn
  </Badge>
</a></p>
              <p><strong>Mobile:</strong> +917017287836</p>
              <p><strong>Mail:</strong> <a className="underline" href="mailto:vrinaxz@gmail.com">vrinaxz@gmail.com</a></p>
              <p><strong>Location:</strong> India</p>
              <p className="text-muted-foreground">
                {"Languages: English, Hindi — professional proficiency or above"}
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
