'use client'

import { useEffect, useState } from 'react'
import { INPUT, INPUT_STYLE, MUTED, TEXT_BUTTON, UI } from './ui'

const STORAGE_KEY = 'flashcards-password'

export function forgetPassword() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

// Asks for the password once, checks it with the server, then remembers it in
// this browser. Children get the password to send with each write.
export default function PasswordGate({ children }: { children: (password: string) => React.ReactNode }) {
  const [password, setPassword] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    try {
      setPassword(localStorage.getItem(STORAGE_KEY))
    } catch {}
    setReady(true)
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setChecking(true)
    setError('')
    const res = await fetch('/api/flashcards/auth', {
      method: 'POST',
      headers: { 'x-flashcards-password': draft },
    })
    setChecking(false)
    if (!res.ok) {
      setError('That’s not it.')
      return
    }
    try {
      localStorage.setItem(STORAGE_KEY, draft)
    } catch {}
    setPassword(draft)
  }

  if (!ready) return null
  if (password) return <>{children(password)}</>

  return (
    <form onSubmit={submit} className="max-w-[360px]" style={UI}>
      <label className="section-label block text-[13px]" htmlFor="fc-password">
        Password
      </label>
      <input
        id="fc-password"
        type="password"
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className={`${INPUT} mt-2`}
        style={INPUT_STYLE}
      />
      <div className="mt-4 flex items-baseline gap-6">
        <button type="submit" className={TEXT_BUTTON} disabled={!draft || checking}>
          {checking ? 'Checking…' : 'Continue'}
        </button>
        {error && (
          <span className="text-[15px]" style={MUTED}>
            {error}
          </span>
        )}
      </div>
    </form>
  )
}
