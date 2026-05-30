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
