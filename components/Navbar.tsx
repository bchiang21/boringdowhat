import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          boring<span className="text-emerald-600">do</span>what
          <span className="text-gray-400 font-normal">.com</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/for-teams"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            For teams
          </Link>
          <Link
            href="/for-families"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            For families
          </Link>
          <Link
            href="/list-your-experience"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            List your experience
          </Link>
          <Link
            href="/list-your-experience"
            className="text-sm font-medium border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </nav>
  )
}
