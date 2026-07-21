import Link from 'next/link'
import CloverIcon from '@/components/CloverIcon'

const LABELS = ['initiatives', 'pieces', 'finds']

// Rendered once in the root layout and never unmounted — PageShell's
// padding-top (not this component's own) moves the whole block between a
// vertically-centered (home) and top-docked (everywhere else) position via
// a plain CSS transition, so it stays put across navigation.
export default function SiteChrome() {
  return (
    <header className="px-8 md:px-16">
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

      <nav className="mt-4 hidden grid-cols-3 gap-x-12 md:grid">
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
