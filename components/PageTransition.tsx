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
//
// Driven by a CSS @keyframes animation (declared in globals.css) rather than
// a React state flip: the "from" position is baked into the keyframe itself,
// so the browser never has a chance to paint the new content already
// settled in place before the slide starts.
//
// The incoming page stays in normal document flow (just translated); the
// outgoing page is absolutely positioned over it. That way PageShell's
// height measurement (used to center the home list) always reflects the
// incoming page alone, not the two pages stacked together — otherwise the
// measured block would be taller than the settled page during the slide,
// and padding-top would visibly snap once the outgoing page unmounted,
// reading as a second, separate slide.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [current, setCurrent] = useState<Slot>({ pathname, node: children })
  const [outgoing, setOutgoing] = useState<Slot | null>(null)
  const [direction, setDirection] = useState<Direction>('forward')
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

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setOutgoing(null), DURATION)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (!isMobile || !outgoing) {
    return <>{current.node}</>
  }

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <div
        key={current.pathname}
        style={{
          animation: `slide-in-${direction} ${DURATION}ms ${EASING} forwards`,
        }}
      >
        {current.node}
      </div>
      <div
        key={outgoing.pathname}
        style={{
          position: 'absolute',
          inset: 0,
          animation: `slide-out-${direction} ${DURATION}ms ${EASING} forwards`,
        }}
      >
        {outgoing.node}
      </div>
    </div>
  )
}
