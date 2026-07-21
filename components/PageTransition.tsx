'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const DURATION = 420
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'
const MD_BREAKPOINT = '(max-width: 767px)'

type Slot = { pathname: string; node: React.ReactNode }
type Direction = 'forward' | 'back'

// Mobile-only slide transition between the home list and an entry page.
// Navigating away from home slides the list off to the left while the entry
// slides in from the right; navigating back to home reverses it. Desktop is
// untouched — PageShell's own padding-top transition already handles that.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [current, setCurrent] = useState<Slot>({ pathname, node: children })
  const [outgoing, setOutgoing] = useState<Slot | null>(null)
  const [direction, setDirection] = useState<Direction>('forward')
  const [settled, setSettled] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    const mq = window.matchMedia(MD_BREAKPOINT)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    if (pathname === current.pathname) {
      setCurrent({ pathname, node: children })
      return
    }

    setDirection(pathname === '/' ? 'back' : 'forward')
    setOutgoing(current)
    setCurrent({ pathname, node: children })
    setSettled(false)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const raf = requestAnimationFrame(() => setSettled(true))
    timeoutRef.current = setTimeout(() => setOutgoing(null), DURATION)

    return () => {
      cancelAnimationFrame(raf)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (!isMobile || !outgoing) {
    return <>{current.node}</>
  }

  const items = direction === 'forward' ? [outgoing, current] : [current, outgoing]
  const startX = direction === 'forward' ? '0%' : '-50%'
  const restX = direction === 'forward' ? '-50%' : '0%'

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          width: '200%',
          transform: `translateX(${settled ? restX : startX})`,
          transition: `transform ${DURATION}ms ${EASING}`,
        }}
      >
        {items.map((item) => (
          <div key={item.pathname} style={{ width: '50%', flexShrink: 0 }}>
            {item.node}
          </div>
        ))}
      </div>
    </div>
  )
}
