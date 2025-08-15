"use client"

import { Award, Medal, BadgeIcon as Certificate } from 'lucide-react'
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const awards = [
  {
    icon: Medal,
    title: "District-Level Gold Medalist — AI for Business",
    link:"#",
    date: "12/2024",
    desc: "Awarded for an AI-powered startup plan streamlining e-commerce by Oneclick.",
  },
  {
    icon: Certificate,
    title: "Data Analytics with Python — IIT Roorkee (NPTEL)",
    date: "01/2025 – 04/2025",
    desc: "12-week advanced course focusing on analytics foundations and Python tooling.",
  },
  {
    icon: Award,
    title: "Recommendation — Navomesh AIdea Challenge (VSGAI)",
    date: "2025",
    desc: "AI-powered e-commerce tool for automating listings & marketing (boosting sales up to 80%).",
  },
]

export default function AwardsSection() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="font-serif text-3xl">Awards & Certifications</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {awards.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-md bg-pink-100 p-2 text-pink-600 dark:bg-indigo-900/50 dark:text-indigo-200">
                  <a.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{a.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="outline">{a.date}</Badge>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </CardContent>
         <a  className='bg-card ml-2 w-fit text-card-foreground rounded-xl border px-2 py-1 shadow-sm group border-l-4 border-l-pink-300 dark:border-l-indigo-400 transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-pink-300/60 dark:hover:ring-indigo-400/60' href={a.link?a.link:"#"}>Link</a>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
