import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { createServerClient } from '@/lib/supabase'

export const metadata = generatePageMetadata({
  title: '15 AI Study Tools | inspir',
  description: 'Explore 15 AI-powered study tools including quiz generator, flashcards, study timer, math solver, and more. All in one platform.',
  keywords: ['study tools', 'AI tools', 'student tools', 'learning tools'],
  canonical: 'https://inspir.uk/tools',
})

export default async function ToolsPage() {
  const supabase = createServerClient()
  const { data: tools } = await supabase
    .from('seo_tool_pages')
    .select('*')
    .order('title')

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="text-gradient">15 AI-Powered Study Tools</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Everything you need to study smarter, all in one platform. From quiz generators to study timers, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tools?.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-gray-200 hover:border-purple-600"
              >
                <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <span className="text-purple-600 font-semibold group-hover:underline">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-black mb-6">All Tools Included in Free Trial</h2>
          <p className="text-xl text-gray-700 mb-8">
            Start your 14-day free trial and get instant access to all 15 tools. No credit card required.
          </p>
          <Link
            href="/chat"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </main>
  )
}
