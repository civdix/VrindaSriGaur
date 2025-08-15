"use client"

import Link from "next/link"
import { useScroll, useTransform } from "framer-motion"
import { useSimpleTheme } from "@/components/simple-theme"
import DarkOceanCanvas from "@/components/backgrounds/dark-ocean-canvas"

// Glass UI for 404
function NotFoundCard() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[40vw] h-[40vh] flex flex-col items-center justify-center rounded-2xl border-2 border-pink/30 bg-black/10 backdrop-blur-md shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-black">Page Not Found</h1>
        <Link
          href="https://www.vrindasrigaur.me"
          className="px-6 py-2 bg-gray/20 border-2 border-gray/40 text-black rounded-lg hover:bg-white/30 transition"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  )
}

// This must be the default export for Next.js 404
export default function NotFound() {
  const { theme, mounted } = useSimpleTheme()
  const isDark = mounted ? theme === "dark" : true

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -80])

  return (
    <div className="relative h-[100svh] w-full overflow-hidden" id="hero">
      {/* Background */}
      <div className="absolute inset-0 z-[5]">
        {mounted && isDark ? (
          <DarkOceanCanvas moonScale={0.24} riseDuration={7} xRatio={0.48} yRatio={0.38} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50" />
        )}
      </div>

      {/* Glass 404 card */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <NotFoundCard />
      </div>
    </div>
  )
}
