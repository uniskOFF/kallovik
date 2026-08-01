import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { LanguageProvider } from '@/components/language-provider'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
})

export const metadata: Metadata = {
  title: {
    default: 'AESBAU Labs — Премиальная разработка цифровых решений',
    template: '%s | AESBAU Labs',
  },
  description:
    'AESBAU Labs создаёт сайты, Telegram-ботов, автоматизацию и AI-интеграции для бизнеса. Современные цифровые решения для роста и развития.',
  generator: 'AESBAU Labs',
  keywords: [
    'разработка сайтов',
    'Telegram-боты',
    'автоматизация бизнеса',
    'AI-интеграции',
    'цифровые решения',
    'веб-разработка',
    'digital-студия',
    'AESBAU',
  ],
  authors: [{ name: 'AESBAU Labs' }],
  creator: 'AESBAU Labs',
  publisher: 'AESBAU Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    title: 'AESBAU Labs — Премиальная разработка цифровых решений',
    description:
      'AESBAU Labs создаёт сайты, Telegram-ботов, автоматизацию и AI-интеграции для бизнеса.',
    url: 'https://aesbau.dev',
    siteName: 'AESBAU Labs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AESBAU Labs — Премиальная разработка цифровых решений',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AESBAU Labs — Премиальная разработка цифровых решений',
    description:
      'AESBAU Labs создаёт сайты, Telegram-ботов, автоматизацию и AI-интеграции для бизнеса.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://aesbau.dev',
  },
  category: 'technology',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AESBAU Labs',
  },
  applicationName: 'AESBAU Labs',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#05080f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background font-sans antialiased">
        <LanguageProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}