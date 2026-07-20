'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
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
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="transition-opacity"
      style={{ opacity: theme === null ? 0 : 1 }}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

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
