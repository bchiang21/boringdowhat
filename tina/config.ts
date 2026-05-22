import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: 'main',
  clientId: null,
  token: null,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },
  schema: {
    collections: [
      {
        name: 'listing',
        label: 'Listings',
        path: 'content/listings',
        format: 'json',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.slug?.toLowerCase().replace(/\s+/g, '-') ?? 'new-listing',
          },
        },
        fields: [
          { type: 'string', name: 'slug', label: 'Slug', required: true },
          { type: 'string', name: 'title', label: 'Title', required: true },
          { type: 'string', name: 'provider', label: 'Provider' },
          { type: 'string', name: 'category', label: 'Category' },
          { type: 'string', name: 'location', label: 'Location' },
          { type: 'string', name: 'duration', label: 'Duration (e.g. 2h, 3.5h)' },
          { type: 'number', name: 'price', label: 'Price per pax (SGD)' },
          { type: 'string', name: 'pax', label: 'Group size (e.g. 1–15)' },
          { type: 'boolean', name: 'featured', label: 'Featured listing' },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            options: [
              { value: 'team-bonding', label: 'Team bonding' },
              { value: 'burned-out', label: 'Burned out' },
              { value: 'kids-parents', label: 'Kids + parents' },
              { value: 'introvert', label: 'Introvert-friendly' },
              { value: 'educational', label: 'Educational' },
              { value: 'creative', label: 'Creative' },
              { value: 'active', label: 'Active' },
              { value: 'solo', label: 'Solo-friendly' },
            ],
          },
          {
            type: 'string',
            name: 'description',
            label: 'Short description',
            ui: { component: 'textarea' },
          },

          // ── Images ──────────────────────────────────────────────────
          {
            type: 'image',
            name: 'image',
            label: 'Primary image',
          },
          {
            type: 'image',
            name: 'images',
            label: 'Additional images (up to 3 — shown in the photo mosaic)',
            list: true,
          },

          // ── Host ─────────────────────────────────────────────────────
          {
            type: 'object',
            name: 'host',
            label: 'Host',
            fields: [
              { type: 'string', name: 'name', label: 'Host name' },
              {
                type: 'string',
                name: 'bio',
                label: 'Host bio',
                ui: { component: 'textarea' },
              },
              { type: 'image', name: 'avatar', label: 'Host avatar' },
            ],
          },

          // ── What to expect ───────────────────────────────────────────
          {
            type: 'string',
            name: 'whatToExpect',
            label: 'What to expect',
            ui: {
              component: 'textarea',
              description: 'Separate paragraphs with a blank line (two newlines).',
            },
          },
        ],
      },
    ],
  },
})
