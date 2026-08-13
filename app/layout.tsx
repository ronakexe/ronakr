import type { Metadata } from 'next'
import { DM_Sans, EB_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import PageShell from '@/components/PageShell'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}var resolved=t==='light'||t==='dark'?t:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var link=document.querySelector('link[rel="icon"]');if(link)link.href=resolved==='dark'?'/favicon-dark.svg':'/favicon-light.svg';}catch(e){}})();`

// Mobile home page loads scrolled past the theme-toggle bar, so the reader
// lands on the name/clover like before and only finds the toggle by
// scrolling up (see ThemeToggle.tsx). Waiting for React to mount and correct
// the scroll position would flash the bar first, so this hides the page
// (via a CSS rule keyed on this attribute) the instant parsing reaches this
// script — before the browser paints the mis-scrolled frame at all — and
// ThemeToggle's layout effect removes it once the scroll is fixed. The
// timeout is a safety net so the page can't stay blank if JS fails to load.
//
// scrollRestoration is forced to 'manual' unconditionally (not just on
// mobile/home) because on a reload the browser's default 'auto' restores
// whatever scroll position the page was at before the reload — racing our
// own scrollTo and, depending on timing, winning and putting the reader
// back wherever they last scrolled instead of past the toggle bar.
const SCROLL_HIDE_INIT = `(function(){try{if('scrollRestoration' in window.history){window.history.scrollRestoration='manual';}if(window.location.pathname==='/'&&window.innerWidth<768){document.documentElement.setAttribute('data-mobile-toggle-pending','');setTimeout(function(){document.documentElement.removeAttribute('data-mobile-toggle-pending')},1500);}}catch(e){}})();`

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
        <Script id="scroll-hide-init" strategy="beforeInteractive">
          {SCROLL_HIDE_INIT}
        </Script>
        <ThemeToggle />
        <PageShell>{children}</PageShell>
        <Analytics />
      </body>
    </html>
  )
}
