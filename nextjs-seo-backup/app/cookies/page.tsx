import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn about how inspir uses cookies and similar technologies to enhance your browsing experience.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Cookie Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: December 24, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies for several purposes:
            </p>

            <div className="bg-gray-50 border-l-4 border-inspir-purple p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Necessary Cookies (Always Active)</h3>
              <p className="text-gray-700 mb-2">
                These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Session management and authentication</li>
                <li>Security and fraud prevention</li>
                <li>Load balancing</li>
                <li>Cookie consent preferences</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2 italic">
                Duration: Session cookies (deleted when you close your browser) or up to 1 year
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Analytics Cookies (Optional)</h3>
              <p className="text-gray-700 mb-2">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Google Analytics (page views, session duration, bounce rate)</li>
                <li>Performance monitoring</li>
                <li>User behavior patterns</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2 italic">
                Duration: Up to 2 years
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Functional Cookies (Optional)</h3>
              <p className="text-gray-700 mb-2">
                These cookies enable enhanced functionality and personalization.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Remembering your preferences (theme, language)</li>
                <li>Saved study tools and notes</li>
                <li>Chat history and conversation state</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2 italic">
                Duration: Up to 1 year
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-yellow-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Marketing Cookies (Optional)</h3>
              <p className="text-gray-700 mb-2">
                These cookies track your activity to help us deliver more relevant advertising and marketing messages.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Advertising performance tracking</li>
                <li>Retargeting campaigns</li>
                <li>Conversion tracking</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2 italic">
                Duration: Up to 1 year
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-700 mb-4">
              You have full control over which cookies we use. You can manage your preferences at any time:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Use our cookie consent banner when you first visit the site</li>
              <li>Change your browser settings to block or delete cookies</li>
              <li>Opt out of Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-inspir-purple hover:underline" target="_blank" rel="noopener">Google Analytics Opt-out</a></li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Blocking necessary cookies may prevent some features of our website from working properly.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use some third-party services that may set their own cookies:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Google Analytics:</strong> Website analytics (<a href="https://policies.google.com/privacy" className="text-inspir-purple hover:underline" target="_blank" rel="noopener">Privacy Policy</a>)</li>
              <li><strong>Supabase:</strong> Backend database services (<a href="https://supabase.com/privacy" className="text-inspir-purple hover:underline" target="_blank" rel="noopener">Privacy Policy</a>)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Under GDPR and UK data protection laws, you have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access the data we collect about you</li>
              <li>Request deletion of your data</li>
              <li>Object to certain types of processing</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with the ICO (UK supervisory authority)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. We will notify you of any significant changes by updating the "Last updated" date at the top of this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700"><strong>Inspir Learning Ltd</strong></p>
              <p className="text-gray-700">Email: privacy@inspir.uk</p>
              <p className="text-gray-700">Registered in the United Kingdom</p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-inspir-purple hover:underline font-semibold">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-inspir-purple hover:underline font-semibold">
                Terms & Conditions
              </Link>
              <Link href="/gdpr" className="text-inspir-purple hover:underline font-semibold">
                GDPR Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
