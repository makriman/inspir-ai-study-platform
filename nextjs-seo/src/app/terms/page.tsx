import { Metadata } from 'next'
import PageHeader from '@/partials/PageHeader'
import SeoMeta from '@/partials/SeoMeta'

export const metadata: Metadata = {
  title: 'Terms of Service - inspir',
  description: 'Read our terms of service for using the inspir AI study platform.',
}

export default function TermsPage() {
  return (
    <>
      <SeoMeta
        title="Terms of Service"
        meta_title="Terms of Service - inspir"
        description="Read our terms of service for using the inspir AI study platform."
        canonical="https://inspir.uk/terms"
      />
      <PageHeader title="Terms of Service" />
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <article className="content prose prose-lg max-w-none dark:prose-invert">
                <p><em>Last updated: January 2025</em></p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using inspir, you agree to be bound by these Terms of Service.
                </p>

                <h2>2. Use of Service</h2>
                <p>
                  You must use our service responsibly and in accordance with all applicable laws. Do not misuse our AI tutoring platform or attempt to gain unauthorized access.
                </p>

                <h2>3. User Content</h2>
                <p>
                  You retain ownership of your study conversations and content. By using our service, you grant us permission to use this content to provide and improve our AI services.
                </p>

                <h2>4. Limitation of Liability</h2>
                <p>
                  inspir is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages.
                </p>

                <h2>5. Changes to Terms</h2>
                <p>
                  We may update these terms from time to time. Continued use of the service constitutes acceptance of updated terms.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
