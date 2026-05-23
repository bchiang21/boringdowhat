import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'boringdowhat.com — discover experiences in Singapore',
  description:
    'A better way to discover, match, and organise experiences in Singapore. For teams, families, and curious individuals.',
  openGraph: {
    title: 'boringdowhat.com',
    description: 'Stop being boring. Start doing something.',
    url: 'https://www.boringdowhat.com',
    siteName: 'boringdowhat',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-white md:bg-gray-50 text-gray-900 antialiased`}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-gray-100 mt-24">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <span>© {new Date().getFullYear()} boringdowhat.com · Singapore</span>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
              <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Use</Link>
              <Link href="/pdpa" className="hover:text-gray-600 transition-colors">PDPA</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
