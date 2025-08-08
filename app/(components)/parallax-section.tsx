"use client"

import { ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxSection({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -60])
  const opacity = useTransform(scrollY, [0, 800], [1, 0.9])

  return (
    <motion.div style={{ y, opacity }}>
      {children}
    </motion.div>
  )
}
