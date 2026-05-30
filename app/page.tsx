'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CloverIcon from '@/components/CloverIcon'

export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center md:items-start md:pt-8">
      <nav className="w-full flex items-center justify-between px-8">
        {/* Name — left */}
        <span
          className="text-[50px] font-semibold leading-none whitespace-nowrap"
          style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-dm-sans)' }}
        >
          Ronak Ramnani
        </span>

        {/* Nav links — center */}
        <div className="flex items-start gap-12">
          <NavItem
            href="/builds"
            label="builds"
            icon={<TriangleIcon active={false} />}
            activeIcon={<TriangleIcon active={true} />}
          />
          <NavItem
            href="/pieces"
            label="pieces"
            icon={<DiamondIcon active={false} />}
            activeIcon={<DiamondIcon active={true} />}
          />
          <NavItem
            href="/finds"
            label="finds"
            icon={<EllipseIcon active={false} />}
            activeIcon={<EllipseIcon active={true} />}
          />
        </div>

        {/* Clover logo — right */}
        <CloverIcon />
      </nav>
    </main>
  )
}

function NavItem({
  href,
  label,
  icon,
  activeIcon,
}: {
  href: string
  label: string
  icon: React.ReactNode
  activeIcon: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center gap-1 ${isActive ? 'flex-col-reverse' : 'flex-col'}`}
    >
      <span
        className="text-[21px] leading-none"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          color: isActive ? 'var(--color-green)' : 'black',
        }}
      >
        {label}
      </span>
      <span className="flex items-center justify-center">
        {isActive ? activeIcon : icon}
      </span>
    </Link>
  )
}

function TriangleIcon({ active }: { active: boolean }) {
  const rotation = active ? 159.14 : 125.14
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <polygon points="5,0 10,9 0,9" fill={active ? 'var(--color-green)' : 'black'} />
    </svg>
  )
}

function DiamondIcon({ active }: { active: boolean }) {
  const rotation = active ? 27.03 : 14.88
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <rect
        x="0.5"
        y="0.5"
        width="8"
        height="8"
        fill={active ? 'var(--color-green)' : 'black'}
      />
    </svg>
  )
}

function EllipseIcon({ active }: { active: boolean }) {
  const rotation = active ? 72.83 : 33.27
  return (
    <svg
      width="10.5"
      height="9.75"
      viewBox="0 0 10.5 9.75"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <ellipse
        cx="5.25"
        cy="4.875"
        rx="5.25"
        ry="4.875"
        fill={active ? 'var(--color-green)' : 'black'}
      />
    </svg>
  )
}
