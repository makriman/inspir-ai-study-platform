import { Metadata } from 'next'
import Link from 'next/link'
import SeoMeta from '@/partials/SeoMeta'
import { FaCheck, FaUsers, FaSchool, FaBuilding, FaInfinity } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Pricing - Simple, Fair, Unlimited | inspir',
  description: 'One simple price: £6.99 per profile. Everything unlimited. Perfect for parents, schools, organizations, and companies. Pay only for the profiles you need.',
}

export default function PricingPage() {
  return (
    <>
      <SeoMeta
        title="Pricing"
        meta_title="Pricing - Simple, Fair, Unlimited | inspir"
        description="One simple price: £6.99 per profile. Everything unlimited. Perfect for parents, schools, organizations, and companies. Pay only for the profiles you need."
        image="/assets/og-image.png"
        canonical="https://inspir.uk/pricing"
      />

      {/* Hero Section */}
      <section className="section pt-16 pb-0">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10 text-center">
              <h1 className="mb-6">
                Simple, Fair Pricing
              </h1>
              <p className="mb-4 text-2xl font-bold text-primary">
                £6.99 per profile/month
              </p>
              <p className="mb-8 text-xl text-text/80 dark:text-darkmode-text/80">
                Everything unlimited. No hidden fees. No complicated tiers.
                <br />
                Just pay for the profiles you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Card */}
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-8">
              <div className="overflow-hidden rounded-2xl border-2 border-primary bg-white shadow-2xl dark:bg-darkmode-body">
                {/* Pricing Header */}
                <div className="bg-gradient-to-br from-primary via-blue-600 to-purple-600 p-12 text-center text-white">
                  <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                    <FaInfinity className="text-4xl" />
                  </div>
                  <h2 className="mb-4 text-white">Unlimited Everything</h2>
                  <div className="mb-4">
                    <span className="text-6xl font-bold">£6.99</span>
                    <span className="text-xl opacity-90">/profile/month</span>
                  </div>
                  <p className="text-lg opacity-90">
                    One price. All features. No limits.
                  </p>
                </div>

                {/* Features List */}
                <div className="p-8">
                  <h3 className="mb-6 text-center text-xl font-bold">
                    What's Included in Every Profile
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      'Unlimited AI conversations',
                      'All 15 study tools included',
                      'Unlimited quiz generation',
                      'Unlimited flashcards',
                      'Unlimited practice tests',
                      'AI homework help',
                      'Math problem solving',
                      'Essay writing assistance',
                      'Study planning & scheduling',
                      'Progress tracking',
                      'All subjects covered',
                      'Priority support',
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                          <FaCheck className="text-sm text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Link href="/chat" className="btn btn-primary btn-lg w-full md:w-auto">
                      Get Started Now
                    </Link>
                    <p className="mt-4 text-sm text-text/60 dark:text-darkmode-text/60">
                      Start with a free trial • No credit card required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="section bg-light dark:bg-darkmode-light">
        <div className="container">
          <div className="row justify-center mb-12">
            <div className="lg:col-8 text-center">
              <h2 className="mb-4">Perfect For Everyone</h2>
              <p className="text-lg text-text/80 dark:text-darkmode-text/80">
                Parents, schools, organizations, and companies trust inspir
              </p>
            </div>
          </div>
          <div className="row gy-4">
            <div className="md:col-6 lg:col-3">
              <div className="h-full rounded-lg bg-white p-6 text-center shadow-md dark:bg-darkmode-body">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FaUsers className="text-3xl text-primary" />
                </div>
                <h3 className="h5 mb-3">Parents</h3>
                <p className="mb-3 text-sm">
                  <strong className="text-primary">2 kids?</strong> £13.98/month
                </p>
                <p className="text-sm text-text/80 dark:text-darkmode-text/80">
                  Create profiles for each child. Track their progress separately. Cancel anytime.
                </p>
              </div>
            </div>
            <div className="md:col-6 lg:col-3">
              <div className="h-full rounded-lg bg-white p-6 text-center shadow-md dark:bg-darkmode-body">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10">
                  <FaSchool className="text-3xl text-blue-600" />
                </div>
                <h3 className="h5 mb-3">Schools</h3>
                <p className="mb-3 text-sm">
                  <strong className="text-blue-600">30 students?</strong> £209.70/month
                </p>
                <p className="text-sm text-text/80 dark:text-darkmode-text/80">
                  Provision profiles for your class. Monitor usage. Add or remove students easily.
                </p>
              </div>
            </div>
            <div className="md:col-6 lg:col-3">
              <div className="h-full rounded-lg bg-white p-6 text-center shadow-md dark:bg-darkmode-body">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10">
                  <FaBuilding className="text-3xl text-green-600" />
                </div>
                <h3 className="h5 mb-3">Organizations</h3>
                <p className="mb-3 text-sm">
                  <strong className="text-green-600">100 profiles?</strong> £699/month
                </p>
                <p className="text-sm text-text/80 dark:text-darkmode-text/80">
                  Perfect for NGOs, tutoring centers, and educational programs.
                </p>
              </div>
            </div>
            <div className="md:col-6 lg:col-3">
              <div className="h-full rounded-lg bg-white p-6 text-center shadow-md dark:bg-darkmode-body">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-600/10">
                  <FaBuilding className="text-3xl text-amber-600" />
                </div>
                <h3 className="h5 mb-3">Companies</h3>
                <p className="mb-3 text-sm">
                  <strong className="text-amber-600">Custom scale</strong>
                </p>
                <p className="text-sm text-text/80 dark:text-darkmode-text/80">
                  Employee training, onboarding, upskilling. Same simple pricing at any scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="row justify-center mb-12">
            <div className="lg:col-8 text-center">
              <h2 className="mb-4">How Profile Management Works</h2>
              <p className="text-lg text-text/80 dark:text-darkmode-text/80">
                Simple dashboard for parents, schools, and organizations
              </p>
            </div>
          </div>
          <div className="row justify-center">
            <div className="lg:col-10">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    1
                  </div>
                  <h3 className="h5 mb-3">Create Your Account</h3>
                  <p className="text-sm text-text/80 dark:text-darkmode-text/80">
                    Sign up on the dashboard (for adults 18+). Set up billing once.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    2
                  </div>
                  <h3 className="h5 mb-3">Add Profiles</h3>
                  <p className="text-sm text-text/80 dark:text-darkmode-text/80">
                    Create profiles for your kids, students, or team members. As many as you need.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    3
                  </div>
                  <h3 className="h5 mb-3">Pay Per Profile</h3>
                  <p className="text-sm text-text/80 dark:text-darkmode-text/80">
                    £6.99/month per active profile. Add or remove profiles anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-light dark:bg-darkmode-light">
        <div className="container">
          <div className="row justify-center mb-12">
            <div className="lg:col-8 text-center">
              <h2 className="mb-4">Frequently Asked Questions</h2>
            </div>
          </div>
          <div className="row justify-center">
            <div className="lg:col-10">
              <div className="space-y-6">
                {[
                  {
                    q: "What counts as a 'profile'?",
                    a: "A profile is a single learner account with their own chat history, progress tracking, and settings. Parents typically create one profile per child. Schools create one per student."
                  },
                  {
                    q: "Is there really no limit on AI usage?",
                    a: "Correct! Each profile gets unlimited AI conversations, unlimited tool usage, and access to all features. No daily limits, no usage caps, no throttling."
                  },
                  {
                    q: "Can I add or remove profiles anytime?",
                    a: "Absolutely! Add profiles when you need them, pause or remove them when you don't. You're only billed for active profiles each month."
                  },
                  {
                    q: "Is there a free trial?",
                    a: "Yes! Start with a free trial to test inspir with your first profile. No credit card required to start."
                  },
                  {
                    q: "What if I need 1000+ profiles?",
                    a: "Same simple pricing applies! £6.99 per profile regardless of scale. For enterprise support and custom onboarding, contact our team."
                  },
                  {
                    q: "Do you offer discounts for schools or nonprofits?",
                    a: "We're working on education and nonprofit programs. Contact us to discuss your needs and we'll find a solution that works."
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit and debit cards. Organizations can also pay via invoice for annual contracts."
                  },
                  {
                    q: "Can students under 18 create their own accounts?",
                    a: "No. Only adults (18+) can create dashboard accounts and manage billing. They then provision profiles for students of any age."
                  }
                ].map((faq, index) => (
                  <div key={index} className="rounded-lg bg-white p-6 shadow-md dark:bg-darkmode-body">
                    <h3 className="mb-3 text-lg font-bold">{faq.q}</h3>
                    <p className="text-text/80 dark:text-darkmode-text/80">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <div className="rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-purple-600 p-12 text-center text-white">
                <h2 className="mb-4 text-white">Ready to Get Started?</h2>
                <p className="mb-8 text-lg opacity-90">
                  Join thousands of parents, schools, and organizations using inspir.
                  <br />
                  Start your free trial today.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/chat"
                    className="btn bg-white text-primary hover:bg-white/90"
                  >
                    Start Free Trial
                  </Link>
                  <Link
                    href="/contact"
                    className="btn border-2 border-white bg-transparent text-white hover:bg-white/10"
                  >
                    Contact Sales
                  </Link>
                </div>
                <p className="mt-6 text-sm opacity-75">
                  ✨ No credit card required • Cancel anytime • Full support included
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
