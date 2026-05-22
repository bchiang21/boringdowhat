import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '92aotzrr',
  dataset: 'production',
  apiVersion: '2026-05-16',
  useCdn: true,
})