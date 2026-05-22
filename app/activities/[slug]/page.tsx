import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Listing } from '@/types'

function getListings(): Listing[] {
  const dir = path.join(process.cwd(), 'content/listings')
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
}

export function generateStaticParams() {
  return getListings().map((l) => ({ slug: l.slug }))
}

const tagLabels: Record<string, string> = {
  'team-bonding': 'Team bonding',
  'burned-out': 'Burned out',
  'kids-parents': 'Kids + parents',
  'introvert': 'Introvert-friendly',
  'educational': 'Educational',
  'creative': 'Creative',
  'active': 'Active',
  'solo': 'Solo-friendly',
}

const tagStyles: Record<string, string> = {
  'team-bonding': 'bg-emerald-50 text-emerald-700',
  'burned-out': 'bg-purple-50 text-purple-700',
  'kids-parents': 'bg-amber-50 text-amber-700',
  'introvert': 'bg-blue-50 text-blue-700',
  'educational': 'bg-sky-50 text-sky-700',
  'creative': 'bg-pink-50 text-pink-700',
  'active': 'bg-orange-50 text-orange-700',
  'solo': 'bg-violet-50 text-violet-700',
}

const categoryColors: Record<string, string> = {
  Craft: 'bg-amber-100',
  Art: 'bg-purple-100',
  Culinary: 'bg-orange-100',
  Adventure: 'bg-emerald-100',
  Wellness: 'bg-blue-100',
  Outdoor: 'bg-teal-100',
  Pottery: 'bg-rose-100',
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Craft: '🪴', Art: '🎨', Culinary: '🍳',
    Adventure: '🧩', Wellness: '🎭', Outdoor: '🌿', Pottery: '🏺',
  }
  return map[category] ?? '✨'
}

function PhotoMosaic({ listing }: { listing: Listing }) {
  const photos = [listing.image, ...(listing.images ?? [])].filter(Boolean)

  if (photos.length === 0) {
    return (
      <div className={`w-full aspect-video rounded-2xl flex items-center justify-center text-7xl ${categoryColors[listing.category] ?? 'bg-gray-100'}`}>
        {getCategoryEmoji(listing.category)}
      </div>
    )
  }

  if (photos.length === 1) {
    return (
      <div className="w-full aspect-video rounded-2xl overflow-hidden">
        <img src={photos[0]} alt={listing.title} className="w-full h-full object-cover" />
      </div>
    )
  }

  if (photos.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
        {photos.map((src, i) => (
          <div key={i} className="aspect-square">
            <img src={src} alt={`${listing.title} ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    )
  }

  if (photos.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
        <div className="row-span-2">
          <img src={photos[0]} alt={`${listing.title} 1`} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square">
          <img src={photos[1]} alt={`${listing.title} 2`} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square">
          <img src={photos[2]} alt={`${listing.title} 3`} className="w-full h-full object-cover" />
        </div>
      </div>
    )
  }

  // 4+ photos: 2×2 grid
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 rounded-2xl overflow-hidden">
      {photos.slice(0, 4).map((src, i) => (
        <div key={i} className="aspect-square">
          <img src={src} alt={`${listing.title} ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  )
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = getListings().find((l) => l.slug === slug)
  if (!listing) notFound()

  const mailtoHref = `mailto:hello@boringdowhat.com?subject=Enquiry: ${listing.title}&body=Hi, I'm interested in ${listing.title} by ${listing.provider}. Please share more details.`

  const paragraphs = listing.whatToExpect?.split('\n\n').filter(Boolean) ?? []

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6 inline-flex items-center gap-1"
      >
        ← All experiences
      </Link>

      {/* Top: mosaic + info panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 mb-12">

        {/* Left: photo mosaic */}
        <PhotoMosaic listing={listing} />

        {/* Right: sticky info panel */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
            {listing.category}
          </p>
          <h1 className="text-2xl font-semibold text-gray-900 leading-snug tracking-tight mb-1">
            {listing.title}
          </h1>
          <p className="text-sm text-gray-500 mb-5">by {listing.provider}</p>

          {/* Stats */}
          <div className="flex flex-col gap-2 mb-5 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">📍</span>
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">⏱</span>
              <span>{listing.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">👥</span>
              <span>{listing.pax} pax</span>
            </div>
          </div>

          {/* Tags */}
          {listing.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {listing.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${tagStyles[tag] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {tagLabels[tag] ?? tag}
                </span>
              ))}
            </div>
          )}

          <hr className="border-gray-100 mb-6" />

          {/* Price + CTA */}
          <p className="text-2xl font-semibold text-gray-900 mb-1">
            from ${listing.price}
            <span className="text-base font-normal text-gray-500"> / pax</span>
          </p>
          <p className="text-xs text-gray-400 mb-4">No commission. Enquire directly with the provider.</p>
          <a
            href={mailtoHref}
            className="block w-full text-center text-sm font-semibold bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Send an enquiry
          </a>
        </div>
      </div>

      {/* Bottom: rich content */}
      <div className="max-w-2xl">

        {/* Description */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About this experience</h2>
          <p className="text-gray-600 leading-relaxed">{listing.description}</p>
        </section>

        {/* What to Expect */}
        {paragraphs.length > 0 && (
          <>
            <hr className="border-gray-100 mb-10" />
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What to expect</h2>
              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                ))}
              </div>
            </section>
          </>
        )}

        {/* About the Host */}
        {listing.host && (
          <>
            <hr className="border-gray-100 mb-10" />
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About the host</h2>
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-2xl ${categoryColors[listing.category] ?? 'bg-gray-100'}`}>
                  {listing.host.avatar
                    ? <img src={listing.host.avatar} alt={listing.host.name} className="w-full h-full object-cover rounded-full" />
                    : getCategoryEmoji(listing.category)
                  }
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{listing.host.name}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{listing.host.bio}</p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
