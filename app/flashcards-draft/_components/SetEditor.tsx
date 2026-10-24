'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Card } from '@/lib/flashcards'
import { forgetPassword } from './PasswordGate'
import { BODY, INPUT, INPUT_STYLE, MUTED, TEXT_BUTTON, UI } from './ui'

type Props = {
  password: string
  initial?: { id: string; title: string; cards: Card[] }
}

const blank = (): Card => ({ term: '', definition: '' })

// Splits pasted text into cards: one card per line, term and definition
// separated by a tab (what Quizlet and spreadsheets export), or failing that
// by " - " or a comma.
function parseImport(text: string): Card[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const sep = line.includes('\t') ? '\t' : line.includes(' - ') ? ' - ' : ','
      const at = line.indexOf(sep)
      if (at === -1) return { term: line, definition: '' }
      return { term: line.slice(0, at).trim(), definition: line.slice(at + sep.length).trim() }
    })
}

export default function SetEditor({ password, initial }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [cards, setCards] = useState<Card[]>(initial?.cards ?? [blank(), blank(), blank()])
  const [importing, setImporting] = useState(false)
  const [importText, setImportText] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const update = (i: number, field: keyof Card, value: string) =>
    setCards((cs) => cs.map((c, j) => (j === i ? { ...c, [field]: value } : c)))

  function applyImport() {
    const parsed = parseImport(importText)
    if (parsed.length === 0) return
    // Replace any untouched blank rows rather than appending after them.
    setCards((cs) => [...cs.filter((c) => c.term || c.definition), ...parsed])
    setImportText('')
    setImporting(false)
  }

  async function send(method: 'POST' | 'PUT' | 'DELETE') {
    setSaving(true)
    setError('')
    const res = await fetch(initial ? `/api/flashcards/${initial.id}` : '/api/flashcards', {
      method,
      headers: { 'content-type': 'application/json', 'x-flashcards-password': password },
      body: method === 'DELETE' ? undefined : JSON.stringify({ title, cards }),
    })
    const data = await res.json().catch(() => ({}))
    setSaving(false)
    if (res.status === 401) {
      forgetPassword()
      window.location.reload()
      return
    }
    if (!res.ok) {
      setError(data.error ?? 'Something went wrong.')
      return
    }
    router.push(method === 'DELETE' ? '/flashcards-draft' : `/flashcards-draft/${data.id}`)
    router.refresh()
  }

  return (
    <div className="max-w-[900px]" style={UI}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-label="Title"
        className={`${INPUT} text-[32px] md:text-[48px]`}
        style={{ ...INPUT_STYLE, fontWeight: 700 }}
      />

      <div className="mt-6 flex gap-6">
        <button type="button" className={TEXT_BUTTON} onClick={() => setImporting((v) => !v)}>
          {importing ? 'Cancel import' : 'Import'}
        </button>
      </div>

      {importing && (
        <div className="mt-4">
          <p className="text-[16px]" style={{ ...BODY, ...MUTED }}>
            One card per line. Separate term and definition with a tab, “ - ”, or a comma.
          </p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={8}
            autoFocus
            placeholder={'hola\thello\ngracias\tthank you'}
            className={`${INPUT} mt-2 resize-y`}
            style={INPUT_STYLE}
          />
          <button type="button" className={`${TEXT_BUTTON} mt-3`} onClick={applyImport} disabled={!importText.trim()}>
            Add {parseImport(importText).length || ''} cards
          </button>
        </div>
      )}

      <ol className="mt-10">
        {cards.map((card, i) => (
          <li key={i} className="grid grid-cols-[28px_1fr] gap-x-4 py-4 md:grid-cols-[28px_1fr_1fr_auto] md:gap-x-8">
            <span className="pt-3 text-[14px] tabular-nums" style={MUTED}>
              {i + 1}
            </span>
            <label className="block">
              <input
                value={card.term}
                onChange={(e) => update(i, 'term', e.target.value)}
                className={INPUT}
                style={INPUT_STYLE}
              />
              <span className="section-label mt-1 block text-[11px]" style={MUTED}>
                Term
              </span>
            </label>
            <label className="col-start-2 mt-3 block md:col-start-3 md:mt-0">
              <input
                value={card.definition}
                onChange={(e) => update(i, 'definition', e.target.value)}
                onKeyDown={(e) => {
                  // Tab out of the last definition starts a new card, like Quizlet.
                  if (e.key === 'Tab' && !e.shiftKey && i === cards.length - 1) setCards((cs) => [...cs, blank()])
                }}
                className={INPUT}
                style={INPUT_STYLE}
              />
              <span className="section-label mt-1 block text-[11px]" style={MUTED}>
                Definition
              </span>
            </label>
            <button
              type="button"
              className={`${TEXT_BUTTON} col-start-2 mt-2 justify-self-start text-[14px] md:col-start-4 md:mt-0 md:pt-2`}
              style={MUTED}
              onClick={() => setCards((cs) => cs.filter((_, j) => j !== i))}
              disabled={cards.length === 1}
            >
              Remove
            </button>
          </li>
        ))}
      </ol>

      <button type="button" className={`${TEXT_BUTTON} mt-4`} onClick={() => setCards((cs) => [...cs, blank()])}>
        Add card
      </button>

      <div className="mt-14 flex flex-wrap items-baseline gap-8">
        <button
          type="button"
          className={`${TEXT_BUTTON} text-[18px]`}
          style={{ color: 'var(--name)', fontWeight: 600 }}
          disabled={saving}
          onClick={() => send(initial ? 'PUT' : 'POST')}
        >
          {saving ? 'Saving…' : initial ? 'Save' : 'Create'}
        </button>
        {initial && (
          <button
            type="button"
            className={TEXT_BUTTON}
            style={MUTED}
            disabled={saving}
            onClick={() => confirm(`Delete “${initial.title}”?`) && send('DELETE')}
          >
            Delete set
          </button>
        )}
        {error && (
          <span className="text-[15px]" style={MUTED}>
            {error}
          </span>
        )}
      </div>
    </div>
  )
}
