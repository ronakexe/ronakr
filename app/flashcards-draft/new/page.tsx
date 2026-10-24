'use client'

import Link from 'next/link'
import PasswordGate from '../_components/PasswordGate'
import SetEditor from '../_components/SetEditor'
import { MUTED, PAGE, TEXT_BUTTON, UI } from '../_components/ui'

export default function NewSetPage() {
  return (
    <main className={PAGE} style={UI}>
      <Link href="/flashcards-draft" className={`${TEXT_BUTTON} text-[15px]`} style={MUTED}>
        Flashcards
      </Link>
      <div className="mt-6">
        <PasswordGate>{(password) => <SetEditor password={password} />}</PasswordGate>
      </div>
    </main>
  )
}
