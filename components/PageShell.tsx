'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import SiteChrome from '@/components/SiteChrome'
import PageTransition from '@/components/PageTransition'

const COMPACT_PADDING_MOBILE = 32
const COMPACT_PADDING_DESKTOP = 40
const MD_BREAKPOINT = 768
const SLIDE_MS = 420

// SiteChrome (name/clover/section labels) stays mounted across every route.
// A measured top padding pushes it (and whatever page content follows) down
// to sit centered on the home page, and collapses to a small fixed value
// everywhere else — a plain CSS transition on padding-top, so it slides
// smoothly on navigation without any page-transition API.
//
// This measures the block's own height rather than relying on flex-grow to
// distribute leftover space: a flex spacer computes to 0 the instant a tall
// page (piece pages set minHeight: 100vh) mounts, since there's no free
// space left to distribute — so the "shrink" direction had nothing to
// animate through, only "grow" did. A directly computed padding-top has no
// such dependency on sibling content height.
//
// The transition is armed ONLY for navigation. The server can't know the
// viewport, so it always renders the compact padding; if the transition were
// live at that point, hydration's correction would animate and the finished
// page would visibly slide into place after the reader could already see it,
// reading as a second load. Same for a late-loading image changing the block
// height, or a mobile URL bar collapsing. Those are corrections, not
// navigation — they apply instantly, and only a route change slides.
export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const blockRef = useRef<HTMLDivElement>(null)
  const [paddingTop, setPaddingTop] = useState(COMPACT_PADDING_MOBILE)
  const [animate, setAnimate] = useState(false)
  const isFirstRender = useRef(true)
  const disarmTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useLayoutEffect(() => {
    // Arm the slide for this route change only. Disarming is driven by
    // transitionend (below); this timer is just a fallback for the case where
    // the padding lands on the same value and no transition ever fires, and
    // is given margin so it can't clip a slide whose paint came in late.
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      setAnimate(true)
      clearTimeout(disarmTimer.current)
      disarmTimer.current = setTimeout(() => setAnimate(false), SLIDE_MS + 250)
    }

    function measure() {
      const compact = window.innerWidth >= MD_BREAKPOINT ? COMPACT_PADDING_DESKTOP : COMPACT_PADDING_MOBILE
      if (!isHome) {
        setPaddingTop(compact)
        return
      }
      const blockHeight = blockRef.current?.offsetHeight ?? 0
      setPaddingTop(Math.max(compact, (window.innerHeight - blockHeight) / 2))
    }

    measure()

    // The first measurement runs before images and webfonts settle, which on
    // the home index under-reports the block height by a couple hundred px.
    // Re-measure as it settles; parent padding can't feed back into the
    // block's own height, so this can't loop.
    const observer = new ResizeObserver(measure)
    if (blockRef.current) observer.observe(blockRef.current)

    // Mobile browsers fire resize when the URL bar shows/hides, which changes
    // innerHeight mid-scroll. Only a width change can alter the layout here.
    let lastWidth = window.innerWidth
    function onResize() {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      measure()
    }
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [isHome, pathname])

  useLayoutEffect(() => () => clearTimeout(disarmTimer.current), [])

  return (
    <div
      className="min-h-screen"
      style={{
        paddingTop,
        transition: animate ? `padding-top ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
      }}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === 'padding-top') {
          clearTimeout(disarmTimer.current)
          setAnimate(false)
        }
      }}
    >
      <div ref={blockRef}>
        <SiteChrome />
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  )
}
