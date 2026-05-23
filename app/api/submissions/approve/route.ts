import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs'
import path from 'path'

const PENDING_DIR = path.join(process.cwd(), 'content/pending')
const LISTINGS_DIR = path.join(process.cwd(), 'content/listings')

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) return new Response('Missing token', { status: 400 })

  const pendingPath = path.join(PENDING_DIR, `${token}.json`)
  if (!existsSync(pendingPath)) {
    return new Response(html('Already processed', 'This submission has already been approved or rejected.'), {
      status: 404,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const submission = JSON.parse(readFileSync(pendingPath, 'utf-8'))

  // Strip submission-only fields
  const { token: _t, submittedAt: _s, contactName: _cn, contactEmail: _ce, ...listing } = submission

  // Ensure unique slug
  let slug: string = listing.slug
  let counter = 1
  if (!existsSync(LISTINGS_DIR)) mkdirSync(LISTINGS_DIR, { recursive: true })
  while (existsSync(path.join(LISTINGS_DIR, `${slug}.json`))) {
    slug = `${listing.slug}-${counter++}`
  }

  const published = { ...listing, id: slug, slug, featured: false }
  writeFileSync(path.join(LISTINGS_DIR, `${slug}.json`), JSON.stringify(published, null, 2))
  unlinkSync(pendingPath)

  return Response.redirect(`${origin}/admin`, 302)
}

function html(title: string, message: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f9fafb;margin:0;">
  <div style="text-align:center;padding:40px;">
    <h1 style="color:#111;font-size:20px;margin-bottom:8px;">${title}</h1>
    <p style="color:#6b7280;margin-bottom:24px;">${message}</p>
    <a href="/admin" style="color:#059669;text-decoration:none;font-size:14px;">← Back to admin</a>
  </div>
</body></html>`
}
