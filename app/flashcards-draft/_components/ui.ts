// Shared class strings for the flashcards pages. Everything is plain text on
// the page background — no boxes, no rounded containers.
export const PAGE = 'px-5 pb-24 pt-10 md:px-8 md:pt-14 home:px-14'
export const UI = { fontFamily: 'var(--font-dm-sans)' } as const
export const BODY = { fontFamily: 'var(--font-garamond)' } as const
export const TEXT_BUTTON =
  'cursor-pointer text-[16px] underline-offset-4 transition-opacity hover:underline disabled:cursor-default disabled:opacity-40 disabled:no-underline'
export const MUTED = { color: 'var(--muted-foreground)' } as const
export const INPUT =
  'w-full border-0 border-b bg-transparent py-2 text-[18px] outline-none placeholder:opacity-40 focus:border-[var(--text)]'
export const INPUT_STYLE = { ...UI, borderColor: 'var(--border)', color: 'var(--text)' } as const

export function shuffle<T>(items: T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
