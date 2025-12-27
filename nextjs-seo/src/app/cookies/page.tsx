import { Metadata } from 'next'
import PageHeader from '@/partials/PageHeader'
import SeoMeta from '@/partials/SeoMeta'

export const metadata: Metadata = {
  title: 'Cookie Policy - inspir',
  description: 'Learn about how inspir uses cookies and similar technologies.',
}

export default function CookiesPage() {
  return (
    <>
      <SeoMeta
        title="Cookie Policy"
        meta_title="Cookie Policy - inspir"
        description="Learn about how inspir uses cookies and similar technologies."
        canonical="https://inspir.uk/cookies"
      />
      <PageHeader title="Cookie Policy" />
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <article className="content prose prose-lg max-w-none dark:prose-invert">
                <p><em>Last updated: January 2025</em></p>

                <h2>1. What Are Cookies</h2>
                <p>
                  Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.
                </p>

                <h2>2. How We Use Cookies</h2>
                <p>
                  We use cookies to remember your preferences, keep you signed in, and analyze how you use our service to improve it.
                </p>

                <h2>3. Types of Cookies We Use</h2>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings like dark mode</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use our service</li>
                </ul>

                <h2>4. Managing Cookies</h2>
                <p>
                  You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
