import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us — boringdowhat.com',
  description:
    'We built boringdowhat to help people in Singapore find something worth doing — for teams, families, and curious individuals.',
}

const values = [
  {
    label: 'Local-first',
    body: 'Every experience on our platform is run by someone in Singapore. We champion small operators, passionate instructors, and independent studios over big-box providers.',
  },
  {
    label: 'No fluff',
    body: 'We vet every listing. If it sounds more exciting on paper than in person, it does not make the cut. Honest descriptions, real photos, fair prices.',
  },
  {
    label: 'People over algorithms',
    body: 'We help match people to experiences through conversation when needed — not just a filter and scroll. Some of the best recommendations come from a quick email.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Browse curated experiences',
    body: 'Every listing is reviewed by our team. Filter by mood, group size, or category to find what fits.',
  },
  {
    n: '02',
    title: 'Reach the provider directly',
    body: 'No middleman booking fees. You contact the activity host directly, on your terms.',
  },
  {
    n: '03',
    title: 'Show up and enjoy it',
    body: 'That is genuinely the whole plan. No complicated logistics. Just turn up.',
  },
]

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="max-w-2xl mb-20">
        <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">
          Our story
        </p>
        <h1 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
          We built this because weekends kept slipping by.
        </h1>
        <p className="text-gray-500 leading-relaxed mb-4">
          Too many Saturday afternoons spent scrolling event apps, passing on overpriced packages,
          or defaulting to the same malls. Singapore has hundreds of genuinely interesting things to
          do — a bread-baking studio in Tiong Bahru, a candle workshop in Bugis, a nature journaling
          walk through the Botanic Gardens — but they were hard to find and even harder to book.
        </p>
        <p className="text-gray-500 leading-relaxed">
          boringdowhat started as a simple idea: make it easier for people to discover and connect
          with activity providers across Singapore. No clutter. No inflated prices. Just real
          experiences run by real people.
        </p>
      </div>

      {/* Mission banner */}
      <div className="bg-emerald-50 rounded-3xl px-10 py-12 mb-20">
        <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">
          Our mission
        </p>
        <p className="text-2xl font-semibold text-emerald-900 leading-snug max-w-2xl">
          To connect curious people in Singapore with small, independent experience providers — and
          make every weekend worth looking forward to.
        </p>
      </div>

      {/* How it works */}
      <div className="mb-20">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-10">
          How it works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="bg-white border border-gray-100 rounded-2xl p-6">
              <p className="text-3xl font-bold text-gray-100 mb-4">{s.n}</p>
              <p className="text-sm font-semibold text-gray-900 mb-2">{s.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-10">
          What we stand for
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.label} className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{v.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who we serve */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
        {[
          {
            audience: 'For teams',
            desc: 'HR managers and team leads use boringdowhat to plan offsites, bonding sessions, and D&D events that people actually enjoy.',
            href: '/for-teams',
            color: 'bg-emerald-50',
            textColor: 'text-emerald-900',
            btnColor: 'bg-emerald-600',
          },
          {
            audience: 'For families',
            desc: 'Parents find weekend activities that get kids off screens — pottery, baking, art — while giving adults something to enjoy alongside them.',
            href: '/for-families',
            color: 'bg-amber-50',
            textColor: 'text-amber-900',
            btnColor: 'bg-amber-600',
          },
          {
            audience: 'For individuals',
            desc: 'Curious people looking for something new, a hobby to pick up, or just a good reason to leave the house on a Sunday afternoon.',
            href: '/',
            color: 'bg-sky-50',
            textColor: 'text-sky-900',
            btnColor: 'bg-sky-600',
          },
        ].map((item) => (
          <div key={item.audience} className={`${item.color} rounded-2xl p-6 flex flex-col`}>
            <p className={`text-sm font-semibold ${item.textColor} mb-2`}>{item.audience}</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{item.desc}</p>
            <Link
              href={item.href}
              className={`self-start text-sm font-medium ${item.btnColor} text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity`}
            >
              Explore →
            </Link>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="border border-gray-100 rounded-2xl px-8 py-6 flex items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Want to list your experience?</p>
          <p className="text-sm text-gray-500">
            We work with independent studios and instructors across Singapore. Free to list, no commission.
          </p>
        </div>
        <Link
          href="/list-your-experience"
          className="shrink-0 text-sm font-medium bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
        >
          Get listed →
        </Link>
      </div>

    </div>
  )
}
