'use client'

import { useEffect, useRef } from 'react'

type Options = {
  moonScale?: number
  riseDuration?: number
  xRatio?: number // 0..1; horizontal (0=left, 1=right)
  yRatio?: number // 0..1; vertical (0=top, 1=bottom)
}

export default function DarkOceanCanvas({
  moonScale = 0.24,
  riseDuration = 7,
  xRatio,
  yRatio,
}: Options) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

    const moonImg = new Image()
    moonImg.crossOrigin = 'anonymous'
    moonImg.decoding = 'async'
    let moonReady = false
    moonImg.onload = () => {
      moonReady = moonImg.naturalWidth > 0 && moonImg.naturalHeight > 0
    }
    moonImg.src = '/images/moon-texture.jpg'
    if (moonImg.complete && moonImg.naturalWidth > 0) {
      moonReady = true
    }

    function fit() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    function resize() {
      const parent = canvas.parentElement
      if (parent) {
        const rect = parent.getBoundingClientRect()
        canvas.style.width = rect.width + 'px'
        canvas.style.height = rect.height + 'px'
      }
      fit()
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 170 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.5,
      r: Math.random() * 1.1 + 0.25,
      tw: Math.random() * Math.PI * 2,
    }))

    const tStart = performance.now()
    let raf = 0
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)

    function draw(now: number) {
      const t = (now - tStart) / 1000
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const horizon = Math.floor(h * 0.56)
      const bigR = Math.max(w, h) * 2.2

      // Placement: near the middle
      const isWide = w >= 1024
      const chosenX = typeof xRatio === 'number' ? xRatio : (isWide ? 0.48 : 0.5)
      const clampedX = Math.min(0.85, Math.max(0.15, chosenX))
      const chosenY = typeof yRatio === 'number' ? yRatio : 0.38
      const clampedY = Math.min(0.85, Math.max(0.15, chosenY))
      const moonX = w * clampedX
      const R = Math.min(w, h) * moonScale

      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, horizon)
      sky.addColorStop(0, '#050814')
      sky.addColorStop(1, '#0a1030')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, horizon)

      // Global glow
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const gy = h * clampedY
      let globalGlow = ctx.createRadialGradient(moonX, gy, R * 0.8, moonX, gy, bigR)
      globalGlow.addColorStop(0.0, 'rgba(255,255,255,0.10)')
      globalGlow.addColorStop(0.35, 'rgba(255,255,255,0.05)')
      globalGlow.addColorStop(0.7, 'rgba(255,255,255,0.02)')
      globalGlow.addColorStop(1.0, 'rgba(255,255,255,0.00)')
      ctx.fillStyle = globalGlow
      ctx.fillRect(0, 0, w, horizon)

      // Softer horizon haze
      const haze = ctx.createLinearGradient(0, horizon - 24, 0, horizon + 24)
      haze.addColorStop(0, 'rgba(255,255,255,0.02)')
      haze.addColorStop(0.5, 'rgba(255,255,255,0.05)')
      haze.addColorStop(1, 'rgba(255,255,255,0.02)')
      ctx.fillStyle = haze
      ctx.fillRect(0, horizon - 24, w, 48)
      ctx.restore()

      // Stars
      for (const s of stars) {
        const alpha = 0.55 + 0.45 * Math.sin(s.tw + t * 1.4)
        ctx.globalAlpha = 0.6 * alpha
        ctx.fillStyle = '#cfd6ff'
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * horizon, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Ocean
      const sea = ctx.createLinearGradient(0, horizon, 0, h)
      sea.addColorStop(0, '#0b1640')
      sea.addColorStop(1, '#08102a')
      ctx.fillStyle = sea
      ctx.fillRect(0, horizon, w, h - horizon)

      // Moon position (gentle bob only)
      reduceMotion // just to keep tree-shaking from removing it accidentally
      const riseP = 1
      easeOutCubic(riseP)
      const baseY = h * clampedY
      const bob = Math.sin(t * 0.3) * 1.5
      const moonY = baseY + bob

      // Halos
      const haloInner = R * 2.2
      const haloOuter = R * 4.2
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      let grad = ctx.createRadialGradient(moonX, moonY, R * 0.4, moonX, moonY, haloInner)
      grad.addColorStop(0.0, 'rgba(255,255,255,0.10)')
      grad.addColorStop(1.0, 'rgba(255,255,255,0.00)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(moonX, moonY, haloInner, 0, Math.PI * 2)
      ctx.fill()
      grad = ctx.createRadialGradient(moonX, moonY, haloInner * 0.9, moonX, moonY, haloOuter)
      grad.addColorStop(0.0, 'rgba(255,255,255,0.04)')
      grad.addColorStop(1.0, 'rgba(255,255,255,0.00)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(moonX, moonY, haloOuter, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Moon disk + texture
      ctx.save()
      ctx.beginPath()
      ctx.arc(moonX, moonY, R, 0, Math.PI * 2)
      ctx.clip()
      const tone = ctx.createRadialGradient(moonX - R * 0.15, moonY - R * 0.1, R * 0.25, moonX, moonY, R)
      tone.addColorStop(0, '#ffffff')
      tone.addColorStop(0.55, '#f2f4f8')
      tone.addColorStop(1, '#e1e5ea')
      ctx.fillStyle = tone
      ctx.fillRect(moonX - R, moonY - R, R * 2, R * 2)

      if (moonReady) {
        const aspect = moonImg.width / moonImg.height || 1
        let imgW = R * 2
        let imgH = imgW / aspect
        if (imgH < R * 2) {
          imgH = R * 2
          imgW = imgH * aspect
        }
        const sx = moonX - imgW / 2
        const sy = moonY - imgH / 2
        ctx.globalAlpha = 0.35
        ctx.globalCompositeOperation = 'multiply'
        ctx.drawImage(moonImg, sx, sy, imgW, imgH)
        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
      }
      const rim = ctx.createRadialGradient(moonX, moonY, R * 0.65, moonX, moonY, R)
      rim.addColorStop(0, 'rgba(0,0,0,0)')
      rim.addColorStop(1, 'rgba(0,0,0,0.14)')
      ctx.fillStyle = rim
      ctx.fillRect(moonX - R, moonY - R, R * 2, R * 2)
      ctx.restore()

      // IMPORTANT: No horizon occlusion — nothing draws over the moon.

      // Water glow
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const bigWaterGlow = ctx.createRadialGradient(moonX, moonY + R * 0.2, R, moonX, moonY + R * 0.2, bigR)
      bigWaterGlow.addColorStop(0.0, 'rgba(255,255,255,0.06)')
      bigWaterGlow.addColorStop(0.5, 'rgba(255,255,255,0.03)')
      bigWaterGlow.addColorStop(1.0, 'rgba(255,255,255,0.00)')
      ctx.fillStyle = bigWaterGlow
      ctx.fillRect(0, horizon, w, h - horizon)
      ctx.restore()

      // Specular columns
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const columns = 30
      const baseWidth = (w * 0.32) / columns
      for (let i = 0; i < columns; i++) {
        const dist = Math.abs(i - columns / 2) / (columns / 2)
        const falloff = 1 - dist
        const jitter = Math.sin(t * 0.8 + i * 0.7) * 1.8
        const x = moonX - (columns / 2 - i) * baseWidth * 0.92 + jitter
        const widthCol = baseWidth * (0.8 + 0.4 * falloff)
        const top = Math.max(horizon + 4, moonY + R * 0.1)
        const alpha = 0.13 * falloff
        ctx.fillStyle = `rgba(210, 220, 255, ${alpha.toFixed(3)})`
        ctx.fillRect(x, top, widthCol, h - top - 8)
      }
      ctx.restore()

      // Foreground wave layers
      function waveLayer(yOff: number, amp: number, freq: number, speed: number, color: string, alpha = 0.35) {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 2) {
          const y =
            horizon +
            yOff +
            Math.sin((x * freq + t * 140 * speed) * 0.01) * amp +
            Math.cos((x * freq * 0.7 + t * 90 * speed) * 0.01) * amp * 0.6
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.globalAlpha = alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }
      waveLayer(6, 8, 0.9, 0.8, '#0e1a48', 0.40)
      waveLayer(18, 12, 1.2, 0.6, '#0c163f', 0.30)
      waveLayer(32, 16, 1.6, 0.5, '#0a1336', 0.24)

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [moonScale, riseDuration, xRatio, yRatio])

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
}
