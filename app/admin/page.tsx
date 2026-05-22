import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { Listing } from '@/types'

function getListings(): Listing[] {
  const dir = path.join(process.cwd(), 'content/listings')
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export default function AdminIndex() {
  const listings = getListings()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Listings</h1>
          <p className="text-sm text-gray-400 mt-0.5">{listings.length} total</p>
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
