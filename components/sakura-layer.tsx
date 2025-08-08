'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

type Props = {
  count?: number
  lightModeBoost?: boolean
  className?: string
}

export default function SakuraLayer({ count = 28, lightModeBoost = false, className }: Props) {
  const petals = useMemo(
    () =>
      Array.from({ length: count + (lightModeBoost ? 12 : 0) }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 9 + Math.random() * 7,
        delay: Math.random() * 10,
        size: 18 + Math.random() * 16,
        drift: (Math.random() - 0.5) * 40,
        rotate: Math.random() * 360,
      })),
    [count, lightModeBoost]
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {petals.map((p) => (
        <motion.img
          key={p.id}
          src="/images/sakura-petal.png"
          alt=""
          aria-hidden="true"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            filter: lightModeBoost ? 'brightness(1.05)' : 'brightness(0.9)',
            opacity: lightModeBoost ? 1 : 1,
          }}
          className="absolute -top-10"
      initial={{ y: '-10vh', x: 0, rotate: p.rotate }}
animate={{ y: '60vh', x: p.drift, rotate: p.rotate + 180 }}

          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
