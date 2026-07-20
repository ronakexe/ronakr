'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { pieces, finds, Piece } from '@/app/pieces/pieces'
import ThemeToggle from '@/components/ThemeToggle'

type Tab = 'pieces' | 'finds'
type View = 'list' | 'grid'

// Dividers between pieces track the text color; the empty-thumbnail box uses
// the theme's dedicated border token so it reads as a placeholder, not a rule.
const RULE = 'var(--text)'
const BOX = 'var(--border)'

export default function Sidebar() {
  const pathname = usePathname()
  const [tab, setTab] = useState<Tab>(pathname.startsWith('/finds') ? 'finds' : 'pieces')
  const [view, setView] = useState<View>('list')

  const items = tab === 'pieces' ? pieces : finds

  return (
    <aside className="w-full shrink-0 px-7 py-8 md:w-[360px] md:px-10 md:py-10">
      <Link
        href="/"
        className="block whitespace-nowrap text-[36px] leading-[1.05] md:text-[44px]"
        style={{
          fontFamily: "'Redaction 35', var(--font-dm-sans), sans-serif",
          letterSpacing: '-0.025em',
          color: 'var(--name)',
        }}
      >
        Ronak Ramnani
      </Link>

      <div className="mt-7 flex items-center justify-between gap-4">
        {/* Segmented picker */}
        <div className="flex p-0.5" style={{ background: 'var(--muted)', borderRadius: 'var(--radius)' }}>
          {(['pieces', 'finds'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 text-[13px] font-medium capitalize transition-colors"
              style={{
                background: tab === t ? 'var(--background)' : 'transparent',
                color: tab === t ? 'var(--foreground)' : 'var(--muted-foreground)',
                boxShadow: tab === t ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                borderRadius: 'calc(var(--radius) - 2px)',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={() => setView('list')}
            aria-label="List view"
            className="transition-opacity"
            style={{ opacity: view === 'list' ? 1 : 0.3 }}
          >
            <ListIcon />
          </button>
          <button
            onClick={() => setView('grid')}
            aria-label="Grid view"
            className="transition-opacity"
            style={{ opacity: view === 'grid' ? 1 : 0.3 }}
          >
            <GridIcon />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-[16px]" style={{ opacity: 0.45 }}>
          Nothing here yet.
        </p>
      ) : view === 'list' ? (
        <ul className="mt-9" style={{ borderTop: `0.5px solid ${RULE}` }}>
          {items.map((item) => (
            <li key={item.title} style={{ borderBottom: `0.5px solid ${RULE}` }}>
              <Row item={item} active={pathname === item.href} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5">
          {items.map((item) => (
            <Tile key={item.title} item={item} active={pathname === item.href} />
          ))}
        </div>
      )}
    </aside>
  )
}

function Thumb({ item, w, h }: { item: Piece; w: number | string; h: number }) {
  if (!item.image) {
    return (
      <div
        className="shrink-0"
        style={{ width: w, height: h, borderRadius: 2, border: `1px solid ${BOX}` }}
      />
    )
  }
  return (
    <Image
      src={item.image}
      alt={item.title}
      width={typeof w === 'number' ? w : 240}
      height={h}
      className="shrink-0"
      style={{ width: w, height: h, objectFit: 'cover', borderRadius: 2 }}
    />
  )
}

function Row({ item, active }: { item: Piece; active: boolean }) {
  const content = (
    <div className="group flex items-center justify-between gap-4 py-3.5">
      <span className="transition-transform duration-200 group-hover:translate-x-1">
        <span className="block text-[17px]" style={{ opacity: active ? 1 : 0.55 }}>
          {item.title}
        </span>
        <span className="block text-[12px]" style={{ opacity: active ? 0.6 : 0.35 }}>
          {item.date}
        </span>
      </span>
      <Thumb item={item} w={88} h={50} />
    </div>
  )

  return item.href ? <Link href={item.href}>{content}</Link> : content
}

function Tile({ item, active }: { item: Piece; active: boolean }) {
  const content = (
    <div className="group">
      <div className="transition-transform duration-200 group-hover:-translate-y-0.5">
        <Thumb item={item} w="100%" h={62} />
      </div>
      <span
        className="mt-2 block text-[11px] uppercase"
        style={{ letterSpacing: '0.10em', opacity: active ? 1 : 0.5 }}
      >
        {item.title}
      </span>
      <span className="block text-[11px]" style={{ opacity: active ? 0.5 : 0.3 }}>
        {item.date}
      </span>
    </div>
  )

  return item.href ? <Link href={item.href}>{content}</Link> : content
}

function ListIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <line x1="0" y1="2.5" x2="17" y2="2.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="0" y1="8.5" x2="17" y2="8.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="0" y1="14.5" x2="17" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <rect x="0.75" y="0.75" width="6.5" height="6.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9.75" y="0.75" width="6.5" height="6.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="0.75" y="9.75" width="6.5" height="6.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9.75" y="9.75" width="6.5" height="6.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
