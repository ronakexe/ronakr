'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CloverIcon from '@/components/CloverIcon'

const LABELS = ['initiatives', 'pieces', 'finds'] as const

// Which section label a route belongs to — null on the home page, where
// all three still show since the index lists every section at once.
function activeSection(pathname: string) {
  if (pathname.startsWith('/initiatives')) return 'initiatives'
  if (pathname.startsWith('/pieces')) return 'pieces'
  if (pathname.startsWith('/finds')) return 'finds'
  return null
}

// Rendered once in the root layout and never unmounted — PageShell's
// padding-top (not this component's own) moves the whole block between a
// vertically-centered (home) and top-docked (everywhere else) position via
// a plain CSS transition, so it stays put across navigation.
export default function SiteChrome() {
  const pathname = usePathname()
  const active = activeSection(pathname)

  return (
    <header className="px-8 home:px-14">
      <div className="flex items-center justify-between gap-8">
        <Link
          href="/"
          className="text-[32px] leading-none md:text-[44px]"
          style={{ fontFamily: "'Redaction 50', serif", color: 'var(--name)' }}
        >
          Ronak Ramnani
        </Link>
        <CloverIcon width={44} height={42} className="shrink-0" />
      </div>

      {/* Switches at the custom `home` breakpoint alongside the grid on the
          home page — see app/page.tsx for why it isn't `md`. */}
      <nav className="mt-4 hidden grid-cols-3 gap-x-12 home:grid">
        {LABELS.map((label) =>
          active !== null && active !== label ? (
            // Empty grid cell keeps the remaining label's column aligned
            // with its position on the home page instead of shifting left.
            <span key={label} aria-hidden />
          ) : (
            <Link
              key={label}
              href="/"
              className="section-label text-[13px] transition-opacity hover:opacity-60 md:text-[14px]"
            >
              {label}
            </Link>
          ),
        )}
      </nav>
    </header>
  )
}
