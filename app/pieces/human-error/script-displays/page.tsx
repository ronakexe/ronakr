'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'

// ── Script pages (rendered from "Human Error official script.pdf" → public/) ──
const PAGE_COUNT = 8
const PAGES = Array.from({ length: PAGE_COUNT }, (_, i) => `/human-error-script/page-${i + 1}.png`)
const RATIO = '1530 / 1980' // true page aspect ratio, so cover == no crop

const ACCENT = '#5387FF'

// ── Shared bits ──────────────────────────────────────────────────────────────
function PageImg({
  src,
  alt,
  style,
  onClick,
}: {
  src: string
  alt: string
  style?: React.CSSProperties
  onClick?: () => void
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        aspectRatio: RATIO,
        objectFit: 'cover',
        background: '#fff',
        ...style,
      }}
    />
  )
}

function NavBtn({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1.5px solid #000',
        background: disabled ? '#eee' : '#fff',
        color: disabled ? '#bbb' : '#000',
        cursor: disabled ? 'default' : 'pointer',
        fontSize: 18,
        fontFamily: 'var(--font-dm-sans)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

function Controls({
  onPrev,
  onNext,
  label,
  prevDisabled,
  nextDisabled,
}: {
  onPrev: () => void
  onNext: () => void
  label: string
  prevDisabled?: boolean
  nextDisabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 18 }}>
      <NavBtn onClick={onPrev} disabled={prevDisabled}>←</NavBtn>
      <span
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 14,
          fontWeight: 600,
          minWidth: 130,
          textAlign: 'center',
        }}
      >
        {label}
      </span>
      <NavBtn onClick={onNext} disabled={nextDisabled}>→</NavBtn>
    </div>
  )
}

