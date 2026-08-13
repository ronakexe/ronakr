import type { Metadata } from 'next'
import { DM_Sans, EB_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import PageShell from '@/components/PageShell'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}var resolved=t==='light'||t==='dark'?t:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var link=document.querySelector('link[rel="icon"]');if(link)link.href=resolved==='dark'?'/favicon-dark.svg':'/favicon-light.svg';}catch(e){}})();`

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ronakramnani.com'),
  title: 'Ronak Ramnani',
  description: 'Personal portfolio of Ronak Ramnani',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon-light.svg',
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
        <ThemeToggle />
        <PageShell>{children}</PageShell>
        <Analytics />
      </body>
    </html>
  )
}
