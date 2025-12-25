import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import Analytics from '@/components/Analytics'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://inspir.uk'),
  title: {
    default: 'inspir - AI Study Platform with 15 Tools | 14-Day Free Trial',
    template: '%s | inspir'
  },
  description: 'Revolutionary AI study platform powered by Claude. Get instant help with math, science, essays, and more. 15 study tools including quiz generator, flashcards, Pomodoro timer. Start your 14-day free trial today.',
  keywords: [
    'AI tutor',
    'study platform',
    'homework help',
    'quiz generator',
    'flashcards',
    'study timer',
    'math solver',
    'AI education',
    'online learning',
    'student tools'
  ],
  authors: [{ name: 'inspir Team' }],
  creator: 'inspir',
  publisher: 'inspir',

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },

  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://inspir.uk',
    siteName: 'inspir',
    title: 'inspir - AI Study Platform with 15 Tools',
    description: 'Revolutionary AI study platform powered by Claude. 15 integrated tools for students. Start your 14-day free trial.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'inspir AI Study Platform'
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'inspir - AI Study Platform',
    description: 'Revolutionary AI study platform with 15 tools. 14-day free trial.',
    images: ['/og-image.jpg'],
    creator: '@inspiruk',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://inspir.uk',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
          <Footer />
          <CookieConsent />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
