import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import { SimpleThemeProvider } from '@/components/simple-theme'

export const metadata: Metadata = {
  title: 'Vrinda Sri Gaur — Portfolio',
  description: 'Where Technology Meets Poetry',
    generator: 'v0.dev'
}

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const poppins = Poppins({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-poppins' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                var t = localStorage.getItem('theme');
                var isDark = t ? t === 'dark' : true;
                if (isDark) document.documentElement.classList.add('dark');
              } catch(e) {}
            })();
          `,
          }}
        />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${poppins.variable};
  --font-mono: ${GeistMono.variable};
  --font-serif: ${playfair.variable};
}
        `}</style>
      </head>
      <body className={`${playfair.variable} ${poppins.variable} font-sans`}>
        <SimpleThemeProvider>
          {children}
        </SimpleThemeProvider>
      </body>
    </html>
  )
}
