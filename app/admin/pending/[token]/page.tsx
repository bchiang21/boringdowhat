import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const PENDING_DIR = path.join(process.cwd(), 'content/pending')

export default async function PendingDetail({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const filePath = path.join(PENDING_DIR, `${token}.json`)

  if (!fs.existsSync(filePath)) notFound()
  const s = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-8 text-sm">
        <Link href="/admin" className="text-gray-400 hover:text-gray-700 transition-colors">← Admin</Link>
        <span className="text-gray-200">/</span>
        <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">Pending review</span>
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-1">{s.title}</h1>
      <p className="text-sm text-gray-400 mb-8">
        Submitted {new Date(s.submittedAt).toLocaleString('en-SG')}
        {s.contactName && ` by ${s.contactName}`}
        {s.contactEmail && ` (${s.contactEmail})`}
      </p>

      {/* ── Actions ───────────────────────────────────────────── */}
      <div className="flex gap-3 mb-10">
        <a
          href={`/api/submissions/approve?token=${token}`}
          className="text-sm font-semibold bg-emerald-600 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Approve &amp; publish
        </a>
        <a
          href={`/api/submissions/reject?token=${token}`}
          className="text-sm font-semibold bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
        >
          Reject
        </a>
      </div>

      {/* ── Preview ───────────────────────────────────────────── */}
      <div className="space-y-6">
        {s.image && (
          <div className="rounded-2xl overflow-hidden h-64 bg-gray-50">
            <img src={s.image} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {s.images?.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {s.images.map((src: string, i: number) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square bg-gray-50">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        <dl className="space-y-3">
          <Row label="Provider" value={s.provider} />
          <Row label="Category" value={s.category} />
          <Row label="Location" value={s.location} />
          <Row label="Duration" value={s.duration} />
          <Row label="Price" value={s.price ? `SGD ${s.price} / pax` : undefined} />
          <Row label="Group size" value={s.pax} />
        </dl>

        {s.tags?.length > 0 && (
          <div>
            <dt className="text-xs text-gray-400 mb-2">Tags</dt>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t: string) => (
                <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        )}

        {s.description && (
          <div>
            <dt className="text-xs text-gray-400 mb-1">Description</dt>
            <dd className="text-sm text-gray-700">{s.description}</dd>
          </div>
        )}

        {s.host?.name && (
          <div>
            <dt className="text-xs text-gray-400 mb-1">Host</dt>
            <dd className="text-sm font-medium text-gray-900">{s.host.name}</dd>
            {s.host.bio && <dd className="text-sm text-gray-600 mt-0.5">{s.host.bio}</dd>}
          </div>
        )}

        {s.whatToExpect && (
          <div>
            <dt className="text-xs text-gray-400 mb-1">What to expect</dt>
            <dd className="text-sm text-gray-700 whitespace-pre-wrap">{s.whatToExpect}</dd>
          </div>
        )}
      </div>

    </div>
  )
}

function Row({ label, value }: { label: string; value?: string | number }) {
  if (!value) return null
  return (
    <div className="flex gap-6">
      <dt className="text-xs text-gray-400 w-24 shrink-0 pt-0.5">{label}</dt>
      <dd className="text-sm text-gray-700">{value}</dd>
    </div>
  )
}
