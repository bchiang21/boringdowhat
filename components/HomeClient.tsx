'use client'

import { useState } from 'react'
import ActivityCard from '@/components/ActivityCard'
import MoodFilter from '@/components/MoodFilter'
import { Listing } from '@/types'

type Props = {
  listings: Listing[]
}

export default function HomeClient({ listings }: Props) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [search, setSearch] = useState('')

  const filtered = listings.filter((listing) => {
    const matchesFilter =
      activeFilters.length === 0 ||
      activeFilters.some((f) => listing.tags.includes(f))

    const matchesSearch =
      search === '' ||
      listing.title.toLowerCase().includes(search.toLowerCase()) ||
      listing.description.toLowerCase().includes(search.toLowerCase()) ||
      listing.location.toLowerCase().includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const teamListings = filtered.filter((l) => l.tags.includes('team-bonding'))
  const soloListings = filtered.filter((l) => !l.tags.includes('team-bonding'))

  return (
    <>
      {/* Hero */}
      <section className="text-center py-16 px-6 max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">
          Singapore's experience directory
        </p>
        <h1 className="text-4xl font-semibold text-gray-900 leading-tight mb-4 tracking-tight">
          Stop being boring.<br />Start doing something.
        </h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          Tell us the vibe. We'll find the experience. For teams, families, or just yourself.
        </p>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 mb-6 max-w-xl mx-auto shadow-sm">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
          </svg>
          <input
            type="text"
            placeholder={`Try "something my team won't hate" or "kids + craft"`}
            className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Mood pills */}
        <MoodFilter onFilterChange={setActiveFilters} />
      </section>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 pb-20">

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">Nothing matching that vibe yet.</p>
            <p className="text-sm">Try a different filter or clear your search.</p>
          </div>
        )}

        {/* Solo / burnout section */}
        {soloListings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Good for when you need a reset
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
              {soloListings.map((listing) => (
                <ActivityCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {/* Team section */}
        {teamListings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Great for teams (8–30 pax)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
              {teamListings.map((listing) => (
                <ActivityCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {/* Provider CTA */}
        <div className="bg-emerald-50 rounded-2xl px-8 py-6 flex items-center justify-between gap-6 mt-4">
          <div>
            <h3 className="text-sm font-semibold text-emerald-900 mb-1">
              Are you an experience provider?
            </h3>
            <p className="text-sm text-emerald-700">
              Get listed free. We'll send you real enquiries — no commission, no contracts.
            </p>
          </div>
          <a
            href="/list-your-experience"
            className="shrink-0 text-sm font-medium bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            List your experience →
          </a>
        </div>
      </div>
    </>
  )
}
