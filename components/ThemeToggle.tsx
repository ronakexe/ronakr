'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    function sync() {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') {
        setTheme(stored)
      } else {
        setTheme(media.matches ? 'dark' : 'light')
      }
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null
    if (favicon) favicon.href = next === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg'
  }

  // Home page only.
  if (pathname !== '/') return null

  return (
    <>
      {/* Mobile: an in-flow bar above the name/clover row, not a fixed
          overlay — its height is real document height so the page can be
          scrolled up into it. beforeInteractive renders this Script at its
          JSX position (verified via the existing theme-init script above
          PageShell) and runs it as the browser parses that far, so the bar
          above it is already laid out — a plain React-rendered <script>
          won't reliably fire since hydration doesn't execute scripts it
          didn't parse natively. MOBILE_BAR_HEIGHT must match h-12 below. */}
      <div className="flex h-12 items-center justify-center md:hidden">
        {theme !== null && (
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 cursor-pointer items-center justify-center text-[var(--text)]"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        )}
      </div>
      <Script id="mobile-toggle-scroll" strategy="beforeInteractive">
        {`(function(){try{if(window.innerWidth<768){window.scrollTo(0,${MOBILE_BAR_HEIGHT});}}catch(e){}})();`}
      </Script>

      {/* Desktop: a fixed hot-zone in the page's top-right margin (the same
          empty gutter the clover icon already sits beside, so it never
          overlaps it) reveals the toggle on hover — invisible until the
          mouse comes near. */}
      {theme !== null && (
        <div className="group fixed right-0 top-0 z-50 hidden h-24 w-16 items-start justify-center pt-4 md:flex">
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 cursor-pointer items-center justify-center text-[var(--text)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--name)]"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      )}
    </>
  )
}

// px — kept in sync with the mobile bar's h-12 class above.
const MOBILE_BAR_HEIGHT = 48

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <circle cx="8.5" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="8.5" y1="0.5" x2="8.5" y2="2.3" />
        <line x1="8.5" y1="14.7" x2="8.5" y2="16.5" />
        <line x1="0.5" y1="8.5" x2="2.3" y2="8.5" />
        <line x1="14.7" y1="8.5" x2="16.5" y2="8.5" />
        <line x1="2.99" y1="2.99" x2="4.26" y2="4.26" />
        <line x1="12.74" y1="12.74" x2="14.01" y2="14.01" />
        <line x1="2.99" y1="14.01" x2="4.26" y2="12.74" />
        <line x1="12.74" y1="4.26" x2="14.01" y2="2.99" />
      </g>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <path
        d="M15 10.1c-.9.4-1.9.6-2.9.6-4 0-7.2-3.2-7.2-7.2 0-1 .2-2 .6-2.9C2.7 1.9.5 4.7.5 8c0 4 3.2 7.2 7.2 7.2 3.3 0 6.1-2.2 7.3-5.1z"
        fill="currentColor"
      />
    </svg>
  )
}
