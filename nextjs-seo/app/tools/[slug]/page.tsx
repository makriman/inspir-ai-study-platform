import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import { generateToolPageMetadata } from '@/lib/metadata'
import { generateSoftwareApplicationSchema, generateBreadcrumbSchema } from '@/lib/structured-data'
import StructuredData from '@/components/seo/StructuredData'
import { Check, ArrowRight, Sparkles } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createServerClient()
  const { data: tool } = await supabase
    .from('seo_tool_pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!tool) {
    return {
      title: 'Tool Not Found | inspir',
    }
  }

  return generateToolPageMetadata({
    title: tool.seo_title,
    description: tool.seo_description,
    keywords: tool.seo_keywords,
    ogImage: tool.og_image_url,
    canonical: `https://inspir.uk/tools/${tool.slug}`,
  })
}

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: tools } = await supabase
    .from('seo_tool_pages')
    .select('slug')

  return tools?.map((tool) => ({
    slug: tool.slug,
  })) || []
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createServerClient()
  const { data: tool } = await supabase
    .from('seo_tool_pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!tool) {
    notFound()
  }

  // Get 3 related tools (exclude current)
  const { data: relatedTools } = await supabase
    .from('seo_tool_pages')
    .select('*')
    .neq('slug', slug)
    .limit(3)

  const softwareSchema = generateSoftwareApplicationSchema({
    name: tool.title,
    description: tool.description,
    url: `https://inspir.uk/tools/${tool.slug}`,
    image: tool.og_image_url || 'https://inspir.uk/assets/og-images/tools-default-og.png',
    category: 'EducationalApplication',
    offers: {
      price: '0',
      priceCurrency: 'GBP',
      description: '14-day free trial, then £4.99/month',
    },
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://inspir.uk' },
    { name: 'Tools', url: 'https://inspir.uk/tools' },
    { name: tool.title, url: `https://inspir.uk/tools/${tool.slug}` },
  ])

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={breadcrumbSchema} />

      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Study Tool
              </div>
              <h1 className="text-5xl sm:text-6xl font-black mb-6 text-gray-900 dark:text-white">
                {tool.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                {tool.long_description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
                >
                  Try {tool.title} Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-lg text-lg hover:shadow-lg transition-shadow border-2 border-gray-200 dark:border-gray-700"
                >
                  View All Tools
                </Link>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center mb-12 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tool.features?.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-y border-gray-200 dark:border-gray-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center mb-12 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {tool.how_it_works}
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center mb-12 text-gray-900 dark:text-white">
              Perfect For
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {tool.use_cases?.map((useCase: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-green-200 dark:border-green-800"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {useCase}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-black text-white mb-6">
              Ready to Study Smarter?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of students using {tool.title} to achieve their academic goals.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-purple-100 mt-4">
              Access all 15 tools • No credit card required • Cancel anytime
            </p>
          </div>
        </section>

        {/* Related Tools Section */}
        {relatedTools && relatedTools.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-black text-center mb-12 text-gray-900 dark:text-white">
                Explore More Tools
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.slug}
                    href={`/tools/${relatedTool.slug}`}
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-400"
                  >
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {relatedTool.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{relatedTool.description}</p>
                    <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold group-hover:underline">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
