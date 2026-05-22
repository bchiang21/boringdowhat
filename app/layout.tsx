import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

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
      <body className={`${geist.className} bg-gray-50 text-gray-900 antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
