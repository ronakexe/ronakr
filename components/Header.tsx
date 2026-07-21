'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CloverIcon from '@/components/CloverIcon'

const LABELS = ['initiatives', 'pieces', 'finds']

// The homepage renders its own full-bleed hero, so the compact header only
// applies to inner pages (wireframe 2).
export default function Header() {
  const pathname = usePathname()
  if (pathname === '/') return null

  return (
    <header className="px-8 pt-8 md:px-16 md:pt-10">
      <div className="flex items-center justify-between gap-8">
        <Link
          href="/"
          className="text-[32px] leading-none md:text-[44px]"
          style={{ fontFamily: "'Redaction 35', serif", color: 'var(--name)' }}
        >
          Ronak Ramnani
        </Link>
        <CloverIcon width={44} height={42} className="shrink-0" />
      </div>

      <nav className="mt-4 grid grid-cols-3 gap-x-12">
        {LABELS.map((label) => (
          <Link
            key={label}
            href="/"
            className="section-label text-[13px] transition-opacity hover:opacity-60 md:text-[14px]"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
