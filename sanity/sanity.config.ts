import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import listing from './schemas/listings'

export default defineConfig({
  name: 'default',
  title: 'boringdowhat CMS',
  projectId: '92aotzrr',
  dataset: 'production',
  plugins: [
    structureTool(),
  ],
  schema: {
    types: [listing],
  },
  releases: {
    enabled: false,
  },
})