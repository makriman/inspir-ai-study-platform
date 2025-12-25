import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Eye, UserCheck, FileText, Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GDPR Compliance',
  description: 'Learn how inspir complies with GDPR and protects your personal data and privacy rights.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function GDPRPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-inspir-purple/10 text-inspir-purple rounded-full text-sm font-semibold mb-4">
            <Shield className="w-4 h-4" />
            GDPR Compliant
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            GDPR Compliance Statement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy and data protection rights are our top priority. We are fully compliant with the General Data Protection Regulation (GDPR).
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Data Protection</h3>
            <p className="text-gray-600 text-sm">
              Your data is encrypted, secure, and only used for providing our services.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Your Rights</h3>
            <p className="text-gray-600 text-sm">
              Access, correct, delete, or export your data at any time.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-inspir-purple" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Transparency</h3>
            <p className="text-gray-600 text-sm">
              Clear information about what data we collect and why.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">

            {/* Who We Are */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <UserCheck className="w-8 h-8 text-inspir-purple" />
                Who We Are
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Data Controller:</strong> Inspir Learning Ltd
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Registered:</strong> United Kingdom
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Contact:</strong> privacy@inspir.uk
                </p>
                <p className="text-gray-700">
                  <strong>DPO (Data Protection Officer):</strong> Available upon request
                </p>
              </div>
            </section>

            {/* Data We Collect */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="w-8 h-8 text-inspir-purple" />
                What Data We Collect
              </h2>

              <div className="space-y-4">
                <div className="border-l-4 border-inspir-blue pl-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Account Information (Optional)</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Email address (only if you create an account)</li>
                    <li>Name (optional)</li>
                    <li>Study preferences and settings</li>
                  </ul>
                </div>

                <div className="border-l-4 border-inspir-blue pl-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Usage Data</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Chat conversations and study sessions (stored locally)</li>
                    <li>Tool usage statistics</li>
                    <li>Performance metrics</li>
                  </ul>
                </div>

                <div className="border-l-4 border-inspir-blue pl-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Data</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>IP address (anonymized)</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Cookies (with your consent)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal Basis for Processing</h2>
              <p className="text-gray-700 mb-4">
                We process your personal data under the following legal bases:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Consent</h4>
                  <p className="text-sm text-gray-700">
                    For optional features like analytics and marketing cookies
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Contract Performance</h4>
                  <p className="text-sm text-gray-700">
                    To provide the AI tutoring services you've requested
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Legitimate Interest</h4>
                  <p className="text-sm text-gray-700">
                    To improve our services and prevent fraud
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Legal Obligation</h4>
                  <p className="text-sm text-gray-700">
                    To comply with UK laws and regulations
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-inspir-purple" />
                Your GDPR Rights
              </h2>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-inspir-purple/10 to-inspir-blue/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Right to Access</h3>
                  <p className="text-gray-700">
                    Request a copy of all personal data we hold about you.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-inspir-purple/10 to-inspir-blue/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Right to Rectification</h3>
                  <p className="text-gray-700">
                    Correct any inaccurate or incomplete data.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-inspir-purple/10 to-inspir-blue/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Right to Erasure ("Right to be Forgotten")</h3>
                  <p className="text-gray-700">
                    Request deletion of your personal data in certain circumstances.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-inspir-purple/10 to-inspir-blue/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Right to Data Portability</h3>
                  <p className="text-gray-700">
                    Receive your data in a machine-readable format to transfer to another service.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-inspir-purple/10 to-inspir-blue/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Right to Object</h3>
                  <p className="text-gray-700">
                    Object to processing based on legitimate interests or direct marketing.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-inspir-purple/10 to-inspir-blue/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Right to Restrict Processing</h3>
                  <p className="text-gray-700">
                    Request limitation of how we process your data in certain situations.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-inspir-purple/10 to-inspir-blue/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Right to Withdraw Consent</h3>
                  <p className="text-gray-700">
                    Withdraw consent for processing at any time (doesn't affect prior processing).
                  </p>
                </div>
              </div>
            </section>

            {/* How to Exercise Rights */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Bell className="w-8 h-8 text-inspir-purple" />
                How to Exercise Your Rights
              </h2>

              <div className="bg-inspir-lime/20 border-2 border-inspir-lime rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  To exercise any of your GDPR rights, please contact us:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Email:</strong> privacy@inspir.uk</li>
                  <li><strong>Subject Line:</strong> "GDPR Request - [Type of Request]"</li>
                  <li><strong>Response Time:</strong> Within 30 days (may extend to 60 days for complex requests)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  We may request identification verification to protect your data security.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Lock className="w-8 h-8 text-inspir-purple" />
                How We Protect Your Data
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Technical Measures</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>End-to-end encryption (SSL/TLS)</li>
                    <li>Secure database hosting (Supabase)</li>
                    <li>Regular security audits</li>
                    <li>Access controls and authentication</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Organizational Measures</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Staff training on data protection</li>
                    <li>Confidentiality agreements</li>
                    <li>Data breach response procedures</li>
                    <li>Regular policy reviews</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* International Transfers */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your data is primarily stored in the European Economic Area (EEA). When we transfer data outside the EEA:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>We use EU-approved Standard Contractual Clauses</li>
                <li>We ensure adequate safeguards are in place</li>
                <li>We work only with GDPR-compliant service providers</li>
              </ul>
            </section>

            {/* Complaints */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Right to Lodge a Complaint</h2>
              <p className="text-gray-700 mb-4">
                If you believe we have not handled your data correctly, you have the right to lodge a complaint with a supervisory authority:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>UK Supervisory Authority:</strong> Information Commissioner's Office (ICO)
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Website:</strong> <a href="https://ico.org.uk" className="text-inspir-purple hover:underline" target="_blank" rel="noopener">ico.org.uk</a>
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> 0303 123 1113
                </p>
              </div>
            </section>

            {/* Updates */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-700">
                We may update this GDPR compliance statement from time to time. Any changes will be posted on this page with an updated "Last updated" date. For significant changes, we will notify you via email or prominent notice on our website.
              </p>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-inspir-purple to-inspir-blue rounded-xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-3">Questions About Your Data?</h3>
              <p className="text-purple-100 mb-6">
                We're committed to transparency and protecting your privacy rights.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-white text-inspir-purple font-bold rounded-lg hover:scale-105 transition-transform"
              >
                Contact Our Privacy Team
              </Link>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-inspir-purple hover:underline font-semibold">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-inspir-purple hover:underline font-semibold">
                Cookie Policy
              </Link>
              <Link href="/terms" className="text-inspir-purple hover:underline font-semibold">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
