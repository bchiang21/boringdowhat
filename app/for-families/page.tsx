import fs from 'fs'
import path from 'path'
import { Listing } from '@/types'
import ActivityCard from '@/components/ActivityCard'

function getListings(): Listing[] {
  const dir = path.join(process.cwd(), 'content/listings')
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
}

export default function ForFamilies() {
  const familyListings = getListings().filter((l) =>
    l.tags.includes('kids-parents')
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="max-w-xl mb-12">
        <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">
          For parents
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
          Something meaningful for parents and kids.
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Educational, hands-on, and genuinely fun. Experiences that get kids off screens
          and give parents something to enjoy too.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {familyListings.map((listing) => (
          <ActivityCard key={listing.id} listing={listing} />
        ))}
      </div>

      <div className="bg-amber-50 rounded-2xl px-8 py-6 flex items-center justify-between gap-6">
        <div>
          <h3 className="text-sm font-semibold text-amber-900 mb-1">
            Looking for something specific?
          </h3>
          <p className="text-sm text-amber-700">
            Tell us your kids' ages, interests, and budget. We'll find the right fit.
          </p>
        </div>
        <a
          href="mailto:hello@boringdowhat.com?subject=Family experience enquiry"
          className="shrink-0 text-sm font-medium bg-amber-600 text-white px-5 py-2.5 rounded-xl hover:bg-amber-700 transition-colors"
        >
          Get recommendations →
        </a>
      </div>
    </div>
  )
}
