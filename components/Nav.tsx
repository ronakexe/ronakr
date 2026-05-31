'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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

  const [cloverRotation, setCloverRotation] = useState(0)
  const [cloverOffset, setCloverOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  // --- spin state ---
  const speedRef = useRef(0)
  const rotationRef = useRef(0)
  const targetSpeedRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const SLOW = 360 / (3 * 60)
  const FAST = 360 / (0.4 * 60)
  const ACCEL = 0.4
  const DECEL = 0.15

  useEffect(() => {
    const saved = parseFloat(localStorage.getItem('clover-rotation') ?? '0')
    if (saved) { rotationRef.current = saved; setCloverRotation(saved) }
  }, [])

  const tick = useCallback(() => {
    const target = targetSpeedRef.current
    const cur = speedRef.current
    if (cur < target) speedRef.current = Math.min(cur + ACCEL, target)
    else if (cur > target) speedRef.current = Math.max(cur - DECEL, 0)

    if (speedRef.current > 0.01) {
      rotationRef.current = (rotationRef.current + speedRef.current) % 360
      setCloverRotation(rotationRef.current)
      rafRef.current = requestAnimationFrame(tick)
    } else {
      speedRef.current = 0
      rafRef.current = null
      localStorage.setItem('clover-rotation', String(rotationRef.current))
    }
  }, [])

  const startLoop = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const handleNameMouseEnter = useCallback(() => { targetSpeedRef.current = SLOW; startLoop() }, [startLoop])
  const handleNameMouseLeave = useCallback(() => { targetSpeedRef.current = 0 }, [])
  const handleNameMouseDown = useCallback(() => { targetSpeedRef.current = FAST; startLoop() }, [startLoop])
  const handleNameMouseUp = useCallback(() => { targetSpeedRef.current = SLOW; startLoop() }, [startLoop])

  // --- spring drag state ---
  const dragRef = useRef({
    active: false,
    startX: 0, startY: 0,
    posX: 0, posY: 0,
    velX: 0, velY: 0,
    prevX: 0, prevY: 0,
    springRaf: null as number | null,
  })

  const TENSION = 80   // px — max resistance envelope
  const SPRING_K = 0.1
  const SPRING_DAMP = 0.22

  const handleCloverMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const d = dragRef.current
    if (d.springRaf) { cancelAnimationFrame(d.springRaf); d.springRaf = null }
    d.active = true
    d.startX = e.clientX; d.startY = e.clientY
    d.posX = 0; d.posY = 0
    d.velX = 0; d.velY = 0
    d.prevX = e.clientX; d.prevY = e.clientY
    setIsDragging(true)
  }, [])

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const d = dragRef.current
      if (!d.active) return
      d.velX = e.clientX - d.prevX
      d.velY = e.clientY - d.prevY
      d.prevX = e.clientX; d.prevY = e.clientY
      const rawX = e.clientX - d.startX
      const rawY = e.clientY - d.startY
      d.posX = Math.sign(rawX) * TENSION * (1 - Math.exp(-Math.abs(rawX) / TENSION))
      d.posY = Math.sign(rawY) * TENSION * (1 - Math.exp(-Math.abs(rawY) / TENSION))
      setCloverOffset({ x: d.posX, y: d.posY })
    }

    function onMouseUp() {
      const d = dragRef.current
      if (!d.active) return
      d.active = false
      setIsDragging(false)
      let vx = d.velX * 0.3
      let vy = d.velY * 0.3
      let px = d.posX
      let py = d.posY
      function springTick() {
        vx += -SPRING_K * px - SPRING_DAMP * vx
        vy += -SPRING_K * py - SPRING_DAMP * vy
        px += vx; py += vy
        setCloverOffset({ x: px, y: py })
        if (Math.abs(px) > 0.3 || Math.abs(py) > 0.3 || Math.abs(vx) > 0.05 || Math.abs(vy) > 0.05) {
          d.springRaf = requestAnimationFrame(springTick)
        } else {
          d.springRaf = null
          setCloverOffset({ x: 0, y: 0 })
        }
      }
      d.springRaf = requestAnimationFrame(springTick)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

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
          onMouseEnter={handleNameMouseEnter}
          onMouseLeave={handleNameMouseLeave}
          onMouseDown={handleNameMouseDown}
          onMouseUp={handleNameMouseUp}
        >
          Ronak Ramnani
        </Link>
        {navItems}
        <CloverIcon rotation={cloverRotation} offset={cloverOffset} dragging={isDragging} onMouseDown={handleCloverMouseDown} />
      </nav>

      {/* Mobile — container lets touches through so the page can scroll; only the
          header and footer rows capture pointer events. */}
      <div className="flex md:hidden flex-col h-full pointer-events-none">
        <div className="flex items-center justify-between px-6 pt-10 pointer-events-auto">
          <Link
            href="/"
            className="text-[36px] font-semibold leading-none"
            style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-dm-sans)' }}
            onMouseEnter={handleNameMouseEnter}
            onMouseLeave={handleNameMouseLeave}
            onMouseDown={handleNameMouseDown}
            onMouseUp={handleNameMouseUp}
          >
            Ronak Ramnani
          </Link>
          <CloverIcon rotation={cloverRotation} offset={cloverOffset} dragging={isDragging} onMouseDown={handleCloverMouseDown} />
        </div>
        <div className="flex-1" />
        <div className="flex items-start justify-center gap-12 px-6 pb-6 pointer-events-auto">
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
