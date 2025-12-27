import { Metadata } from 'next'
import PageHeader from '@/partials/PageHeader'
import SeoMeta from '@/partials/SeoMeta'

export const metadata: Metadata = {
  title: 'GDPR Compliance - inspir',
  description: 'Learn about our GDPR compliance and data protection practices.',
}

export default function GDPRPage() {
  return (
    <>
      <SeoMeta
        title="GDPR Compliance"
        meta_title="GDPR Compliance - inspir"
        description="Learn about our GDPR compliance and data protection practices."
        canonical="https://inspir.uk/gdpr"
      />
      <PageHeader title="GDPR Compliance" />
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <article className="content prose prose-lg max-w-none dark:prose-invert">
                <p><em>Last updated: January 2025</em></p>

                <h2>Your Rights Under GDPR</h2>
                <p>
                  As a user in the European Economic Area (EEA), you have specific rights regarding your personal data:
                </p>

                <h3>1. Right to Access</h3>
                <p>
                  You have the right to request a copy of the personal data we hold about you.
                </p>

                <h3>2. Right to Rectification</h3>
                <p>
                  You can request that we correct any inaccurate personal data or complete incomplete data.
                </p>

                <h3>3. Right to Erasure</h3>
                <p>
                  You can request that we delete your personal data under certain circumstances.
                </p>

                <h3>4. Right to Data Portability</h3>
                <p>
                  You can request to receive your personal data in a structured, commonly used format.
                </p>

                <h3>5. Right to Object</h3>
                <p>
                  You have the right to object to our processing of your personal data.
                </p>

                <h2>How to Exercise Your Rights</h2>
                <p>
                  To exercise any of these rights, please contact us through our contact page. We will respond to your request within 30 days.
                </p>

                <h2>Data Protection Officer</h2>
                <p>
                  For questions about our GDPR compliance or data protection practices, you can contact our Data Protection Officer via our contact page.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
