\`\`\`tsx
// components/site-header.tsx
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Feather, Menu } from 'lucide-react'
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#poetry", label: "Poetry" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === "dark" : true

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="#hero" className="group inline-flex items-center gap-2">
          <Feather className="h-5 w-5 text-pink-500 transition-transform group-hover:-rotate-12" />
          <span className="font-serif text-lg font-bold">Vrinda Sri Gaur</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-foreground">
              {n.label}
            </a>
          ))}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            aria-pressed={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4">
              <div className="mt-8 flex flex-col gap-4">
                {nav.map((n) => (
                  <a key={n.href} href={n.href} className="text-base" aria-label={`Go to ${n.label}`}>
                    {n.label}
                  </a>
                ))}
                <Button variant="secondary" onClick={() => setTheme(isDark ? "light" : "dark")} className="mt-2">
                  {isDark ? "Light mode" : "Dark mode"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
\`\`\`

\`\`\`tsx
// components/hero.tsx
"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import SakuraLayer from "./sakura-layer"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { ArrowDown } from 'lucide-react'

const DarkOceanScene = dynamic(() => import("./three/dark-ocean-scene"), { ssr: false })

const poem = `I was lying in my comfort zone
Giggling- Shivering adversely
All about height above crests
Defending with the shadows
Of course, of that mist
Which is not actually beauty
Between astonishingly deep
But something in it is trying to be proven
In that free verse rhyme;
Together with rhyming scheme
Looking with that endangering emitting
In that high above deed
Giggling - Shivering adversely
Forgotten about that comforting
It was “I”`

export default function Hero() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted ? resolvedTheme === "dark" : true

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -80])

  return (
    <div className="relative h-[100svh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {mounted && isDark ? (
          <DarkOceanScene />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50" />
        )}
      </div>

      {/* Sakura petals overlay (below content, above background) */}
      <SakuraLayer className="z-10" lightModeBoost={!isDark} />

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-4">
        <motion.div style={{ y }} className="grid w-full gap-10 md:grid-cols-2">
          {/* Left: Heading + portrait + CTA */}
          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">{"I'M DREAMING OF A"}</p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">{"Createch Visionary"}</h1>
            <p className="mt-4 text-balance text-muted-foreground">
              {"Tech Enthusiast & Creative Mind | B-Tech Pursuing | E-commerce Listing Pro | Canva Graphic Designer | Published Poet | Part-time Chemistry Teacher | Social Media Expert | Guidance Counselor"}
            </p>
            <motion.p
              className="mt-4 text-lg font-medium"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className={cn("inline-block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent")}>
                {"Where Technology Meets Poetry"}
              </span>
            </motion.p>

            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-pink-300 dark:ring-indigo-300">
                <Image
                  src="/images/vrinda-portrait.jpg"
                  alt="Portrait"
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
              "relative max-h-[70vh] overflow-y-auto rounded-2xl border shadow-lg",
              isDark ? "bg-background/40" : "bg-background/70",
            )}
          >
            {/* Decorative ring and soft glows */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-pink-200/60 dark:ring-indigo-300/40" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-pink-200/40 blur-2xl dark:bg-indigo-500/20" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-amber-200/40 blur-2xl dark:bg-fuchsia-500/20" />

            {/* Subtle banner as background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl opacity-20 mix-blend-luminosity"
              style={{ backgroundImage: "url(/images/poem-banner.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
            />

            <blockquote className="relative space-y-4 p-6 md:p-8">
              <figcaption className="font-serif text-2xl">{"Poem"}</figcaption>
              <p className="first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-serif first-letter:leading-[0.85] italic text-lg leading-relaxed">
                {poem}
              </p>
            </blockquote>
          </motion.figure>
        </motion.div>
      </div>
    </div>
  )
}
\`\`\`

\`\`\`tsx
// components/sakura-layer.tsx
import { useMemo } from "react"
import * as THREE from "three"

type Props = {
  count?: number
  lightModeBoost?: boolean
  className?: string
}

export default function SakuraLayer({ count = 24, lightModeBoost = false, className }: Props) {
  const petals = useMemo(() => {
    const petalGeometry = new THREE.Shape()
      .moveTo(0, 0)
      .quadraticCurveTo(0.3, 0.3, 0.3, 0.7)
      .quadraticCurveTo(0.3, 1.2, 0, 1.5)
      .quadraticCurveTo(-0.3, 1.2, -0.3, 0.7)
      .quadraticCurveTo(-0.3, 0.3, 0, 0)

    const geometry = new THREE.ExtrudeGeometry(petalGeometry, {
      depth: 0.05,
      bevelEnabled: false,
    })

    const material = new THREE.MeshBasicMaterial({
      color: "#f7c9c9",
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    })

    const petalCount = count + (lightModeBoost ? 12 : 0)

    return Array.from({ length: petalCount }, (_, i) => {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.x = Math.PI / 2
      mesh.rotation.z = Math.random() * Math.PI * 2
      mesh.position.x = Math.random() * 20 - 10
      mesh.position.y = Math.random() * 8
      mesh.position.z = Math.random() * 20 - 10
      mesh.scale.setScalar(0.6 + Math.random() * 0.6)
      return mesh
    })
  }, [count, lightModeBoost])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {petals.map((petal, i) => (
        <Petal key={i} petal={petal} />
      ))}
    </div>
  )
}

function Petal({ petal }: { petal: THREE.Mesh }) {
  return (
    <mesh
      key={petal.uuid}
      geometry={petal.geometry}
      material={petal.material}
      position={petal.position}
      rotation={petal.rotation}
      scale={petal.scale}
    />
  )
}
\`\`\`

\`\`\`tsx
// components/three/dark-ocean-scene.tsx
import * as THREE from "three"
import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Cloud, Sparkles, useGLTF, useTexture } from "@react-three/drei"

function Ocean() {
  const gltf = useGLTF("/models/ocean.glb")
  const texture = useTexture("/images/water-normal.jpg")
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return <primitive object={gltf.scene} material-normalMap={texture} material-color="hotpink" />
}

function Moon() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.position.y = 2.4 + Math.sin(clock.getElapsedTime() * 0.4) * 0.1
    }
  })
  return (
    <group position={[0, 2.4, -6]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial emissive={"#dfe6ff"} emissiveIntensity={1.7} color={"#f2f4ff"} />
      </mesh>
      {/* Halo */}
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial color={"#bfc8ff"} transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

export default function DarkOceanScene() {
  const [seed] = useState(Math.random())
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 55, near: 0.1, far: 100 }}
        style={{ background: "#03050d" }}
      >
        <fog attach="fog" args={["#03050d", 10, 20]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 3, -2]} intensity={0.9} color={"#cdd8ff"} />
        <Moon />
        <Ocean />
        <Cloud seed={seed} opacity={0.4} position={[-4, 1.5, -4]} width={8} depth={4} segments={20} />
        <Cloud seed={seed} opacity={0.4} position={[4, 1.5, -4]} width={5} depth={4} segments={20} />
        <Sparkles size={0.5} scale={[5, 3, 5]} position-y={1} count={30} speed={0.1} />
      </Canvas>
    </div>
  )
}
\`\`\`