// ── 01 · Vertical document scroll ────────────────────────────────────────────
function VerticalScroll() {
  return (
    <div style={{ height: 560, overflowY: 'auto', padding: '28px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
        {PAGES.map((p, i) => (
          <div
            key={i}
            style={{
              width: 'min(82%, 420px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
              border: '1px solid #e3e3e3',
            }}
          >
            <PageImg src={p} alt={`Page ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 02 · Continuous scroll (no gaps) ─────────────────────────────────────────
type Sep = 'none' | 'line' | 'squiggle'
const SQUIGGLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12'%3E%3Cpath d='M0 6 Q6 0 12 6 T24 6' fill='none' stroke='%23b3b3b3' stroke-width='1.4'/%3E%3C/svg%3E\")"

function ContinuousScroll() {
  const [sep, setSep] = useState<Sep>('none')
  const options: { value: Sep; label: string }[] = [
    { value: 'none', label: 'No separator' },
    { value: 'line', label: 'Thin gray line' },
    { value: 'squiggle', label: 'Squiggly gray line' },
  ]
  return (
    <div>
      <div style={{ display: 'flex', gap: 22, marginBottom: 18, flexWrap: 'wrap' }}>
        {options.map((o) => (
          <label
            key={o.value}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: 'var(--font-dm-sans)', fontSize: 14, fontWeight: 600 }}
          >
            <input
              type="radio"
              name="continuous-sep"
              value={o.value}
              checked={sep === o.value}
              onChange={() => setSep(o.value)}
              style={{ accentColor: ACCENT, cursor: 'pointer' }}
            />
            {o.label}
          </label>
        ))}
      </div>
      <div style={{ height: 560, overflowY: 'auto', padding: '28px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 'min(82%, 420px)', boxShadow: '0 8px 30px rgba(0,0,0,0.18)' }}>
            {PAGES.map((p, i) => (
              <div key={i}>
                <PageImg src={p} alt={`Page ${i + 1}`} />
                {sep !== 'none' && i < PAGES.length - 1 &&
                  (sep === 'line' ? (
                    <div style={{ height: 1, background: '#b3b3b3' }} />
                  ) : (
                    <div style={{ height: 12, backgroundImage: SQUIGGLE, backgroundRepeat: 'repeat-x', backgroundPosition: 'center' }} />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 03 · Two-page book spread ────────────────────────────────────────────────
function BookSpread() {
  const spreads = [[0, 1], [2, 3], [4, 5], [6, 7]]
  const [s, setS] = useState(0)
  const [l, r] = spreads[s]
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
        <div style={{ display: 'flex', boxShadow: '0 20px 50px rgba(0,0,0,0.45)', maxWidth: 680, width: '100%' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <PageImg src={PAGES[l]} alt={`Page ${l + 1}`} />
            <div style={{ position: 'absolute', inset: '0 0 0 auto', width: 44, background: 'linear-gradient(to left, rgba(0,0,0,0.28), transparent)' }} />
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <PageImg src={PAGES[r]} alt={`Page ${r + 1}`} />
            <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 44, background: 'linear-gradient(to right, rgba(0,0,0,0.28), transparent)' }} />
          </div>
        </div>
      </div>
      <Controls
        onPrev={() => setS((v) => Math.max(0, v - 1))}
        onNext={() => setS((v) => Math.min(spreads.length - 1, v + 1))}
        label={`Pages ${l + 1}–${r + 1}`}
        prevDisabled={s === 0}
        nextDisabled={s === spreads.length - 1}
      />
    </div>
  )
}

// ── 03 · Film strip / reel ───────────────────────────────────────────────────
function Sprockets() {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '10px 24px', overflow: 'hidden' }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} style={{ width: 14, height: 18, borderRadius: 3, background: '#000', flex: '0 0 auto' }} />
      ))}
    </div>
  )
}
function Filmstrip() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Sprockets />
      <div style={{ display: 'flex', gap: 18, overflowX: 'auto', padding: '16px 24px', scrollSnapType: 'x mandatory' }}>
        {PAGES.map((p, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 auto',
              width: 200,
              scrollSnapAlign: 'center',
              border: '3px solid #000',
              boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
            }}
          >
            <PageImg src={p} alt={`Page ${i + 1}`} />
          </div>
        ))}
      </div>
      <Sprockets />
    </div>
  )
}

// ── 04 · Thumbnail grid + lightbox ───────────────────────────────────────────
function Lightbox({ index, setIndex, onClose }: { index: number; setIndex: (n: number) => void; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex(Math.min(PAGE_COUNT - 1, index + 1))
      if (e.key === 'ArrowLeft') setIndex(Math.max(0, index - 1))
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [index, setIndex, onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.88)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 24,
      }}
    >
      <NavBtn onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>←</NavBtn>
      <div onClick={(e) => e.stopPropagation()} style={{ height: '82vh', aspectRatio: RATIO, boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
        <img src={PAGES[index]} alt={`Page ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <NavBtn onClick={() => setIndex(Math.min(PAGE_COUNT - 1, index + 1))} disabled={index === PAGE_COUNT - 1}>→</NavBtn>
    </div>
  )
}
function GridLightbox() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 16 }}>
        {PAGES.map((p, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            style={{ padding: 0, border: '1px solid #e0e0e0', overflow: 'hidden', cursor: 'pointer', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}
          >
            <PageImg src={p} alt={`Page ${i + 1}`} />
            <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, fontWeight: 600, padding: '6px 0', textAlign: 'center' }}>{i + 1}</div>
          </button>
        ))}
      </div>
      {open !== null && <Lightbox index={open} setIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  )
}

// ── 05 · Single-page reader with scrubber ────────────────────────────────────
function Reader() {
  const [i, setI] = useState(0)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
        <div style={{ width: 'min(70%, 360px)', boxShadow: '0 12px 36px rgba(0,0,0,0.2)' }}>
          <PageImg src={PAGES[i]} alt={`Page ${i + 1}`} />
        </div>
      </div>
      <Controls
        onPrev={() => setI((v) => Math.max(0, v - 1))}
        onNext={() => setI((v) => Math.min(PAGE_COUNT - 1, v + 1))}
        label={`Page ${i + 1} of ${PAGE_COUNT}`}
        prevDisabled={i === 0}
        nextDisabled={i === PAGE_COUNT - 1}
      />
      <input
        type="range"
        min={0}
        max={PAGE_COUNT - 1}
        value={i}
        onChange={(e) => setI(Number(e.target.value))}
        style={{ display: 'block', width: 'min(70%, 360px)', margin: '16px auto 0', accentColor: ACCENT }}
      />
    </div>
  )
}

// ── 06 · Fanned deck ─────────────────────────────────────────────────────────
function FannedDeck() {
  const [top, setTop] = useState(0)
  return (
    <div>
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        {PAGES.map((p, i) => {
          const rel = (i - top + PAGE_COUNT) % PAGE_COUNT
          return (
            <div
              key={i}
              onClick={() => setTop(i)}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: 24,
                width: 200,
                cursor: 'pointer',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${rel * 6}deg) translateX(${rel * 14}px) translateY(${rel * 3}px) scale(${1 - rel * 0.015})`,
                zIndex: 100 - rel,
                transition: 'transform .35s ease',
                boxShadow: rel === 0 ? '0 14px 36px rgba(0,0,0,0.35)' : '0 6px 16px rgba(0,0,0,0.2)',
                border: rel === 0 ? `2px solid ${ACCENT}` : '1px solid #ddd',
              }}
            >
              <PageImg src={p} alt={`Page ${i + 1}`} />
            </div>
          )
        })}
      </div>
      <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, color: '#888', textAlign: 'center', marginTop: 14 }}>
        Click any card to bring it to the front — page {top + 1}
      </p>
    </div>
  )
}

// ── 07 · Coverflow (3D) ──────────────────────────────────────────────────────
function Coverflow() {
  const [c, setC] = useState(0)
  return (
    <div>
      <div style={{ position: 'relative', height: 360, overflow: 'hidden', perspective: 1200 }}>
        {PAGES.map((p, i) => {
          const rel = i - c
          const abs = Math.abs(rel)
          return (
            <div
              key={i}
              onClick={() => setC(i)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 190,
                cursor: 'pointer',
                transform: `translate(-50%, -50%) translateX(${rel * 130}px) rotateY(${Math.max(-1, Math.min(1, rel)) * -42}deg) scale(${rel === 0 ? 1.05 : 0.82})`,
                zIndex: 50 - abs,
                opacity: abs > 3 ? 0 : 1,
                pointerEvents: abs > 3 ? 'none' : 'auto',
                transition: 'transform .4s ease, opacity .4s ease',
                boxShadow: rel === 0 ? '0 18px 44px rgba(0,0,0,0.6)' : '0 8px 20px rgba(0,0,0,0.4)',
              }}
            >
              <PageImg src={p} alt={`Page ${i + 1}`} />
            </div>
          )
        })}
      </div>
      <Controls
        onPrev={() => setC((v) => Math.max(0, v - 1))}
        onNext={() => setC((v) => Math.min(PAGE_COUNT - 1, v + 1))}
        label={`Page ${c + 1} of ${PAGE_COUNT}`}
        prevDisabled={c === 0}
        nextDisabled={c === PAGE_COUNT - 1}
      />
    </div>
  )
}

// ── 08 · Scroll-reveal cascade ───────────────────────────────────────────────
function RevealItem({ src, idx, root }: { src: string; idx: number; root: RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShown(true)
      },
      { root: root.current, threshold: 0.25 },
    )
    o.observe(el)
    return () => o.disconnect()
  }, [root])
  return (
    <div
      ref={ref}
      style={{
        width: 'min(70%, 360px)',
        transition: 'opacity .7s ease, transform .7s ease',
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(50px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      }}
    >
      <PageImg src={src} alt={`Page ${idx + 1}`} />
    </div>
  )
}
function ScrollReveal() {
  const rootRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={rootRef} style={{ height: 560, overflowY: 'auto', padding: '40px 0' }}>
      <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, color: '#999', textAlign: 'center', marginBottom: 24 }}>
        ↓ Scroll — pages rise into view
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 64, alignItems: 'center' }}>
        {PAGES.map((p, i) => (
          <RevealItem key={i} src={p} idx={i} root={rootRef} />
        ))}
      </div>
    </div>
  )
}

// ── 09 · Index sidebar + reading pane ────────────────────────────────────────
function IndexReader() {
  const [i, setI] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 0, overflow: 'hidden', height: 560 }}>
      <div style={{ width: 180, flexShrink: 0, overflowY: 'auto', borderRight: '1px solid #eee', padding: '0 14px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PAGES.map((p, idx) => {
          const active = idx === i
          return (
            <button
              key={idx}
              onClick={() => setI(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: 6,
                cursor: 'pointer',
                border: active ? `2px solid ${ACCENT}` : '1px solid transparent',
                borderRadius: 8,
                background: active ? '#f3f3f3' : 'transparent',
                textAlign: 'left',
              }}
            >
              <div style={{ width: 38, flexShrink: 0, border: '1px solid #ddd' }}>
                <PageImg src={p} alt="" />
              </div>
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, fontWeight: active ? 700 : 500, color: active ? ACCENT : '#333' }}>
                Page {idx + 1}
              </span>
            </button>
          )
        })}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30, overflowY: 'auto' }}>
        <div style={{ width: 'min(80%, 320px)', boxShadow: '0 12px 36px rgba(0,0,0,0.18)' }}>
          <PageImg src={PAGES[i]} alt={`Page ${i + 1}`} />
        </div>
      </div>
    </div>
  )
}

// ── 10 · Theater / spotlight ─────────────────────────────────────────────────
function Theater() {
  const [i, setI] = useState(0)
  return (
    <div style={{ padding: '50px 20px 34px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 'min(58%, 300px)', boxShadow: '0 18px 50px rgba(0,0,0,0.25)' }}>
          <PageImg src={PAGES[i]} alt={`Page ${i + 1}`} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 30 }}>
        {PAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to page ${idx + 1}`}
            style={{
              width: idx === i ? 26 : 10,
              height: 10,
              borderRadius: 5,
              border: 'none',
              cursor: 'pointer',
              background: idx === i ? ACCENT : '#d4d4d4',
              transition: 'all .25s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Section wrapper ──────────────────────────────────────────────────────────
const METHODS: { title: string; desc: string; render: () => ReactNode }[] = [
  { title: 'Vertical Document Scroll', desc: 'The plain, intuitive default — pages stacked top to bottom in a simple scroll column, exactly like reading a real document. Zero learning curve.', render: () => <VerticalScroll /> },
  { title: 'Continuous Scroll (No Gaps)', desc: 'The same vertical stack, but the pages butt directly against one another — one uninterrupted ribbon of script. Switch the divider between sheets: none, a thin rule, or a squiggle.', render: () => <ContinuousScroll /> },
  { title: 'Two-Page Book Spread', desc: 'An open-book layout with a center gutter shadow. Step through the script spread by spread, the way a bound script actually reads.', render: () => <BookSpread /> },
  { title: 'Film Strip / Reel', desc: 'Pages mounted on a horizontal celluloid strip with sprocket holes — a playful nod to the film medium. Swipe or scroll sideways.', render: () => <Filmstrip /> },
  { title: 'Thumbnail Grid + Lightbox', desc: 'Every page at a glance as a contact sheet. Click any thumbnail to open a full-screen reader with arrow-key navigation.', render: () => <GridLightbox /> },
  { title: 'Single-Page Reader', desc: 'One large page at a time with a page counter, prev/next, and a drag scrubber. Focused, distraction-free reading.', render: () => <Reader /> },
  { title: 'Fanned Card Deck', desc: 'Pages fanned like a hand of cards. Click any card to snap it to the front — tactile and unexpected.', render: () => <FannedDeck /> },
  { title: 'Coverflow (3D)', desc: 'A perspective carousel: the active page faces you flat while neighbors tilt back in 3D. Cinematic and browsable.', render: () => <Coverflow /> },
  { title: 'Scroll-Reveal Cascade', desc: 'Pages fade and rise into view as you scroll. A modern, editorial feel that keeps attention moving down the script.', render: () => <ScrollReveal /> },
  { title: 'Index Sidebar + Reading Pane', desc: 'A documentation-style split: a clickable page index on the left, the selected page rendered large on the right.', render: () => <IndexReader /> },
  { title: 'Theater / Spotlight Mode', desc: 'A single page centered in the spotlight with a soft drop shadow and dot navigation. Focused — fitting for a performance script.', render: () => <Theater /> },
]

function Section({ n, title, desc, children }: { n: number; title: string; desc: string; children: ReactNode }) {
  return (
    <section id={`m${n}`} style={{ marginBottom: 96, scrollMarginTop: 96 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 6 }}>
        <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 14, fontWeight: 700, color: ACCENT }}>
          {String(n).padStart(2, '0')}
        </span>
        <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, margin: 0, lineHeight: 1.1 }}>
          {title}
        </h2>
      </div>
      <p style={{ fontFamily: 'var(--font-garamond)', fontSize: 18, color: '#444', margin: '0 0 26px', maxWidth: 620, lineHeight: 1.35 }}>
        {desc}
      </p>
      {children}
    </section>
  )
}

export default function ScriptDisplaysPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '120px 24px 160px' }}>
        {/* Header */}
        <header style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: ACCENT, margin: 0 }}>
            Human Error · Script
          </p>
          <h1 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, margin: '8px 0 0', lineHeight: 1.05 }}>
            {METHODS.length} Ways to Display the Script
          </h1>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: 18, color: '#555', margin: '14px 0 0', maxWidth: 640, lineHeight: 1.4 }}>
            The same 8 script pages, shown {METHODS.length} different ways — from the plainly intuitive to the unexpected. Try each one and see which fits the feel of the piece.
          </p>
        </header>

        {/* Sticky chip nav */}
        <nav
          style={{
            position: 'sticky',
            top: 80,
            zIndex: 50,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            padding: '12px 0',
            marginBottom: 48,
            borderBottom: '1px solid #eee',
          }}
        >
          {METHODS.map((m, i) => (
            <a
              key={i}
              href={`#m${i + 1}`}
              style={{
                flex: '0 0 auto',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 13,
                fontWeight: 600,
                color: '#333',
                textDecoration: 'none',
                padding: '6px 12px',
                border: '1px solid #ddd',
                borderRadius: 999,
              }}
            >
              {String(i + 1).padStart(2, '0')} · {m.title}
            </a>
          ))}
        </nav>

        {/* Sections */}
        {METHODS.map((m, i) => (
          <Section key={i} n={i + 1} title={m.title} desc={m.desc}>
            {m.render()}
          </Section>
        ))}
      </div>
    </main>
  )
}
