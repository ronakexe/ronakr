'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

type Theme = 'light' | 'dark'

const DEFAULT_COLOR = '#150807'

export default function StillsColorPicker() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<Theme | null>(null)
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [pos, setPos] = useState({ x: 24, y: 100 })
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

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
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      media.removeEventListener('change', sync)
      observer.disconnect()
    }
  }, [])

  // Only ever touches the stills section in dark mode — light mode always
  // falls back to the CSS-driven --stills-bg value.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.stills-bg')
    targets.forEach((el) => {
      el.style.backgroundColor = theme === 'dark' ? color : ''
    })
  }, [pathname, color, theme])

  function onNotchPointerDown(e: React.PointerEvent) {
    e.preventDefault()
    dragState.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y }
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragState.current) return
    const { startX, startY, origX, origY } = dragState.current
    setPos({ x: origX + (e.clientX - startX), y: origY + (e.clientY - startY) })
  }

  function onPointerUp() {
    dragState.current = null
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }

  if (theme !== 'dark') return null

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 9999,
        width: 76,
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
        overflow: 'hidden',
      }}
    >
      <div
        onPointerDown={onNotchPointerDown}
        style={{
          height: 14,
          background: '#ddd',
          cursor: 'grab',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#888' }} />
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#888' }} />
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#888' }} />
      </div>
      <div style={{ padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: 56, height: 32, padding: 0, border: 'none', cursor: 'pointer', background: 'none' }}
        />
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#333' }}>{color}</span>
      </div>
    </div>
  )
}
