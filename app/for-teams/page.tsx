import listings from '@/data/listings.json'
import { Listing } from '@/types'
import ActivityCard from '@/components/ActivityCard'

export default function ForTeams() {
  const teamListings = (listings as Listing[]).filter((l) =>
    l.tags.includes('team-bonding')
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="max-w-xl mb-12">
        <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">
          For HR &amp; team leads
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
          Something that makes your team actually bond.
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Curated experiences designed for groups of 8 to 60. No trust falls. No PowerPoints.
          Just activities that create real moments.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {teamListings.map((listing) => (
          <ActivityCard key={listing.id} listing={listing} />
        ))}
      </div>

      <div className="bg-emerald-50 rounded-2xl px-8 py-6 flex items-center justify-between gap-6">
        <div>
          <h3 className="text-sm font-semibold text-emerald-900 mb-1">
            Need help planning a team offsite?
          </h3>
          <p className="text-sm text-emerald-700">
            Tell us your team size, budget, and vibe. We'll shortlist options and handle the coordination.
          </p>
        </div>
        <a
          href="mailto:hello@boringdowhat.com?subject=Team offsite enquiry"
          className="shrink-0 text-sm font-medium bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Talk to us →
        </a>
      </div>
    </div>
  )
}
