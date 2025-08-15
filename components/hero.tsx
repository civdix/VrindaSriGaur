"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowDown } from 'lucide-react'
import { useSimpleTheme } from "@/components/simple-theme"
import DarkOceanCanvas from "@/components/backgrounds/dark-ocean-canvas"
import SakuraLayer from "./sakura-layer"

const poem = `I was lying in my comfort zone\n
Giggling- Shivering adversely\n
All about height above crests\n
Defending with the shadows\n
Of course, of that mist\n
Which is not actually beauty\n
Between astonishingly deep\n
But something in it is trying to be proven\n
In that free verse rhyme\n
Together with rhyming scheme\n
Looking with that endangering emitting\n
In that high above deed\n
Giggling - Shivering adversely\n
Forgotten about that comforting\n
It was “I”`

export default function Hero() {
  const { theme, mounted } = useSimpleTheme()
  const isDark = mounted ? theme === "dark" : true

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -80])

  return (
    <div className="relative h-[100svh] w-full overflow-hidden" id="hero">
      {/* Moon + ocean canvas ABOVE petals but BELOW content */}
      <SakuraLayer count={10} className="absolute inset-0 z-[9] pointer-events-none" />
      <div className="absolute inset-0 z-[5]">
        {mounted && isDark ? (
          <DarkOceanCanvas moonScale={0.24} riseDuration={7} xRatio={0.48} yRatio={0.38} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50" />
        )}
      </div>

      {/* Petals now behind moon */}

      {/* Foreground content on top */}
      <div className="relative z-[10] mx-auto flex h-full max-w-7xl items-center px-4">
        <motion.div style={{ y }} className="grid w-full gap-10 md:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">{"I'M DREAMING OF"}</p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">A Createch Visionary</h1>
            <p className="mt-4 text-balance text-muted-foreground">
              Tech Enthusiast & Creative Mind | B-Tech Pursuing | E-commerce Listing Pro | Canva Graphic Designer | Published Poet | Part-time Chemistry Teacher | Social Media Expert | Guidance Counselor
            </p>
            <motion.p className="mt-4 text-lg font-medium" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
Where Creativity Meets Technology 
             </span>
            </motion.p>

            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-pink-300 dark:ring-indigo-300">
                <Image
                  src="/images/vrinda-portrait.jpg"
                  alt="Portrait of Vrinda Sri Gaur"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
              </div>
              <Button asChild className="group">
                <a href="#about" aria-label="Explore about section">
                  <span>Explore</span>
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Styled Poem panel */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={cn(
              "relative max-h-[70vh] overflow-hidden rounded-2xl border shadow-lg",
              isDark ? "bg-background/40" : "bg-background/70"
            )}
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-pink-200/50 dark:ring-indigo-300/35" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-pink-200/30 blur-2xl dark:bg-indigo-500/15" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-amber-200/30 blur-2xl dark:bg-fuchsia-500/15" />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl opacity-50 dark:opacity-15 mix-blend-luminosity"
              style={{ backgroundImage: "url(/images/poem-banner.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="relative max-h-[60vh] overflow-y-auto hide-scrollbar p-6 md:p-8 pl-10">
              <figcaption className="font-serif text-2xl">Poem</figcaption>
              <p className="mt-3 first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-serif first-letter:leading-[0.85] italic text-lg leading-relaxed">
                {poem.split("\n").map((line, index) => (
                  <span key={index} className="block">
                    {line.trim()}
                  </span> ))}
              </p>
            </div>
          </motion.figure>
        </motion.div>
      </div>
    </div>
  )
}
