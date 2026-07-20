import type { Metadata } from 'next'
import { DM_Sans, Crimson_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import Sidebar from '@/components/Sidebar'
import './globals.css'

const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`

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
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
        <div className="flex flex-col md:h-screen md:flex-row">
          <Sidebar />
          <div className="min-w-0 flex-1 overflow-auto">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
