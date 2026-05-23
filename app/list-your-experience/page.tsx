import SubmissionForm from '@/components/SubmissionForm'

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
            desc: "We don't take a cut of your booking. You handle the transaction directly.",
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

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Tell us about your experience</h2>
        <p className="text-sm text-gray-400 mb-6">
          Fill in as much as you can. We'll review and publish it within 48 hours.
        </p>
        <SubmissionForm />
      </div>
    </div>
  )
}
