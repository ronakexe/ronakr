'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import SiteChrome from '@/components/SiteChrome'
import PageTransition from '@/components/PageTransition'

const COMPACT_PADDING_MOBILE = 32
const COMPACT_PADDING_DESKTOP = 40
const MD_BREAKPOINT = 768

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
export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const blockRef = useRef<HTMLDivElement>(null)
  const [paddingTop, setPaddingTop] = useState(COMPACT_PADDING_MOBILE)

  useLayoutEffect(() => {
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
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isHome, pathname])

  return (
    <div
      className="min-h-screen"
      style={{ paddingTop, transition: 'padding-top 420ms cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      <div ref={blockRef}>
        <SiteChrome />
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  )
}
