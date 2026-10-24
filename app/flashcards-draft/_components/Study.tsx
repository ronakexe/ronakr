'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Card } from '@/lib/flashcards'
import { BODY, INPUT, INPUT_STYLE, MUTED, TEXT_BUTTON, UI, shuffle } from './ui'

type Mode = 'flashcards' | 'learn'

export default function Study({ cards }: { cards: Card[] }) {
  const [mode, setMode] = useState<Mode>('flashcards')

  return (
    <div style={UI}>
      <div className="flex gap-8">
        {(['flashcards', 'learn'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className="section-label cursor-pointer text-[13px] transition-opacity hover:opacity-100 md:text-[14px]"
            style={{ opacity: mode === m ? 1 : 0.4 }}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="mt-8">{mode === 'flashcards' ? <Flashcards cards={cards} /> : <Learn cards={cards} />}</div>
    </div>
  )
}

// Shuffles once after mount, so the server render and hydration agree.
function useShuffled(cards: Card[]) {
  const [order, setOrder] = useState<Card[] | null>(null)
  useEffect(() => setOrder(shuffle(cards)), [cards])
  return [order, () => setOrder(shuffle(cards))] as const
}

function Flashcards({ cards }: { cards: Card[] }) {
  const [order, reshuffle] = useShuffled(cards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const total = cards.length
  const done = index >= total

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.key === 'ArrowRight') {
        setIndex((i) => Math.min(i + 1, total))
        setFlipped(false)
      } else if (e.key === 'ArrowLeft') {
        setIndex((i) => Math.max(i - 1, 0))
        setFlipped(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  if (!order) return null

  if (done) {
    return (
      <div className="py-16">
        <p className="text-[24px] md:text-[36px]" style={{ ...UI, fontWeight: 600 }}>
          That’s all {total}.
        </p>
        <div className="mt-6 flex gap-8">
          <button
            type="button"
            className={TEXT_BUTTON}
            onClick={() => {
              reshuffle()
              setIndex(0)
              setFlipped(false)
            }}
          >
            Go again
          </button>
          <button type="button" className={TEXT_BUTTON} style={MUTED} onClick={() => setIndex(total - 1)}>
            Back
          </button>
        </div>
      </div>
    )
  }

  const card = order[index]
  return (
    <div className="max-w-[900px]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[280px] w-full cursor-pointer flex-col items-start justify-center py-10 text-left md:min-h-[360px]"
        aria-label={flipped ? 'Show term' : 'Show definition'}
      >
        <span className="section-label text-[12px]" style={MUTED}>
          {flipped ? 'Definition' : 'Term'}
        </span>
        <span
          className="mt-4 whitespace-pre-wrap text-[32px] leading-tight md:text-[48px]"
          style={flipped ? { ...BODY } : { ...UI, fontWeight: 700 }}
        >
          {(flipped ? card.definition : card.term) || '—'}
        </span>
      </button>

      <div className="flex items-baseline gap-8 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
        <button
          type="button"
          className={TEXT_BUTTON}
          disabled={index === 0}
          onClick={() => {
            setIndex(index - 1)
            setFlipped(false)
          }}
        >
          Previous
        </button>
        <span className="text-[15px] tabular-nums" style={MUTED}>
          {index + 1} / {total}
        </span>
        <button
          type="button"
          className={TEXT_BUTTON}
          onClick={() => {
            setIndex(index + 1)
            setFlipped(false)
          }}
        >
          Next
        </button>
        <span className="ml-auto hidden text-[13px] md:inline" style={MUTED}>
          Space to flip, arrows to move
        </span>
      </div>
    </div>
  )
}

// ── Learn ───────────────────────────────────────────────────────────────────
// Like Quizlet's Learn: each card is asked as multiple choice first, then as a
// written answer once you've got it right. Misses go back into the queue a few
// cards later. A card is mastered after a correct written answer.

type Item = { card: Card; stage: 'choice' | 'written' }
type Feedback = { correct: boolean; given: string } | null

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()

function Learn({ cards }: { cards: Card[] }) {
  const [queue, setQueue] = useState<Item[] | null>(null)
  const [mastered, setMastered] = useState(0)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [typed, setTyped] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const continueRef = useRef<HTMLButtonElement>(null)
  const canChoose = new Set(cards.map((c) => c.definition)).size >= 2

  const start = () => {
    setQueue(shuffle(cards).map((card) => ({ card, stage: canChoose ? 'choice' : 'written' })))
    setMastered(0)
    setFeedback(null)
    setTyped('')
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(start, [cards])

  const current = queue?.[0]

  // Up to four definitions, the right one included, reshuffled per question.
  const options = useMemo(() => {
    if (!current || current.stage !== 'choice') return []
    const others = shuffle([...new Set(cards.map((c) => c.definition))].filter((d) => d !== current.card.definition))
    return shuffle([current.card.definition, ...others.slice(0, 3)])
    // Recompute only when the question changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  useEffect(() => {
    if (feedback) continueRef.current?.focus()
    else if (current?.stage === 'written') inputRef.current?.focus()
  }, [feedback, current])

  function answer(given: string) {
    if (!current || feedback) return
    const correct =
      current.stage === 'choice'
        ? given === current.card.definition
        : normalize(given) === normalize(current.card.definition)
    setFeedback({ correct, given })
  }

  function advance(correct: boolean) {
    if (!queue || !current) return
    const rest = queue.slice(1)
    if (correct && current.stage === 'written') {
      setMastered((m) => m + 1)
      setQueue(rest)
    } else {
      const next: Item = correct ? { card: current.card, stage: 'written' } : current
      // Bring it back a few questions later (or at the end of a short queue).
      const at = Math.min(rest.length, correct ? 4 : 2)
      setQueue([...rest.slice(0, at), next, ...rest.slice(at)])
    }
    setFeedback(null)
    setTyped('')
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (feedback || current?.stage !== 'choice') return
      const n = Number(e.key)
      if (n >= 1 && n <= options.length) answer(options[n - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!queue) return null
  const total = cards.length

  const progress = (
    <div className="flex items-baseline gap-4 text-[15px] tabular-nums" style={MUTED}>
      <span>
        {mastered} / {total} learned
      </span>
      <span className="relative h-px flex-1" style={{ background: 'var(--border)' }}>
        <span
          className="absolute inset-y-0 left-0 transition-[width] duration-300"
          style={{ width: `${(mastered / total) * 100}%`, background: 'var(--name)' }}
        />
      </span>
    </div>
  )

  if (!current) {
    return (
      <div className="max-w-[900px]">
        {progress}
        <p className="mt-16 text-[24px] md:text-[36px]" style={{ ...UI, fontWeight: 600 }}>
          You learned all {total}.
        </p>
        <button type="button" className={`${TEXT_BUTTON} mt-6`} onClick={start}>
          Start over
        </button>
      </div>
    )
  }

  const color = (def: string) => {
    if (!feedback) return undefined
    if (def === current.card.definition) return 'var(--color-green)'
    if (def === feedback.given) return 'var(--name)'
    return undefined
  }

  return (
    <div className="max-w-[900px]">
      {progress}

      <div className="mt-12">
        <span className="section-label text-[12px]" style={MUTED}>
          Term
        </span>
        <p className="mt-3 whitespace-pre-wrap text-[32px] leading-tight md:text-[48px]" style={{ ...UI, fontWeight: 700 }}>
          {current.card.term || '—'}
        </p>
      </div>

      <div className="mt-12">
        <span className="section-label text-[12px]" style={MUTED}>
          {current.stage === 'choice' ? 'Choose the definition' : 'Type the definition'}
        </span>

        {current.stage === 'choice' ? (
          <ol className="mt-4">
            {options.map((def, i) => (
              <li key={def}>
                <button
                  type="button"
                  onClick={() => answer(def)}
                  disabled={!!feedback}
                  className="flex w-full cursor-pointer items-baseline gap-4 border-b py-4 text-left transition-opacity hover:opacity-70 disabled:cursor-default disabled:hover:opacity-100"
                  style={{
                    borderColor: 'var(--border)',
                    color: color(def),
                    opacity: feedback && !color(def) ? 0.35 : undefined,
                  }}
                >
                  <span className="w-4 shrink-0 text-[14px] tabular-nums" style={MUTED}>
                    {i + 1}
                  </span>
                  <span className="text-[18px]" style={BODY}>
                    {def || '—'}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <form
            className="mt-2"
            onSubmit={(e) => {
              e.preventDefault()
              answer(typed)
            }}
          >
            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={!!feedback}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className={INPUT}
              style={{
                ...INPUT_STYLE,
                ...BODY,
                color: feedback ? (feedback.correct ? 'var(--color-green)' : 'var(--name)') : 'var(--text)',
              }}
            />
            {!feedback && (
              <div className="mt-4 flex gap-8">
                <button type="submit" className={TEXT_BUTTON} disabled={!typed.trim()}>
                  Answer
                </button>
                <button type="button" className={TEXT_BUTTON} style={MUTED} onClick={() => answer('')}>
                  Don’t know
                </button>
              </div>
            )}
          </form>
        )}
      </div>

      {feedback && (
        <div className="mt-8">
          <p className="text-[18px]" style={{ ...UI, fontWeight: 600, color: feedback.correct ? 'var(--color-green)' : 'var(--name)' }}>
            {feedback.correct ? 'Correct.' : 'Not quite.'}
          </p>
          {!feedback.correct && current.stage === 'written' && (
            <p className="mt-2 text-[18px]" style={BODY}>
              <span style={MUTED}>Answer: </span>
              {current.card.definition}
            </p>
          )}
          <div className="mt-4 flex gap-8">
            <button ref={continueRef} type="button" className={TEXT_BUTTON} onClick={() => advance(feedback.correct)}>
              Continue
            </button>
            {!feedback.correct && current.stage === 'written' && feedback.given.trim() && (
              <button type="button" className={TEXT_BUTTON} style={MUTED} onClick={() => advance(true)}>
                I was right
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
