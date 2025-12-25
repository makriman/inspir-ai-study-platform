import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Terms & Conditions | inspir',
  description: 'Terms and conditions for using the inspir AI study platform.',
  canonical: 'https://inspir.uk/terms',
  noindex: true,
})

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
        <h1>Terms & Conditions</h1>
        <p className="text-gray-600">Last updated: December 20, 2024</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using inspir ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily access the Service for personal, non-commercial use only. This is the grant of a license, not a transfer of title.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
        </p>

        <h2>4. Acceptable Use</h2>
        <p>
          You agree not to use the Service to:
        </p>
        <ul>
          <li>Share inappropriate or harmful content</li>
          <li>Attempt to gain unauthorized access to the Service</li>
          <li>Use the Service for any illegal purpose</li>
          <li>Violate any laws in your jurisdiction</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are owned by inspir and are protected by international copyright, trademark, and other intellectual property laws.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          In no event shall inspir be liable for any indirect, incidental, special, consequential or punitive damages arising out of your use of the Service.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:legal@inspir.uk">legal@inspir.uk</a>
        </p>
      </div>
    </main>
  )
}
