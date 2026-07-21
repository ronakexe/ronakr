import type { Metadata } from 'next'
import { DM_Sans, EB_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import Header from '@/components/Header'
import './globals.css'

const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
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
    <html lang="en" className={`${dmSans.variable} ${ebGaramond.variable}`}>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
