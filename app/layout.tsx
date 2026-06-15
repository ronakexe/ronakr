import type { Metadata } from 'next'
import { DM_Sans, Crimson_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Nav from '@/components/Nav'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
})

export const metadata: Metadata = {
  title: 'Ronak Ramnani',
  description: 'Personal portfolio of Ronak Ramnani',
  openGraph: {
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${crimsonPro.variable}`}>
      <body>
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
