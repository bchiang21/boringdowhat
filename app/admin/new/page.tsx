import Link from 'next/link'
import EditForm from '../EditForm'

export default function NewListingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
          ← All listings
        </Link>
        <span className="text-gray-200">/</span>
        <h1 className="text-sm font-semibold text-gray-900">New listing</h1>
      </div>

      <EditForm listing={{}} isNew />
    </div>
  )
}
