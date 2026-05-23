import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us — boringdowhat.com',
  description: 'Get in touch with the boringdowhat team. We are based in Singapore and happy to help.',
}

const channels = [
  {
    label: 'General enquiries',
    desc: 'Questions about the platform, how it works, or anything else.',
    action: 'hello@boringdowhat.com',
    href: 'mailto:hello@boringdowhat.com',
    pill: 'Email',
  },
  {
    label: 'Team offsites & corporate bookings',
    desc: 'Planning a D&D, team bonding session, or company retreat? Tell us your group size and budget and we will shortlist options for you.',
    action: 'hello@boringdowhat.com',
    href: 'mailto:hello@boringdowhat.com?subject=Team%20offsite%20enquiry',
    pill: 'Email',
  },
  {
    label: 'List your experience',
    desc: 'Run an activity or workshop in Singapore? Submit your listing — it is free and there is no commission.',
    action: 'Submit a listing',
    href: '/list-your-experience',
    pill: 'Form',
  },
  {
    label: 'Media & partnerships',
    desc: 'Press enquiries, collaboration proposals, and partnership opportunities.',
    action: 'hello@boringdowhat.com',
    href: 'mailto:hello@boringdowhat.com?subject=Media%20%26%20partnerships',
    pill: 'Email',
  },
]

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">
        Contact us
      </p>
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
        We are a small team. We actually read our emails.
      </h1>
      <p className="text-gray-500 leading-relaxed mb-12">
        Based in Singapore, we typically reply within one business day. Drop us a line below
        depending on what you need.
      </p>

      <div className="grid grid-cols-1 gap-4 mb-16">
        {channels.map((c) => (
          <div
            key={c.label}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start justify-between gap-6"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-gray-900">{c.label}</p>
                <span className="text-xs font-medium text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">
                  {c.pill}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
            <a
              href={c.href}
              className="shrink-0 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              {c.action} →
            </a>
          </div>
        ))}
      </div>

      {/* Info strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {[
          { heading: 'Based in', detail: 'Singapore' },
          { heading: 'Response time', detail: '1 business day' },
          { heading: 'Operating hours', detail: 'Mon – Fri, 9am – 6pm SGT' },
        ].map((item) => (
          <div key={item.heading} className="bg-gray-50 rounded-2xl px-6 py-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
              {item.heading}
            </p>
            <p className="text-sm font-semibold text-gray-900">{item.detail}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
