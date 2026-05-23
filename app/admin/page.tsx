import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { Listing } from '@/types'

type PendingSummary = {
  token: string
  title: string
  provider?: string
  location?: string
  price?: number
  contactName?: string
  contactEmail?: string
  submittedAt: string
}

function getPending(): PendingSummary[] {
  const dir = path.join(process.cwd(), 'content/pending')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
}

function getListings(): Listing[] {
  const dir = path.join(process.cwd(), 'content/listings')
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export default function AdminIndex() {
  const listings = getListings()
  const pending = getPending()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* ── Pending submissions ───────────────────────────────── */}
      {pending.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pending review</h2>
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
              {pending.length}
            </span>
          </div>
          <div className="space-y-2">
            {pending.map(s => (
              <Link
                key={s.token}
                href={`/admin/pending/${s.token}`}
                className="flex items-center justify-between bg-white border border-amber-100 rounded-2xl px-5 py-4 hover:border-amber-200 hover:shadow-sm transition-all"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{s.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {[s.provider, s.location, s.price ? `SGD ${s.price}` : null]
                      .filter(Boolean).join(' · ')}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-6">
                  <p className="text-xs text-gray-400">
                    {new Date(s.submittedAt).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">Review →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Published listings ────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Listings</h1>
          <p className="text-sm text-gray-400 mt-0.5">{listings.length} published</p>
        </div>
        <Link
          href="/admin/new"
          className="text-sm font-semibold bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          + New listing
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map(listing => (
          <Link
            key={listing.slug}
            href={`/admin/${listing.slug}`}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="h-36 bg-gray-50 overflow-hidden">
              {listing.image ? (
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl text-gray-200">
                  🖼
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-0.5">{listing.category} · {listing.provider}</p>
              <h2 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                {listing.title}
              </h2>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">{listing.location} · {listing.duration}</p>
                {listing.featured && (
                  <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
