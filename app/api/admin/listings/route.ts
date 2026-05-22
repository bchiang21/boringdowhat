import { readdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

const DIR = path.join(process.cwd(), 'content/listings')

export async function GET() {
  const files = readdirSync(DIR).filter(f => f.endsWith('.json'))
  const listings = files.map(f => JSON.parse(readFileSync(path.join(DIR, f), 'utf-8')))
  return Response.json(listings)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.slug) return Response.json({ error: 'slug is required' }, { status: 400 })

  const filepath = path.join(DIR, `${body.slug}.json`)
  writeFileSync(filepath, JSON.stringify(body, null, 2))
  return Response.json({ ok: true }, { status: 201 })
}
