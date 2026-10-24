import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSet } from '@/lib/flashcards'
import Study from '../_components/Study'
import { BODY, MUTED, PAGE, TEXT_BUTTON, UI } from '../_components/ui'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const set = await getSet((await params).id)
  return { title: set ? `${set.title} — Flashcards` : 'Flashcards', robots: { index: false } }
}

export default async function SetPage({ params }: Props) {
  const set = await getSet((await params).id)
  if (!set) notFound()

  return (
    <main className={PAGE} style={UI}>
      <div className="flex max-w-[900px] items-baseline justify-between gap-8">
        <Link href="/flashcards-draft" className={`${TEXT_BUTTON} text-[15px]`} style={MUTED}>
          Flashcards
        </Link>
        <Link href={`/flashcards-draft/${set.id}/edit`} className={`${TEXT_BUTTON} text-[15px]`} style={MUTED}>
          Edit
        </Link>
      </div>
      <h1 className="mt-6 text-[32px] md:text-[48px]" style={{ fontWeight: 700 }}>
        {set.title}
      </h1>

      <div className="mt-10">
        <Study cards={set.cards} />
      </div>

      <section className="mt-24 max-w-[900px]">
        <h2 className="section-label text-[13px] md:text-[14px]">
          Terms in this set ({set.cards.length})
        </h2>
        <ul className="mt-4">
          {set.cards.map((card, i) => (
            <li
              key={i}
              className="grid gap-1 border-b py-4 md:grid-cols-[1fr_2fr] md:gap-8"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="text-[18px]" style={{ fontWeight: 600 }}>
                {card.term}
              </span>
              <span className="whitespace-pre-wrap text-[18px]" style={BODY}>
                {card.definition}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
