import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSet } from '@/lib/flashcards'
import EditSet from './EditSet'
import { MUTED, PAGE, TEXT_BUTTON, UI } from '../../_components/ui'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Edit — Flashcards', robots: { index: false } }

export default async function EditSetPage({ params }: { params: Promise<{ id: string }> }) {
  const set = await getSet((await params).id)
  if (!set) notFound()

  return (
    <main className={PAGE} style={UI}>
      <Link href={`/flashcards-draft/${set.id}`} className={`${TEXT_BUTTON} text-[15px]`} style={MUTED}>
        {set.title}
      </Link>
      <div className="mt-6">
        <EditSet set={{ id: set.id, title: set.title, cards: set.cards }} />
      </div>
    </main>
  )
}
