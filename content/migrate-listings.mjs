// scripts/migrate-listings.mjs
import fs from 'fs'
import listings from '../src/data/listings.json' assert { type: 'json' }

fs.mkdirSync('content/listings', { recursive: true })
for (const l of listings) {
  fs.writeFileSync(`content/listings/${l.slug}.json`, JSON.stringify(l, null, 2))
}