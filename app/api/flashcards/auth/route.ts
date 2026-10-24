import { NextResponse } from 'next/server'
import { checkPassword } from '@/lib/flashcards'

export async function POST(req: Request) {
  return checkPassword(req)
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: 'Wrong password' }, { status: 401 })
}
