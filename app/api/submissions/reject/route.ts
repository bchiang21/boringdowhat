import { unlinkSync, existsSync } from 'fs'
import path from 'path'

const PENDING_DIR = path.join(process.cwd(), 'content/pending')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) return new Response('Missing token', { status: 400 })

  const pendingPath = path.join(PENDING_DIR, `${token}.json`)
  if (!existsSync(pendingPath)) {
    return new Response(html('Already processed', 'This submission has already been approved or rejected.'), {
      status: 404,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  unlinkSync(pendingPath)

  return new Response(html('Submission rejected', 'The submission has been removed and will not be published.'), {
    headers: { 'Content-Type': 'text/html' },
  })
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
