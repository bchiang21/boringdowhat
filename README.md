# boringdowhat.com

A better way to discover, match, organise, and activate experiences in Singapore.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Content**: `data/listings.json` (swap for Sanity later)
- **Hosting**: Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  page.tsx                      ← Homepage
  layout.tsx                    ← Root layout + Navbar
  globals.css                   ← Global styles
  activities/[slug]/page.tsx    ← Individual listing page
  for-teams/page.tsx            ← Teams landing page
  for-families/page.tsx         ← Families landing page
  list-your-experience/page.tsx ← Provider signup page

components/
  Navbar.tsx         ← Top navigation
  ActivityCard.tsx   ← Listing card used in grids
  MoodFilter.tsx     ← Pill filter buttons (client component)
  HomeClient.tsx     ← Homepage with filtering logic (client component)

data/
  listings.json      ← All experience listings

types/
  index.ts           ← TypeScript types
```

## Adding a new listing

Open `data/listings.json` and add a new object following this shape:

```json
{
  "id": "11",
  "slug": "your-activity-slug",
  "title": "Activity Title",
  "provider": "Provider Name",
  "description": "A short, honest description of the experience.",
  "location": "Neighbourhood",
  "duration": "2h",
  "price": 60,
  "pax": "1–15",
  "image": "/images/your-image.jpg",
  "tags": ["burned-out", "introvert"],
  "category": "Craft",
  "featured": false
}
```

**Available tags:** `burned-out`, `team-bonding`, `kids-parents`, `introvert`, `educational`, `creative`, `active`, `solo`

**Available categories:** `Craft`, `Art`, `Culinary`, `Adventure`, `Wellness`, `Outdoor`

## Enquiry flow

Currently, enquiries go to `hello@boringdowhat.com` via mailto links.

To upgrade: embed a [Tally.so](https://tally.so) form on the listing page or replace the mailto with a form submission that pipes to Airtable via Make.com.

## Deploying to Vercel

```bash
npx vercel
```

Or connect the GitHub repo to Vercel for automatic deploys on push.

## Migrating content to Sanity

When you need non-developers to manage listings:
1. Set up a Sanity project at [sanity.io](https://sanity.io)
2. Define a `listing` document type matching the fields in `listings.json`
3. Replace the JSON imports with `sanity.fetch()` calls
4. Components and pages stay exactly the same
