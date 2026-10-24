import { del, get, list, put } from '@vercel/blob'

export type Card = { term: string; definition: string }
export type FlashcardSet = {
  id: string
  title: string
  cards: Card[]
  createdAt: string
  updatedAt: string
}

// One private JSON blob per set — no database. Reads skip the CDN cache so an
// edit shows up immediately.
const PREFIX = 'flashcards/sets/'
const pathFor = (id: string) => `${PREFIX}${id}.json`
// The project already has another Blob store on the default BLOB_ env vars,
// so this one is connected with the FLASHCARDS_ prefix (store ID + Vercel OIDC, no token).
const storeId = () => process.env.FLASHCARDS_STORE_ID

export async function listSets(): Promise<FlashcardSet[]> {
  const { blobs } = await list({ prefix: PREFIX, storeId: storeId() })
  const sets = await Promise.all(blobs.map((b) => readBlob(b.pathname)))
  return sets
    .filter((s): s is FlashcardSet => s !== null)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export async function getSet(id: string): Promise<FlashcardSet | null> {
  if (!/^[a-z0-9-]+$/.test(id)) return null
  return readBlob(pathFor(id))
}

export async function saveSet(set: FlashcardSet) {
  await put(pathFor(set.id), JSON.stringify(set), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    storeId: storeId(),
  })
}

export async function deleteSet(id: string) {
  await del(pathFor(id), { storeId: storeId() })
}

async function readBlob(pathname: string): Promise<FlashcardSet | null> {
  const result = await get(pathname, { access: 'private', useCache: false, storeId: storeId() })
  if (!result || result.statusCode !== 200) return null
  return (await new Response(result.stream).json()) as FlashcardSet
}

export function checkPassword(req: Request) {
  const expected = process.env.FLASHCARDS_PASSWORD
  return !!expected && req.headers.get('x-flashcards-password') === expected
}

// Accepts untrusted JSON and returns a clean set body, or null if unusable.
export function parseBody(body: unknown): { title: string; cards: Card[] } | null {
  if (!body || typeof body !== 'object') return null
  const { title, cards } = body as { title?: unknown; cards?: unknown }
  if (typeof title !== 'string' || !title.trim() || !Array.isArray(cards)) return null
  const clean = cards
    .filter((c): c is Card => typeof c?.term === 'string' && typeof c?.definition === 'string')
    .map((c) => ({ term: c.term.trim(), definition: c.definition.trim() }))
    .filter((c) => c.term || c.definition)
  if (clean.length === 0) return null
  return { title: title.trim(), cards: clean }
}

export function slugId(title: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
  return `${slug || 'set'}-${Math.random().toString(36).slice(2, 7)}`
}
