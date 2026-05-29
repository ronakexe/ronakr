import Link from 'next/link'
import CloverIcon from '@/components/CloverIcon'

export default function Home() {
  return (
    <main className="h-screen w-screen">
      {/* Desktop layout */}
      <nav className="hidden md:flex w-full h-full items-center justify-between px-8">
        <span
          className="text-[50px] font-semibold leading-none whitespace-nowrap"
          style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-dm-sans)' }}
        >
          Ronak Ramnani
        </span>
        <div className="flex items-start gap-12">
          <NavItem href="/builds" label="builds" icon={<TriangleIcon />} />
          <NavItem href="/pieces" label="pieces" icon={<DiamondIcon />} />
          <NavItem href="/finds" label="finds" icon={<CircleIcon />} />
        </div>
        <CloverIcon />
      </nav>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col h-full">
        {/* Name + Clover — top row */}
        <div className="flex items-center justify-between px-6 pt-10">
          <span
            className="text-[36px] font-semibold leading-none"
            style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Ronak Ramnani
          </span>
          <CloverIcon />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Nav menu — bottom */}
        <div className="flex items-start justify-center gap-12 px-6 pb-14">
          <NavItem href="/builds" label="builds" icon={<TriangleIcon />} />
          <NavItem href="/pieces" label="pieces" icon={<DiamondIcon />} />
          <NavItem href="/finds" label="finds" icon={<CircleIcon />} />
        </div>
      </div>
    </main>
  )
}

function NavItem({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: React.ReactNode
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 group">
      <span
        className="text-[21px] leading-none text-black"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        {label}
      </span>
      <span className="flex items-center justify-center">{icon}</span>
    </Link>
  )
}

function TriangleIcon() {
  return (
    <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
      <polygon points="5,0 10,9 0,9" fill="black" />
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
        fill="black"
        transform="rotate(-15 4.5 4.5)"
      />
    </svg>
  )
}

function CircleIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <circle cx="4.5" cy="4.5" r="4.5" fill="black" />
    </svg>
  )
}
