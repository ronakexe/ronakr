import Link from 'next/link'
import { listSets } from '@/lib/flashcards'
import { MUTED, PAGE, TEXT_BUTTON, UI } from './_components/ui'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Flashcards — Ronak Ramnani', robots: { index: false } }

export default async function FlashcardsHome() {
  const sets = await listSets()

  return (
    <main className={PAGE} style={UI}>
      <div className="flex max-w-[900px] items-baseline justify-between gap-8">
        <h1 className="text-[32px] md:text-[48px]" style={{ fontWeight: 700 }}>
          Flashcards
        </h1>
        <Link href="/flashcards-draft/new" className={TEXT_BUTTON} style={{ color: 'var(--name)', fontWeight: 600 }}>
          New
        </Link>
      </div>

      {sets.length === 0 ? (
        <p className="mt-10 text-[18px]" style={MUTED}>
          No sets yet.
        </p>
      ) : (
        <ul className="mt-10 max-w-[900px]">
          {sets.map((set) => (
            <li key={set.id} className="border-b" style={{ borderColor: 'var(--border)' }}>
              <Link
                href={`/flashcards-draft/${set.id}`}
                className="flex items-baseline justify-between gap-6 py-5 transition-opacity hover:opacity-60"
              >
                <span className="text-[18px] md:text-[21px]" style={{ fontWeight: 600 }}>
                  {set.title}
                </span>
                <span className="shrink-0 text-[15px] tabular-nums" style={MUTED}>
                  {set.cards.length} {set.cards.length === 1 ? 'term' : 'terms'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
