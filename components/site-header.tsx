'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Feather, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useSimpleTheme } from '@/components/simple-theme'

const nav = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#poetry', label: 'Poetry' },
  { href: '#awards', label: 'Awards' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader() {
  const { theme, toggle, mounted } = useSimpleTheme()
  const isDark = mounted ? theme === 'dark' : true

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
            onClick={toggle}
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
                <Button variant="secondary" onClick={toggle} className="mt-2">
                  {isDark ? 'Light mode' : 'Dark mode'}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
