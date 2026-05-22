import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

const DIR = path.join(process.cwd(), 'content/listings')

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const filepath = path.join(DIR, `${slug}.json`)
  if (!existsSync(filepath)) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(JSON.parse(readFileSync(filepath, 'utf-8')))
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const body = await request.json()
  writeFileSync(path.join(DIR, `${slug}.json`), JSON.stringify(body, null, 2))
  return Response.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { unlinkSync } = await import('fs')
  const filepath = path.join(DIR, `${slug}.json`)
  if (!existsSync(filepath)) return Response.json({ error: 'Not found' }, { status: 404 })
  unlinkSync(filepath)
  return Response.json({ ok: true })
}
