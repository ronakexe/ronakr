'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const DURATION = 420
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'
// The desktop drop-off reads more like something falling out of view, so it
// eases in (starts slow, accelerates) rather than using the mobile slide's
// decelerate-then-accelerate curve.
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)'
const MOBILE_QUERY = '(max-width: 767px)'

type MediaRect = { width: number; height: number }
type Snapshot = { html: string; height: number; scrollY: number; mediaRects: MediaRect[] }

// An "entry" is an individual piece/finds page (/finds/lacoste,
// /pieces/human-error) as opposed to the home list or a bare section index.
function isEntryPath(path: string) {
  return path.split('/').filter(Boolean).length >= 2
}

// Two device-specific transitions, sharing one snapshot/ghost mechanism:
//
// Mobile: horizontal slide between the home list and an entry page, both
// ways. Navigating away from home slides the list off to the left while the
// entry slides in from the right; navigating back reverses it.
//
// Desktop: only when leaving an entry, the departing page slides straight
// down and off the bottom of the screen. SiteChrome's own small downward
// shift back to its centered home position is handled separately by
// PageShell's padding-top transition — the two compose, so the header moves
// a little while the content underneath it slides away completely. The
// incoming page needs no animation of its own: it's already sitting in
// place beneath the departing ghost and is simply revealed as the ghost
// clears out of the way.
//
// The outgoing page is a CLONED DOM SNAPSHOT, not React state holding the
// previous `children`. That distinction is the whole point of this component:
// in the App Router, `children` is a live reference into the router's segment
// tree, not a snapshot of rendered output. Stashing it in state and rendering
// it back gives you the CURRENT route, because React re-renders the element
// against the router's new state. The result was both layers rendering the
// incoming page — the new page appeared instantly in the "outgoing" slot, then
// an identical copy slid in over it, which read as the page loading twice.
//
// A cloned node has no such tie to the router. It is inert markup that keeps
// showing the page we left, so the only thing that animates in is the real,
// already-rendered incoming page.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hostRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const snapshot = useRef<Snapshot | null>(null)
  const lastPath = useRef(pathname)
  const cancelRef = useRef<(() => void) | null>(null)

  // Snapshot the settled page after every commit — this is what the NEXT
  // navigation slides out. Captured here rather than at navigation time
  // because by the time a route-change layout effect runs, React has already
  // swapped the DOM to the incoming page and the old markup is gone. Height,
  // scroll position, and each media element's rendered size are captured now
  // too, while this is still the real, connected page — a clone parsed from
  // an HTML string is unlaid-out until it's inserted into the document, so
  // measuring it at build time gets 0x0 for everything.
  useEffect(() => {
    const page = pageRef.current
    if (!page) return
    const mediaRects = [...page.querySelectorAll('iframe, video')].map((el) => {
      const r = el.getBoundingClientRect()
      return { width: r.width, height: r.height }
    })
    snapshot.current = { html: page.innerHTML, height: page.offsetHeight, scrollY: window.scrollY, mediaRects }
  })

  useLayoutEffect(() => {
    if (lastPath.current === pathname) return
    const from = lastPath.current
    lastPath.current = pathname

    const host = hostRef.current
    const page = pageRef.current
    const snap = snapshot.current
    if (!host || !page || !snap) return

    const mobile = window.matchMedia(MOBILE_QUERY).matches
    const leavingEntry = isEntryPath(from)
    if (!mobile && !leavingEntry) return

    // A prior transition still in flight (fast back-to-back navigation) —
    // drop it before starting the next one.
    cancelRef.current?.()

    const back = pathname === '/'

    const ghost = document.createElement('div')
    ghost.innerHTML = snap.html
    // Media in a clone would re-fetch and re-instantiate (a YouTube embed
    // remounts as a blank player) for the 420ms it spends leaving. Several
    // piece pages open on a YouTube embed, so swapping it for an empty box
    // would leave a hole where the video thumbnail should be for the whole
    // slide — swap in the video's own thumbnail image instead, sized to
    // match, and only fall back to a blank box for embeds we can't resolve.
    ghost.querySelectorAll('iframe, video').forEach((node, i) => {
      const rect = snap.mediaRects[i] ?? { width: 0, height: 0 }
      const videoId = node.getAttribute('src')?.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]+)/)?.[1]
      const replacement = document.createElement(videoId ? 'img' : 'div')
      replacement.style.cssText = `width:${rect.width}px;height:${rect.height}px;object-fit:cover;display:block`
      if (videoId) (replacement as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      node.replaceWith(replacement)
    })
    ghost.setAttribute('aria-hidden', 'true')
    ghost.style.cssText = [
      'position:absolute',
      'left:0',
      'right:0',
      `top:${-snap.scrollY}px`, // shift to where the reader actually was, not the clone's own top
      `height:${snap.height}px`, // sized from the real page, not the host box — host now measures the incoming page
      'pointer-events:none',
    ].join(';')

    host.style.position = 'relative'
    host.appendChild(ghost)

    const opts = { duration: DURATION, easing: EASING, fill: 'both' as const }
    let outgoing: Animation
    let incoming: Animation | null = null

    if (mobile) {
      // Scoped to the animation only: overflow-x containment so a mid-slide
      // frame can't push the document wider (host spans full viewport
      // width), and only x — a y clip here would crop the ghost to the
      // host's own height, which now reflects the INCOMING page, not the
      // departing one.
      host.style.overflowX = 'hidden'
      outgoing = ghost.animate(
        [{ transform: 'translateX(0%)' }, { transform: `translateX(${back ? '100%' : '-100%'})` }],
        opts,
      )
      incoming = page.animate(
        [{ transform: `translateX(${back ? '-100%' : '100%'})` }, { transform: 'translateX(0%)' }],
        opts,
      )
    } else {
      outgoing = ghost.animate(
        [{ transform: 'translateY(0%)' }, { transform: 'translateY(100%)' }],
        { ...opts, easing: EASE_IN },
      )
    }

    let settled = false
    const settle = () => {
      if (settled) return
      settled = true
      ghost.remove()
      host.style.position = ''
      host.style.overflowX = ''
      cancelRef.current = null
    }
    ;(incoming ?? outgoing).finished.then(settle, settle)

    cancelRef.current = () => {
      outgoing.cancel()
      incoming?.cancel()
      settle()
    }
    return () => cancelRef.current?.()
  }, [pathname])

  return (
    <div ref={hostRef}>
      <div ref={pageRef}>{children}</div>
    </div>
  )
}
