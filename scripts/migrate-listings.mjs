// scripts/migrate-listings.mjs
import fs from 'fs'
import listings from '../data/listings.json' with { type: 'json' }

fs.mkdirSync('content/listings', { recursive: true })
for (const l of listings) {
  fs.writeFileSync(`content/listings/${l.slug}.json`, JSON.stringify(l, null, 2))
}