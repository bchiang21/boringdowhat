export type Host = {
  name: string
  bio: string
  avatar?: string
}

export type Listing = {
  id: string
  slug: string
  title: string
  provider: string
  description: string
  location: string
  duration: string
  price: number
  pax: string
  image: string
  images?: string[]
  tags: string[]
  category: string
  featured: boolean
  host?: Host
  whatToExpect?: string
}

export type MoodFilter = {
  id: string
  label: string
  emoji: string
}
