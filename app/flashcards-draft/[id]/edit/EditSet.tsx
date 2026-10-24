'use client'

import type { Card } from '@/lib/flashcards'
import PasswordGate from '../../_components/PasswordGate'
import SetEditor from '../../_components/SetEditor'

export default function EditSet({ set }: { set: { id: string; title: string; cards: Card[] } }) {
  return <PasswordGate>{(password) => <SetEditor password={password} initial={set} />}</PasswordGate>
}
