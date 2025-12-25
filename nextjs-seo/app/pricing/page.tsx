import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { generateProductSchema } from '@/lib/structured-data'
import StructuredData from '@/components/seo/StructuredData'
import { Check } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Pricing - 14-Day Free Trial | inspir',
  description: 'Start your 14-day free trial of inspir AI Study Platform. No credit card required. Access all 15 tools, unlimited AI tutoring, and premium features.',
  keywords: ['pricing', 'free trial', '14-day trial', 'student pricing', 'AI tutor pricing'],
  canonical: 'https://inspir.uk/pricing',
  ogImage: '/assets/og-images/pricing-og.png',
})

export default function PricingPage() {
  const plans = [
    {
      name: 'Free Trial',
      price: '£0',
      period: 'for 14 days',
      description: 'Try everything with no commitment',
      features: [
        'All 15 AI-powered study tools',
        'Unlimited AI tutoring with Claude',
        'Quiz generator & flashcards',
        'Study timer & habit tracker',
        'Full access to all features',
        'No credit card required',
      ],
      cta: 'Start Free Trial',
      href: '/chat',
      popular: true,
    },
    {
      name: 'Basic',
      price: '£4.99',
      period: '/month',
      description: 'Perfect for casual learners',
      features: [
        'All 15 AI-powered tools',
        '100 AI messages per day',
        'Quiz generator & flashcards',
        'Study timer & planner',
        'Email support',
        'Cancel anytime',
      ],
      cta: 'Choose Basic',
      href: '/chat',
      popular: false,
    },
    {
      name: 'Pro',
      price: '£9.99',
      period: '/month',
      description: 'Best for serious students',
      features: [
        'Everything in Basic, plus:',
        'Unlimited AI messages',
        'Priority support',
        'Advanced analytics',
        'Export conversations',
        'Early access to new features',
      ],
      cta: 'Choose Pro',
      href: '/chat',
      popular: false,
    },
  ]

  return (
    <>
      <StructuredData data={generateProductSchema()} />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        {/* Hero */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="text-gradient">Simple, Transparent Pricing</span>
            </h1>
            <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto">
              Start with a 14-day free trial. No credit card required.
            </p>
            <p className="text-lg text-gray-600">
              Cancel anytime. No questions asked.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                    plan.popular ? 'border-4 border-purple-600 scale-105' : 'border-2 border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                      <span className="text-xl text-gray-600 ml-2">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={`block w-full text-center py-4 rounded-lg font-bold text-lg transition-transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {[
                {
                  q: 'Do I need a credit card for the free trial?',
                  a: 'No! Start your 14-day free trial with just an email. No credit card required.',
                },
                {
                  q: 'Can I cancel anytime?',
                  a: 'Yes, you can cancel your subscription at any time with one click. No questions asked.',
                },
                {
                  q: 'What happens after the free trial?',
                  a: "After 14 days, you'll be prompted to choose a plan. Your account won't be charged until you select and confirm a paid plan.",
                },
                {
                  q: 'Is there a student discount?',
                  a: "Our pricing is already student-friendly! We're committed to making AI education accessible to everyone.",
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, debit cards, and PayPal.',
                },
              ].map((faq, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-inspir text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students. Start your free trial today.
            </p>
            <Link
              href="/chat"
              className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-2xl"
            >
              Start 14-Day Free Trial
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
