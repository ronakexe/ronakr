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
  const [active, setActive] = useState<NavKey | null>(null)

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
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {/* Desktop */}
      <nav
        className="hidden md:flex w-full items-center justify-between px-8 pointer-events-auto"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: active ? '32px' : '50%',
          transform: active ? 'translateY(0)' : 'translateY(-50%)',
          transition: 'top 400ms ease, transform 400ms ease',
        }}
      >
        <Link
          href="/"
          className="text-[50px] font-semibold leading-none whitespace-nowrap"
          style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-dm-sans)' }}
        >
          Ronak Ramnani
        </Link>
        {navItems}
        <CloverIcon />
      </nav>

      {/* Mobile */}
      <div className="flex md:hidden flex-col h-full pointer-events-auto">
        <div className="flex items-center justify-between px-6 pt-10">
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
        <div className="flex items-start justify-center gap-12 px-6 pb-14">
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
    </div>
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
        {navKey === 'builds' && <TriangleIcon active={isActive} />}
        {navKey === 'pieces' && <DiamondIcon active={isActive} />}
        {navKey === 'finds' && <EllipseIcon active={isActive} />}
      </span>
    </Link>
  )
}

function TriangleIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      style={{ transform: `rotate(${active ? 159.14 : 125.14}deg)` }}
    >
      <polygon points="5,0 10,9 0,9" fill="currentColor" />
    </svg>
  )
}

function DiamondIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      style={{ transform: `rotate(${active ? 27.03 : 14.88}deg)` }}
    >
      <rect x="0.5" y="0.5" width="8" height="8" fill="currentColor" />
    </svg>
  )
}

function EllipseIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="10.5"
      height="9.75"
      viewBox="0 0 10.5 9.75"
      fill="none"
      style={{ transform: `rotate(${active ? 72.83 : 33.27}deg)` }}
    >
      <ellipse cx="5.25" cy="4.875" rx="5.25" ry="4.875" fill="currentColor" />
    </svg>
  )
}
