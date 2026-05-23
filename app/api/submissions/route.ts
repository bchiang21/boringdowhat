import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const PENDING_DIR = path.join(process.cwd(), 'content/pending')

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.title?.trim()) return Response.json({ error: 'title is required' }, { status: 400 })
  if (!body.contactEmail?.trim()) return Response.json({ error: 'contactEmail is required' }, { status: 400 })

  if (!existsSync(PENDING_DIR)) mkdirSync(PENDING_DIR, { recursive: true })

  const token = randomUUID()
  const submission = {
    ...body,
    slug: toSlug(body.title),
    token,
    submittedAt: new Date().toISOString(),
  }

  writeFileSync(path.join(PENDING_DIR, `${token}.json`), JSON.stringify(submission, null, 2))

  await sendReviewEmail(submission).catch(err =>
    console.error('[submissions] Email failed:', err.message)
  )

  return Response.json({ ok: true }, { status: 201 })
}

async function sendReviewEmail(submission: Record<string, unknown>) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO, NEXT_PUBLIC_SITE_URL } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('[submissions] SMTP not configured — skipping email. Token:', submission.token)
    return
  }

  // Dynamic import to avoid bundling issues when nodemailer is unused
  const nodemailer = (await import('nodemailer')).default
  const siteUrl = NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const approveUrl = `${siteUrl}/api/submissions/approve?token=${submission.token}`
  const rejectUrl = `${siteUrl}/api/submissions/reject?token=${submission.token}`
  const adminUrl = `${siteUrl}/admin/pending/${submission.token}`

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  await transporter.sendMail({
    from: EMAIL_FROM ?? SMTP_USER,
    to: EMAIL_TO ?? 'hello@boringdowhat.com',
    subject: `New listing to review: ${submission.title}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #111;">
        <h2 style="margin: 0 0 4px; font-size: 18px;">New listing submission</h2>
        <p style="margin: 0 0 24px; color: #6b7280; font-size: 13px;">
          Submitted ${new Date(submission.submittedAt as string).toLocaleString('en-SG')}
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 28px;">
          ${row('Title', String(submission.title))}
          ${row('Provider', String(submission.provider ?? '—'))}
          ${row('Category', String(submission.category ?? '—'))}
          ${row('Location', String(submission.location ?? '—'))}
          ${row('Price', submission.price ? `SGD ${submission.price} / pax` : '—')}
          ${row('Duration', String(submission.duration ?? '—'))}
          ${row('Contact', `${submission.contactName ?? ''} &lt;${submission.contactEmail}&gt;`)}
        </table>

        <div style="display: flex; gap: 12px; margin-bottom: 28px;">
          <a href="${approveUrl}"
             style="display: inline-block; background: #059669; color: #fff; padding: 11px 22px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
            Approve &amp; publish
          </a>
          <a href="${rejectUrl}"
             style="display: inline-block; background: #f3f4f6; color: #374151; padding: 11px 22px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
            Reject
          </a>
        </div>

        <p style="font-size: 12px; color: #9ca3af; margin: 0;">
          Or <a href="${adminUrl}" style="color: #059669;">preview the full submission</a> in the admin panel.
        </p>
      </div>
    `,
  })
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 5px 0; color: #6b7280; width: 100px; vertical-align: top;">${label}</td>
      <td style="padding: 5px 0; font-weight: 500;">${value}</td>
    </tr>
  `
}
