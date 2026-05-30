'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CloverIcon from '@/components/CloverIcon'

type NavKey = 'builds' | 'pieces' | 'finds'

const NAV_KEYS: NavKey[] = ['builds', 'pieces', 'finds']

const NAV_ITEMS: { href: string; label: string; key: NavKey }[] = [
  { href: '/builds', label: 'builds', key: 'builds' },
  { href: '/pieces', label: 'pieces', key: 'pieces' },
  { href: '/finds', label: 'finds', key: 'finds' },
]

export default function Nav() {
  const pathname = usePathname()
  const [active, setActive] = useState<NavKey | null>(() => {
    if (typeof window === 'undefined') return null
    const key = window.location.pathname.slice(1) as NavKey
    return NAV_KEYS.includes(key) ? key : null
  })

  useEffect(() => {
    const key = pathname.slice(1) as NavKey
    setActive(NAV_KEYS.includes(key) ? key : null)
  }, [pathname])

  function handleClick(key: NavKey) {
    setActive(key)
  }

  const navItems = (
    <div className="flex items-start gap-12">
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.key}
          href={item.href}
          label={item.label}
          navKey={item.key}
          isActive={active === item.key}
          onClick={handleClick}
        />
      ))}
    </div>
  )

  return (
    <nav className="fixed inset-0 pointer-events-none z-10">
      {/* Desktop */}
      <div className="hidden md:flex w-full h-full items-center justify-between px-8 pointer-events-auto">
        <Link
          href="/"
          className="text-[50px] font-semibold leading-none whitespace-nowrap"
          style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-dm-sans)' }}
        >
          Ronak Ramnani
        </Link>
        {navItems}
        <CloverIcon />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden flex-col h-full">
        <div className="flex items-center justify-between px-6 pt-10 pointer-events-auto">
          <Link
            href="/"
            className="text-[36px] font-semibold leading-none"
            style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Ronak Ramnani
          </Link>
          <CloverIcon />
        </div>
        <div className="flex-1" />
        <div className="flex items-start justify-center gap-12 px-6 pb-14 pointer-events-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.key}
              href={item.href}
              label={item.label}
              navKey={item.key}
              isActive={active === item.key}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

function NavItem({
  href,
  label,
  navKey,
  isActive,
  onClick,
}: {
  href: string
  label: string
  navKey: NavKey
  isActive: boolean
  onClick: (key: NavKey) => void
}) {
  return (
    <Link
      href={href}
      onClick={() => onClick(navKey)}
      style={{ position: 'relative', display: 'inline-block', height: '34px' }}
    >
      {/* invisible width-setter so container doesn't collapse */}
      <span
        aria-hidden
        style={{
          display: 'block',
          visibility: 'hidden',
          fontSize: '21px',
          lineHeight: 1,
          fontFamily: 'var(--font-dm-sans)',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>

      <span
        className="nav-label"
        style={{
          position: 'absolute',
          top: isActive ? '13px' : '0px',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: '21px',
          lineHeight: 1,
          fontFamily: 'var(--font-dm-sans)',
          color: 'black',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>

      <span
        className="nav-shape"
        style={{
          position: 'absolute',
          top: isActive ? '0px' : '25px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          color: isActive ? 'var(--color-green)' : 'black',
        }}
      >
        {navKey === 'builds' && <TriangleIcon />}
        {navKey === 'pieces' && <DiamondIcon />}
        {navKey === 'finds' && <CircleIcon />}
      </span>
    </Link>
  )
}

function TriangleIcon() {
  return (
    <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
      <polygon points="5,0 10,9 0,9" fill="currentColor" />
    </svg>
  )
}

function DiamondIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="8"
        height="8"
        fill="currentColor"
        transform="rotate(-15 4.5 4.5)"
      />
    </svg>
  )
}

function CircleIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <circle cx="4.5" cy="4.5" r="4.5" fill="currentColor" />
    </svg>
  )
}
