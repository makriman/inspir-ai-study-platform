import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/structured-data'
import StructuredData from '@/components/seo/StructuredData'

export const metadata = generatePageMetadata({
  title: 'inspir - AI Study Platform | 14-Day Free Trial',
  description: 'Revolutionary AI study platform with 15 tools. Get instant homework help, create quizzes, use flashcards, and more. Start your 14-day free trial today.',
  keywords: ['AI tutor', 'study platform', 'homework help', 'online learning'],
  canonical: 'https://inspir.uk',
})

export default function Home() {
  return (
    <>
      <StructuredData data={generateOrganizationSchema()} />
      <StructuredData data={generateWebsiteSchema()} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-5xl sm:text-7xl font-black mb-6">
                <span className="text-gradient">
                  Revolutionary AI Study Platform
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Get instant help with homework, create quizzes, use flashcards, and access 15 powerful study tools. Powered by Claude AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/chat"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
                >
                  Start 14-Day Free Trial
                </Link>
                <Link
                  href="/tools"
                  className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg border-2 border-purple-600"
                >
                  Explore Tools
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center mb-16">
              15 Tools in One Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Quiz Generator', desc: 'Create custom quizzes instantly', icon: '📝' },
                { name: 'Flashcards', desc: 'Study with smart flashcards', icon: '🃏' },
                { name: 'Study Timer', desc: 'Pomodoro & focus timers', icon: '⏰' },
                { name: 'Math Solver', desc: 'Step-by-step solutions', icon: '🧮' },
                { name: 'AI Tutor', desc: 'Get instant homework help', icon: '💡' },
                { name: 'Study Music', desc: 'Focus-enhancing playlists', icon: '🎵' },
              ].map((tool) => (
                <div key={tool.name} className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-600 hover:shadow-xl transition-all">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-gray-600">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 gradient-inspir text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Ready to Study Smarter?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students already using inspir. No credit card required.
            </p>
            <Link
              href="/chat"
              className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-2xl"
            >
              Start Free Trial Now
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
