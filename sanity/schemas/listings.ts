export default {
  name: 'listing',
  title: 'Experience Listing',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
   { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'provider', title: 'Provider', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'duration', title: 'Duration', type: 'string' },
    { name: 'price', title: 'Price per pax', type: 'number' },
    { name: 'pax', title: 'Group size', type: 'string' },
    { name: 'category', title: 'Category', type: 'string',
      options: { list: ['Craft','Art','Culinary','Adventure','Wellness','Outdoor'] }
    },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }],
      options: { list: ['burned-out','team-bonding','kids-parents','introvert','educational','creative','active','solo'] }
    },
    { name: 'featured', title: 'Featured', type: 'boolean' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'booking_url', title: 'Booking URL', type: 'url' },
    { name: 'source_url', title: 'Source URL', type: 'url' },
    { name: 'contact_email', title: 'Contact / Enquiry Email', type: 'string' },
    { name: 'whatToExpect', title: 'What to Expect', type: 'text' },
    { name: 'host', title: 'Host', type: 'string' },
  ],
}