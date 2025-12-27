import { Metadata } from 'next'
import PageHeader from '@/partials/PageHeader'
import SeoMeta from '@/partials/SeoMeta'

export const metadata: Metadata = {
  title: 'Privacy Policy - inspir',
  description: 'Learn how inspir protects your privacy and handles your data.',
}

export default function PrivacyPage() {
  return (
    <>
      <SeoMeta
        title="Privacy Policy"
        meta_title="Privacy Policy - inspir"
        description="Learn how inspir protects your privacy and handles your data."
        canonical="https://inspir.uk/privacy"
      />
      <PageHeader title="Privacy Policy" />
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <article className="content prose prose-lg max-w-none dark:prose-invert">
                <p><em>Last updated: January 2025</em></p>

                <h2>1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, including your study conversations, preferences, and account information.
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>
                  We use your information to provide and improve our AI tutoring services, personalize your learning experience, and communicate with you about our services.
                </p>

                <h2>3. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2>4. Your Rights</h2>
                <p>
                  You have the right to access, update, or delete your personal information at any time. Contact us to exercise these rights.
                </p>

                <h2>5. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us via our contact page.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
