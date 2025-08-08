"use client"

import { motion } from "framer-motion"
import { Code2, Store, PenTool, Database, Cloud, Boxes, Github, Rocket, Book, BookOpen, CloudCog, Network } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const groups = [
  {
    title: "Programming Languages",
    icon: Code2,
    items: ["Python", "Java", "C", "JavaScript"],
  },
  {
    title: "Frontend Development",
    icon: BookOpen,
    items: ["HTML", "CSS", "Bootstrap", "React", "MERN (in progress)", "Flutter & Dart (learning)"],
  },
  {
    title: "Cloud & DevOps",
    icon: CloudCog,
    items: ["AWS", "Cloud Computing", "Git", "Docker", "Github", "Vercel"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["MySQL", "MongoDB"],
  },
  {
    title: "E-commerce & CMS Tools",
    icon: Store,
    items: ["Shopify", "Wordpress", "Odoo", "Wiz", "Etsy", "Alibaba", "Amazon", "Myntra", "Walmart", "Wayfair", "SEO"],
  },
  {
    title: "Design & Creativity",
    icon: PenTool,
    items: ["UI/UX", "Figma", "Canva", "Branding", "Content Design", "Poetry"],
  },
]


export default function SkillsShowcase() {
  return (
    <div className="mx-auto max-w-6xl px-4 ">
      <h2 className="font-serif text-3xl ">Skills Showcase</h2>
<div className="mt-8 columns-1 sm:columns-2 md:columns-3 gap-4">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
  className="mb-4 break-inside-avoid"
          >
            <Card className="group">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-md bg-pink-100 p-2 text-pink-600 transition group-hover:rotate-6 dark:bg-indigo-900/50 dark:text-indigo-200">
                  <g.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{g.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="text-sm text-muted-foreground transition group-hover:text-foreground">
                      {it}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Boxes className="h-4 w-4" />
        <span>Yes I have crafted some magic from with my diary.</span>
        <BookOpen onClick={()=>{window.location.href="https://www.yourquote.in/vrinda-gaur-bmgmg/quotes"}} className="h-4 w-4" />
        <Rocket className="h-4 w-4" />
      </div>
    </div>
  )
}
