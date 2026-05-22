// app/page.tsx
import fs from 'fs'
import path from 'path'
import { Listing } from '@/types'
import HomeClient from '@/components/HomeClient'

function getListings(): Listing[] {
  const dir = path.join(process.cwd(), 'content/listings')
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')))
}

export default function Home() {
  const listings = getListings()
  return <HomeClient listings={listings} />
}