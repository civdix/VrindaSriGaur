'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type Ctx = { theme: Theme; toggle: () => void; set: (t: Theme) => void; mounted: boolean }

const SimpleThemeContext = createContext<Ctx>({
  theme: 'dark',
  toggle: () => {},
  set: () => {},
  mounted: false,
})

export function SimpleThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = (localStorage.getItem('theme') as Theme) || 'dark'
      setTheme(saved)
      document.documentElement.classList.toggle('dark', saved === 'dark')
    } catch {}
    setMounted(true)
  }, [])

  const set = (t: Theme) => {
    setTheme(t)
    try {
      localStorage.setItem('theme', t)
    } catch {}
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  const toggle = () => set(theme === 'dark' ? 'light' : 'dark')

  return (
    <SimpleThemeContext.Provider value={{ theme, toggle, set, mounted }}>
      {children}
    </SimpleThemeContext.Provider>
  )
}

export function useSimpleTheme() {
  return useContext(SimpleThemeContext)
}
