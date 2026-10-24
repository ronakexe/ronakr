import { NextResponse } from 'next/server'
import { checkPassword, parseBody, saveSet, slugId } from '@/lib/flashcards'

export async function POST(req: Request) {
  if (!checkPassword(req)) return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  const body = parseBody(await req.json().catch(() => null))
  if (!body) return NextResponse.json({ error: 'Add a title and at least one card' }, { status: 400 })
  const now = new Date().toISOString()
  const set = { id: slugId(body.title), ...body, createdAt: now, updatedAt: now }
  await saveSet(set)
  return NextResponse.json({ id: set.id })
}
