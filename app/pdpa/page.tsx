import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personal Data Protection Policy — boringdowhat.com',
  description:
    'How boringdowhat collects, uses, and protects personal data in compliance with the Personal Data Protection Act 2012 (Singapore).',
}

const sections = [
  {
    heading: '1. Introduction',
    body: [
      'boringdowhat.com ("we", "us", "our") is committed to protecting the personal data of individuals who interact with our platform in accordance with the Personal Data Protection Act 2012 of Singapore ("PDPA") and its subsidiary regulations, including the Personal Data Protection (Enforcement) Regulations 2021.',
      'This policy applies to personal data collected through our website at www.boringdowhat.com, via email, and through any other channels through which we interact with you.',
    ],
  },
  {
    heading: '2. What personal data we collect',
    body: [
      'We collect personal data that you voluntarily provide to us, including:',
      '• Name and contact information (email address, phone number) when you submit an enquiry or contact us directly.',
      '• Business details (organisation name, role, group size) when enquiring about team or group bookings.',
      '• Experience provider information (studio name, description, pricing, images) when you submit a listing through our platform.',
      '• Communication records, including the content of emails and form submissions.',
      'We do not collect sensitive personal data such as NRIC numbers, financial information, or health data.',
    ],
  },
  {
    heading: '3. Purpose of collection and use',
    body: [
      'We collect and use personal data solely for the following purposes:',
      '• To process and respond to your enquiries, booking requests, or listing submissions.',
      '• To connect individuals and groups with activity providers listed on our platform.',
      '• To publish activity listings submitted by experience providers, including contact details shared for that purpose.',
      '• To send transactional communications (e.g. listing approval notifications, booking confirmations).',
      '• To improve our platform and services based on aggregate, anonymised usage patterns.',
      'We do not use personal data for unsolicited marketing without your prior consent.',
    ],
  },
  {
    heading: '4. Disclosure of personal data',
    body: [
      'We may disclose your personal data in the following circumstances:',
      '• To activity providers listed on our platform, where you have made an enquiry directed to them.',
      '• To third-party service providers who support our platform operations (e.g. hosting, email delivery) under contractual obligations of confidentiality.',
      '• Where required by Singapore law, regulation, or a lawful order of a Singapore court or government authority.',
      'We do not sell personal data to third parties.',
    ],
  },
  {
    heading: '5. Consent',
    body: [
      'By submitting a form, sending us an email, or otherwise providing personal data to us, you consent to the collection, use, and disclosure of your personal data in accordance with this policy.',
      'You may withdraw consent at any time by contacting us at hello@boringdowhat.com. Note that withdrawal of consent may limit our ability to provide certain services to you.',
    ],
  },
  {
    heading: '6. Retention of personal data',
    body: [
      'We retain personal data only for as long as is necessary to fulfil the purpose for which it was collected, or as required by applicable Singapore law.',
      'Enquiry records are generally retained for up to 12 months after the last interaction. Listing submissions and provider data are retained for the duration of the listing and up to 24 months thereafter.',
      'When personal data is no longer required, it is securely deleted or anonymised.',
    ],
  },
  {
    heading: '7. Protection of personal data',
    body: [
      'We implement reasonable administrative, technical, and physical measures to protect personal data against unauthorised access, collection, use, disclosure, copying, modification, disposal, or similar risks.',
      'In the event of a data breach that is likely to result in significant harm to affected individuals, we will notify the affected individuals and the Personal Data Protection Commission ("PDPC") in accordance with our obligations under the PDPA.',
    ],
  },
  {
    heading: '8. Access and correction',
    body: [
      'You have the right to request access to personal data we hold about you, and to request corrections to any data that is inaccurate, incomplete, or misleading.',
      'To exercise these rights, please contact our Data Protection Officer at hello@boringdowhat.com with the subject line "Data Access Request" or "Data Correction Request". We will respond within 30 days of receiving your request.',
      'We may charge a reasonable administrative fee for access requests, which will be communicated to you prior to processing.',
    ],
  },
  {
    heading: '9. Transfers outside Singapore',
    body: [
      'Where personal data is transferred to a country or territory outside Singapore, we will ensure that such transfers are made in accordance with the requirements of the PDPA, including ensuring that the recipient organisation provides a standard of protection comparable to that under the PDPA.',
    ],
  },
  {
    heading: '10. Cookies and analytics',
    body: [
      'Our website may use cookies and similar technologies to improve your browsing experience and to understand how the site is used. No personally identifiable information is collected through cookies without your knowledge.',
      'You may configure your browser to refuse cookies; however, doing so may affect the functionality of certain parts of the website.',
    ],
  },
  {
    heading: '11. Changes to this policy',
    body: [
      'We may update this policy from time to time to reflect changes in our practices or in applicable law. The updated policy will be published on this page with a revised effective date. Continued use of our platform after changes have been published constitutes your acceptance of the updated policy.',
    ],
  },
  {
    heading: '12. Contact and complaints',
    body: [
      'For any questions about this policy or our data protection practices, please contact:',
      'Data Protection Officer\nboringdowhat.com\nEmail: hello@boringdowhat.com',
      'If you are dissatisfied with our response, you may lodge a complaint with the Personal Data Protection Commission of Singapore at www.pdpc.gov.sg.',
    ],
  },
]

export default function PDPA() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">
        Legal
      </p>
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
        Personal Data Protection Policy
      </h1>
      <p className="text-gray-500 leading-relaxed mb-2">
        In compliance with the Personal Data Protection Act 2012 (Singapore).
      </p>
      <p className="text-xs text-gray-400 mb-12">Effective date: 1 June 2025</p>

      <div className="space-y-10">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="text-sm font-semibold text-gray-900 mb-3">{s.heading}</h2>
            <div className="space-y-3">
              {s.body.map((para, i) => (
                <p key={i} className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
