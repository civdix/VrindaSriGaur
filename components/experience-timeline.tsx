"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Palette, BookOpenText, Sparkles } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const items = [
    {
    icon: Briefcase,
    title: "AI Engineer Intern — Bunny Creations",
    period: "06/2025 – Present",
    link:"https://bunnycreations.co.in/",
    points: [
      "Being a AI Engineer I Developed AI-driven features for e-commerce platform",
      "Developed and deployed AI Agents for Automations",
      "Worked on Real State AI Agent from Customer Lead generation to Sales and Report",
      "Business Strategist for eCommerce listings across Shopify, Etsy, Alibaba, eBay, Amazon, and Myntra",
      "Gives Consultation on Ecommerce support to multiple clients",
    ],
  },
  {
    icon: Briefcase,
    title: "Career & Mental Health Counsellor — Happy Faces",
    period: "01/2024 – Present",
    link:"https://happyfaces.com",
    points: [
      "Collaborated with dev and UX teams to apply emotional design",
      "Guided 50+ students/professionals on career & stress management",
      "Mentored on communication and conflict resolution in high‑pressure teams",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Designer & Digital Marketing Expert — EydaHome",
    period: "09/2022 – 08/2023",
    link:"https://eydahomes.com/",
    points: [
      "Led UI/UX, styling & customization; +25% UX & performance",
      "Managed Shopify, Etsy, Alibaba, eBay, Amazon, Myntra, Walmart, Wayfair",
      "SEO and listings optimization driving +30% traffic & sales",
      "As a Digital Marketing Expert Scale the Sell of the Company not only in India but in USA"
    ],
  },
  {
    icon: BookOpenText,
    title: "Computer Science Tutor — Hub Of Mentors/Freelance",
    period: "03/2021 – 08/2022",
    link:"#",
    points: [
      "Taught Python, DSA, OOPs (Grades 9–12, boards & prep)",
      "Mentored 80+ learners on tech opportunities and skill paths",
    ],
  },
  {
    icon: GraduationCap,
    title: "B.Tech (CSE, Cybersecurity) — AKTU",
    link:"#",
    period: "2022 – 2026",
    points: ["Honours program, GPA 8+; focus on security & systems"],
  },
]

export default function ExperienceTimeline() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="font-serif text-3xl">Experience & Academics</h2>
      <div className="mt-8 space-y-6">
        {items.map((it, idx) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, x: idx % 2 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Card className="group border-l-4 border-l-pink-300 dark:border-l-indigo-400 transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-pink-300/60 dark:hover:ring-indigo-400/60">
              <CardContent className="grid gap-3 p-6 md:grid-cols-[auto_1fr]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-700 transition-colors dark:bg-indigo-900/50 dark:text-indigo-200 group-hover:bg-pink-200 group-hover:dark:bg-indigo-800/60">
                  <it.icon role='image' aria-label={it.title.substring(0,10)+"..."} className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <span className="text-sm text-muted-foreground">{it.period}</span>
                  </div>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                    {it.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
         <a className='bg-card text-card-foreground rounded-xl border px-2 py-1 shadow-sm group border-l-4 border-l-pink-300 dark:border-l-indigo-400 transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-pink-300/60 dark:hover:ring-indigo-400/60' href={it.link?it.link:"#"}>Link</a>

              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Sparkles className="h-4 w-4" />
          <span>{"I have 4+ Years of Experience in Ecommerce operations from Shopify, Wordpress and multiple microservices"}</span>
        </motion.div>
      </div>
    </div>
  )
}
