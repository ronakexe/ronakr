import { NextResponse } from 'next/server'
import { checkPassword, deleteSet, getSet, parseBody, saveSet } from '@/lib/flashcards'

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: Request, { params }: Ctx) {
  if (!checkPassword(req)) return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  const existing = await getSet((await params).id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = parseBody(await req.json().catch(() => null))
  if (!body) return NextResponse.json({ error: 'Add a title and at least one card' }, { status: 400 })
  await saveSet({ ...existing, ...body, updatedAt: new Date().toISOString() })
  return NextResponse.json({ id: existing.id })
}

export async function DELETE(req: Request, { params }: Ctx) {
  if (!checkPassword(req)) return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  const existing = await getSet((await params).id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await deleteSet(existing.id)
  return NextResponse.json({ ok: true })
}
