import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — boringdowhat.com',
  description:
    'General terms of use for boringdowhat.com, governed by the laws of the Republic of Singapore.',
}

const sections = [
  {
    heading: '1. Acceptance of terms',
    body: [
      'By accessing or using www.boringdowhat.com ("the Platform"), you agree to be bound by these General Terms of Use ("Terms"). If you do not agree to these Terms, please discontinue use of the Platform immediately.',
      'These Terms apply to all users of the Platform, including visitors, individuals making enquiries, activity providers submitting listings, and corporate users.',
    ],
  },
  {
    heading: '2. About the Platform',
    body: [
      'boringdowhat.com is an experience discovery platform that connects individuals, families, and corporate groups with independent activity providers based in Singapore.',
      'We act as a listing and referral platform only. We are not a party to any agreement entered into between a user and an activity provider, and we do not facilitate or process payments for any activity or booking.',
    ],
  },
  {
    heading: '3. Eligibility',
    body: [
      'You must be at least 18 years of age to use this Platform. By using the Platform, you represent and warrant that you meet this requirement.',
      'If you are using the Platform on behalf of a corporation or other legal entity, you represent that you have the authority to bind that entity to these Terms.',
    ],
  },
  {
    heading: '4. Use of the Platform',
    body: [
      'You agree to use the Platform only for lawful purposes and in accordance with these Terms. You must not:',
      '• Submit false, misleading, or fraudulent information, whether in a listing, enquiry, or any other form.',
      '• Use the Platform to solicit, collect, or harvest personal data of other users without their consent.',
      '• Reproduce, distribute, or commercially exploit any content from the Platform without our prior written consent.',
      '• Interfere with or disrupt the integrity or performance of the Platform, including through the use of automated scripts, bots, or scraping tools.',
      '• Use the Platform in any manner that could damage, disable, or impair the Platform or its servers.',
    ],
  },
  {
    heading: '5. Activity provider listings',
    body: [
      'Activity providers who submit listings to the Platform warrant that:',
      '• All information submitted is accurate, current, and not misleading.',
      '• They have the necessary licences, permits, and insurance to conduct the activities described.',
      '• Their activities comply with all applicable Singapore laws and regulations, including those administered by the Singapore Tourism Board, Ministry of Education, or other relevant authorities.',
      'We reserve the right to reject, edit, or remove any listing at our sole discretion, including where we reasonably believe a listing breaches these Terms or is otherwise unsuitable for publication.',
      'Approval of a listing does not constitute our endorsement of the provider or the activity.',
    ],
  },
  {
    heading: '6. User-generated content',
    body: [
      'By submitting any content to the Platform (including listing descriptions, images, and enquiry messages), you grant us a non-exclusive, royalty-free, worldwide licence to display and use that content in connection with operating and promoting the Platform.',
      'You retain ownership of all content you submit. You represent that you have all necessary rights to grant the above licence and that the content does not infringe the intellectual property rights of any third party.',
    ],
  },
  {
    heading: '7. Third-party links and providers',
    body: [
      'The Platform may contain links to websites operated by activity providers or other third parties. We do not control, endorse, or take responsibility for the content or practices of any third-party website or service.',
      'Your dealings with activity providers found through the Platform, including any bookings, payments, or disputes, are solely between you and the provider. We encourage you to review the terms and policies of any provider before entering into an arrangement with them.',
    ],
  },
  {
    heading: '8. Intellectual property',
    body: [
      'All content on the Platform that is not user-generated — including the boringdowhat name, logo, design, text, and graphics — is owned by or licensed to us and is protected by applicable Singapore and international intellectual property laws.',
      'Nothing in these Terms grants you any right to use our trademarks, trade names, or other proprietary marks without our prior written consent.',
    ],
  },
  {
    heading: '9. Disclaimer of warranties',
    body: [
      'The Platform is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.',
      'We do not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or suitability of any listing or information on the Platform.',
      'To the fullest extent permitted by Singapore law, we disclaim all implied warranties, including merchantability and fitness for a particular purpose.',
    ],
  },
  {
    heading: '10. Limitation of liability',
    body: [
      'To the fullest extent permitted by the laws of Singapore, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Platform, including but not limited to damages arising from reliance on any listing, the conduct of any activity provider, or any transaction between you and a provider.',
      'Our total aggregate liability to you for any claim arising out of or relating to these Terms or the Platform shall not exceed SGD 100.',
      'Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded under Singapore law.',
    ],
  },
  {
    heading: '11. Indemnity',
    body: [
      'You agree to indemnify, defend, and hold harmless boringdowhat.com and its affiliates, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in connection with your use of the Platform, your submission of any content, or your breach of these Terms.',
    ],
  },
  {
    heading: '12. Termination',
    body: [
      'We reserve the right to suspend or terminate your access to the Platform at any time, without notice, if we reasonably believe you have breached these Terms or are using the Platform in a manner harmful to us or other users.',
      'Provisions of these Terms that by their nature should survive termination (including intellectual property, disclaimers, and limitation of liability) shall continue to apply.',
    ],
  },
  {
    heading: '13. Amendments',
    body: [
      'We may amend these Terms at any time by posting the updated version on this page with a revised effective date. Your continued use of the Platform after such changes constitutes your acceptance of the updated Terms.',
      'We encourage you to review these Terms periodically.',
    ],
  },
  {
    heading: '14. Governing law and jurisdiction',
    body: [
      'These Terms are governed by and construed in accordance with the laws of the Republic of Singapore.',
      'You agree to submit to the exclusive jurisdiction of the courts of Singapore for the resolution of any dispute arising out of or in connection with these Terms or your use of the Platform.',
    ],
  },
  {
    heading: '15. Contact',
    body: [
      'For any questions about these Terms, please contact us at hello@boringdowhat.com.',
    ],
  },
]

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">
        Legal
      </p>
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
        General Terms of Use
      </h1>
      <p className="text-gray-500 leading-relaxed mb-2">
        Please read these terms carefully before using boringdowhat.com.
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
