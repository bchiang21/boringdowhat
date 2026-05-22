import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Listing } from '@/types'
import EditForm from '../EditForm'

function getListing(slug: string): Listing | null {
  const filepath = path.join(process.cwd(), 'content/listings', `${slug}.json`)
  if (!fs.existsSync(filepath)) return null
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = getListing(slug)
  if (!listing) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
          ← All listings
        </Link>
        <span className="text-gray-200">/</span>
        <h1 className="text-sm font-semibold text-gray-900 truncate">{listing.title}</h1>
        <Link
          href={`/activities/${listing.slug}`}
          target="_blank"
          className="ml-auto text-xs text-gray-400 hover:text-emerald-600 transition-colors shrink-0"
        >
          View live ↗
        </Link>
      </div>

      <EditForm listing={listing} />
    </div>
  )
}
