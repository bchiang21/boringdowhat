import { notFound } from 'next/navigation'
import Link from 'next/link'
import listings from '@/data/listings.json'
import { Listing } from '@/types'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return (listings as Listing[]).map((l) => ({ slug: l.slug }))
}

export default function ActivityPage({ params }: Props) {
  const listing = (listings as Listing[]).find((l) => l.slug === params.slug)

  if (!listing) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 inline-flex items-center gap-1"
      >
        ← Back to all experiences
      </Link>

      {/* Hero image placeholder */}
      <div className="w-full h-56 rounded-2xl bg-emerald-50 flex items-center justify-center text-6xl mb-8 mt-4">
        {getCategoryEmoji(listing.category)}
      </div>

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-1">{listing.provider}</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
          {listing.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600"
            >
              {tag.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Location</p>
          <p className="text-sm font-medium">{listing.location}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Duration</p>
          <p className="text-sm font-medium">{listing.duration}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">From</p>
          <p className="text-sm font-medium">${listing.price}/pax</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-8">{listing.description}</p>

      {/* Group size */}
      <p className="text-sm text-gray-500 mb-8">
        <span className="font-medium text-gray-700">Group size:</span> {listing.pax}
      </p>

      {/* Enquiry CTA */}
      <div className="bg-emerald-50 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-emerald-900 mb-1">
          Interested in this experience?
        </h2>
        <p className="text-sm text-emerald-700 mb-4">
          Send an enquiry and the provider will get back to you within 24 hours.
        </p>
        <a
          href={`mailto:hello@boringdowhat.com?subject=Enquiry: ${listing.title}&body=Hi, I'm interested in ${listing.title} by ${listing.provider}. Please share more details.`}
          className="inline-block text-sm font-medium bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Send an enquiry →
        </a>
      </div>
    </div>
  )
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Craft: '🪴',
    Art: '🎨',
    Culinary: '🍳',
    Adventure: '🧩',
    Wellness: '🎭',
    Outdoor: '🌿',
  }
  return map[category] ?? '✨'
}
