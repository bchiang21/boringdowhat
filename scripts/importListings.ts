console.log('Token:', process.env.SANITY_WRITE_TOKEN ? 'loaded' : 'MISSING')

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const listings = JSON.parse(
  readFileSync(resolve(__dirname, '../data/listings.json'), 'utf-8')
)

const client = createClient({
  projectId: '92aotzrr',
  dataset: 'production',
  apiVersion: '2026-05-16',
  token: 'skuRyhUyh57WxC88beAyjQGbT9lx9VdhNYFqzK4TOfgWWNikXgE31naaa92nNodDD8wU0pukUvjl3C2bYdPZvuSgRLeIXIKxk0QhhYMDLfuj6JwHEFKUeNbxZe6cQXBwShI7Fjo3HqAPOYGnJbA4UUFxscr0f9CHIuFe6hxHSDKrm0rAyIzY',
  useCdn: false,
})

async function importListings() {
  for (const listing of listings) {
    const doc = {
      _type: 'listing',
      _id: `listing-${listing.id}`,
      title: listing.title,
      slug: { _type: 'slug', current: listing.slug },
      provider: listing.provider,
      description: listing.description,
      location: listing.location,
      duration: listing.duration,
      price: listing.price,
      pax: listing.pax,
      category: listing.category,
      tags: listing.tags,
      featured: listing.featured,
    }

    await client.createOrReplace(doc)
    console.log(`✓ Imported: ${listing.title}`)
  }

  console.log('All listings imported!')
}

importListings()