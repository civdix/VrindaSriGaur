import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import { SimpleThemeProvider } from '@/components/simple-theme'

export const metadata: Metadata = {
  title: 'Vrinda Sri Gaur — AI Engineer | Poet | Digital Marketing Expert',
  description:
    "Vrinda Sri Gaur — Tech Visionary & Creative Mind | B.Tech CSE (Cybersecurity) | E-commerce Ops Strategist | UI/UX Designer | Social Media Expert | Published Poet & Educator",
  keywords: [
    'Vrinda Sri Gaur',
    'Createch Visionary',
    'Tech Enthusiast',
    'AI Engineer',
    'UI/UX Designer',
    'E-commerce',
    'Cybersecurity',
    'Poet',
    'Career Counselor',
    'Social Media Expert',
    'Portfolio',
    'India',
    'IT Women',
    'Vrinda Sri Gaur'
  ],
  authors: [{ name: 'Vrinda Sri Gaur', url: 'https://www.vrindasrigaur.me' }],
  metadataBase: new URL('https://www.vrindasrigaur.me'),
  openGraph: {
    type: 'website',
    url: 'https://www.vrindasrigaur.me',
    title: 'Vrinda Sri Gaur | Createch Visionary | Engineer & Poet',
    description:
      'Merging technology with creativity — B.Tech (CSE, Cybersecurity) student with experience in E-commerce Ops, UI/UX Design, Mentorship, and Published Poetry.',
    siteName: 'Vrinda Sri Gaur',
    images: [
      {
        url: 'https://www.vrindasrigaur.me/images/vrinda-portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Vrinda Sri Gaur Portrait',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vrinda Sri Gaur | Createch Visionary | Engineer & Poet',
    description:
      'Tech + Creativity | E-commerce Ops | UI/UX Designer | Published Poet | Counselor | Social Media Expert.',
    images: ['https://www.vrindasrigaur.me/images/vrinda-portrait.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon-192x192.png',
  },
alternates: {
  canonical: 'https://www.vrindasrigaur.me',
},

  verification: {
    other: {
      me: [
        'https://linkedin.com/in/vrinda-sri-gaur',
        'https://instagram.com/@__vrindiii__',
        'https://www.yourquote.in/vrinda-gaur-bmgmg/quotes',
      ],
    },
  },
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
<script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://www.vrindasrigaur.me/#person",
        "name": "Vrinda Sri Gaur",
        "url": "https://www.vrindasrigaur.me",
        "image": "https://www.vrindasrigaur.me/images/vrinda-portrait.jpg",
        "jobTitle": [
          "AI Engineer Intern",
          "UI/UX Designer",
          "E-commerce Specialist",
          "Poet",
          "Career & Mental Health Counselor",
          "Part-time Chemistry Teacher"
        ],
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
          "sameAs": "https://aktu.ac.in/"
        },
        "worksFor": [
          {
            "@type": "Organization",
            "name": "Bunny Creations",
            "sameAs": "https://bunnycreations.com/"
          },
          {
            "@type": "Organization",
            "name": "Happy Faces"
          },
          {
            "@type": "Organization",
            "name": "EydaHome"
          }
        ],
        "knowsAbout": [
          "Cybersecurity",
          "Artificial Intelligence",
          "UI/UX Design",
          "E-commerce Operations",
          "SEO",
          "Poetry",
          "Mentorship"
        ],
        "email": "mailto:vrinaxz@gmail.com",
        "telephone": "+91-7017287836",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "India"
        },
        "sameAs": [
          "https://linkedin.com/in/vrinda-sri-gaur",
          "https://instagram.com/@__vrindiii__",
          "https://www.yourquote.in/vrinda-gaur-bmgmg/quotes"
        ],
        "award": [
          "District-Level Gold Medalist — AI for Business (2024)",
          "Navomesh AIdea Challenge — AI-powered E-commerce Tool (2025)"
        ],
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "Engineer",
            "description": "AI Engineer & Cybersecurity Enthusiast"
          },
          {
            "@type": "Occupation",
            "name": "Poet",
            "description": "Published poet with works on YourQuote"
          }
        ]
      }),
    }}
  />

      </head>
      <body className={`${playfair.variable} ${poppins.variable} font-sans`}>
        <SimpleThemeProvider>
          {children}
        </SimpleThemeProvider>
      </body>
    </html>
  )
}
