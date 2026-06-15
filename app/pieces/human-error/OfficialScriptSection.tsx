'use client'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import type { StaticImageData } from 'next/image'
import hed1 from '../piece-assets/human error/hed1 icon.png'
import hed2 from '../piece-assets/human error/hed2 icon.png'
import hed3 from '../piece-assets/human error/hed3 icon.png'
import heod from '../piece-assets/human error/heod icon.png'

const DRAFTS = [
  { id: 'draft1',   label: 'Draft 1',  folder: 'human-error-draft-1', pages: 5, icon: hed1 },
  { id: 'draft2',   label: 'Draft 2',  folder: 'human-error-draft-2', pages: 6, icon: hed2 },
  { id: 'draft3',   label: 'Draft 3',  folder: 'human-error-draft-3', pages: 8, icon: hed3 },
  { id: 'official', label: 'Official', folder: 'human-error-script',   pages: 8, icon: heod },
] as const

type DraftId = (typeof DRAFTS)[number]['id']

type FlyingState = {
  icon: StaticImageData
  from: { left: number; top: number; width: number; height: number }
  to:   { left: number; top: number; width: number; height: number }
  phase: 'initial' | 'flying'
}

export default function OfficialScriptSection() {
  const [active, setActive] = useState<DraftId>('official')
  const [flying, setFlying] = useState<FlyingState | null>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // After the 'initial' render positions the overlay at `from`, fire the transition
  useEffect(() => {
    if (flying?.phase !== 'initial') return
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlying(f => f ? { ...f, phase: 'flying' } : null)
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [flying?.phase])

  function select(id: DraftId, e: React.MouseEvent<HTMLButtonElement>) {
    if (flying) return
    const btnRect = e.currentTarget.getBoundingClientRect()
    const boxRect = boxRef.current!.getBoundingClientRect()
    const draft = DRAFTS.find(d => d.id === id)!

    // Switch content immediately — it loads behind the flying overlay
    setActive(id)
    if (boxRef.current) boxRef.current.scrollTop = 0

    setFlying({
      icon: draft.icon as StaticImageData,
      from: { left: btnRect.left, top: btnRect.top, width: btnRect.width, height: btnRect.height },
      to:   { left: boxRect.left, top: boxRect.top, width: boxRect.width, height: boxRect.height },
      phase: 'initial',
    })
  }

  const draft = DRAFTS.find(d => d.id === active)!

  return (
    <>
      <div
        className="relative grid grid-cols-1 md:grid-cols-3 mid:grid-cols-4 md:items-start"
        style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 160 }}
      >
        {/* Write-up + icons — col 1 only (between lines 1–2) at all breakpoints */}
        <div className="md:col-span-1" style={{ paddingLeft: 12, paddingRight: 8, minWidth: 0 }}>
          <h1
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#000',
              margin: 0,
              whiteSpace: 'nowrap',
              fontSize: 'clamp(32px, calc(3.74vw - 6.6px), 48px)',
            }}
          >
            Official Script
          </h1>
          <div
            className="text-[15px] md:text-[18px]"
            style={{ fontFamily: 'var(--font-crimson-pro)', fontWeight: 400, lineHeight: 1.3, color: '#000', marginTop: 16 }}
          >
            <p style={{ margin: 0 }}>
              This was the script used on set for Human Error. It was the first script I had
              ever really written; Previous films had been either written by someone else, or
              we just winged it (like{' '}
              <Link href="/pieces/double-trouble" style={{ color: '#d90f0f', textDecoration: 'underline' }}>
                Double Trouble
              </Link>
              ).
            </p>
            <p style={{ marginTop: 16 }}>
              As you would expect, the original script was quite different. Originally, there
              were going to be 5 humans, but due to actor constraints, I had to narrow it down
              to 3.
            </p>
            <p style={{ marginTop: 16 }}>
              One of the main problems with the original draft was the lack of reason to care
              for Sarah. We knew she had a problem&mdash;she was nervous about interviewing the
              humans&mdash;but we didn&apos;t know why. Why was she nervous? Why did she not want
              to interview them? So what, she&apos;s interviewing humans!?
            </p>
            <p style={{ marginTop: 16 }}>
              That&apos;s why I added the &lsquo;progress report&rsquo; coming up in the calendar,
              but I still don&apos;t think it was shown clear enough in the film.
            </p>
          </div>

          {/* Draft version icons — below write-up, active draft hidden */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            {DRAFTS.filter(d => d.id !== active).map(d => (
              <button
                key={d.id}
                onClick={(e) => select(d.id, e)}
                disabled={!!flying}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: flying ? 'default' : 'pointer',
                  padding: '4px',
                }}
              >
                <Image src={d.icon} alt={d.label} width={72} height={72} style={{ display: 'block' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Script box — 3-col span (cols 2–4) at mid so center = between lines 3 and 4 */}
        <div className="md:col-start-2 md:col-span-2 mid:col-span-3 mt-10 md:mt-0">
          <div className="mid:w-2/3 mid:mx-auto">
            <div
              ref={boxRef}
              style={{
                background: '#000',
                border: '5px solid #fcf8f8',
                width: '100%',
                aspectRatio: '595 / 842',
                overflowY: 'auto',
              }}
            >
              {Array.from({ length: draft.pages }, (_, i) => (
                <img
                  key={`${draft.id}-${i}`}
                  src={`/${draft.folder}/page-${i + 1}.svg`}
                  alt={`${draft.label} page ${i + 1}`}
                  loading="lazy"
                  style={{ display: 'block', width: '100%', height: 'auto', background: '#fff' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flying icon overlay — teleports from icon position to script box position */}
      {mounted && flying && createPortal(
        <div
          style={{
            position: 'fixed',
            zIndex: 1000,
            pointerEvents: 'none',
            overflow: 'hidden',
            background: '#fff',
            border: '5px solid #fcf8f8',
            borderRadius: flying.phase === 'flying' ? 0 : 6,
            left:   flying.phase === 'flying' ? flying.to.left   : flying.from.left,
            top:    flying.phase === 'flying' ? flying.to.top    : flying.from.top,
            width:  flying.phase === 'flying' ? flying.to.width  : flying.from.width,
            height: flying.phase === 'flying' ? flying.to.height : flying.from.height,
            transition: flying.phase === 'flying'
              ? [
                  'left 480ms cubic-bezier(0.4,0,0.2,1)',
                  'top 480ms cubic-bezier(0.4,0,0.2,1)',
                  'width 480ms cubic-bezier(0.4,0,0.2,1)',
                  'height 480ms cubic-bezier(0.4,0,0.2,1)',
                  'border-radius 480ms ease',
                ].join(', ')
              : 'none',
          }}
          onTransitionEnd={(e) => {
            // Only fire once (width is the last property we care about)
            if (e.target === e.currentTarget && e.propertyName === 'width') {
              setFlying(null)
            }
          }}
        >
          {/* Icon image fades out as the box expands toward the script */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: flying.phase === 'flying' ? 0 : 1,
              transition: flying.phase === 'flying' ? 'opacity 280ms ease' : 'none',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flying.icon.src}
              alt=""
              style={{
                width: flying.icon.width,
                height: flying.icon.height,
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
