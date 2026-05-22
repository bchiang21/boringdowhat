import Link from 'next/link'
import { Listing } from '@/types'

const categoryColors: Record<string, string> = {
  Craft: 'bg-amber-100',
  Art: 'bg-purple-100',
  Culinary: 'bg-orange-100',
  Adventure: 'bg-emerald-100',
  Wellness: 'bg-blue-100',
  Outdoor: 'bg-teal-100',
}

type Props = {
  listing: Listing
}

export default function ActivityCard({ listing }: Props) {
  return (
    <Link href={`/activities/${listing.slug}`} className="group block">
      {/* Image */}
      <div
        className={`relative aspect-square rounded-2xl overflow-hidden mb-3 ${
          categoryColors[listing.category] ?? 'bg-gray-100'
        }`}
      >
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            {getCategoryEmoji(listing.category)}
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 px-2.5 py-1 rounded-full">
            {listing.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 truncate leading-snug">
          {listing.title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          {listing.location} · {listing.duration}
        </p>
        <p className="text-sm text-gray-900 mt-1">
          <span className="font-semibold">${listing.price}</span>
          <span className="text-gray-500 font-normal"> / pax</span>
        </p>
      </div>
    </Link>
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
