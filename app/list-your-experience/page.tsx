export default function ListYourExperience() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">
        For providers
      </p>
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
        List your experience. For free.
      </h1>
      <p className="text-gray-500 leading-relaxed mb-8">
        We connect curious people, HR teams, and families with small activity providers across Singapore.
        No commission. No contracts. Just real enquiries, directly to you.
      </p>

      <div className="grid grid-cols-1 gap-4 mb-12">
        {[
          {
            title: 'Free listing',
            desc: 'Get your experience in front of HR managers, parents, and individuals actively looking.',
          },
          {
            title: 'Real enquiries',
            desc: 'Every person who enquires is already interested. No cold leads.',
          },
          {
            title: 'No commission',
            desc: 'We don\'t take a cut of your booking. You handle the transaction directly.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-4 bg-white border border-gray-100 rounded-2xl p-5"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 
        Replace the mailto below with a Tally.so embed.
        Go to tally.so, create a free form, then embed it here like:
        <iframe
          src="https://tally.so/embed/YOUR_FORM_ID"
          width="100%"
          height="500"
          frameBorder="0"
          title="List your experience"
        />
      */}
      <div className="bg-emerald-50 rounded-2xl p-8 text-center">
        <h2 className="text-base font-semibold text-emerald-900 mb-2">
          Ready to get listed?
        </h2>
        <p className="text-sm text-emerald-700 mb-6">
          Drop us your details and we'll get you set up within 48 hours.
        </p>
        <a
          href="mailto:hello@boringdowhat.com?subject=I want to list my experience"
          className="inline-block text-sm font-medium bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Get in touch →
        </a>
      </div>
    </div>
  )
}
