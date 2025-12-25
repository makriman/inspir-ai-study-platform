import Link from 'next/link'
import { Home, Search, BookOpen, Wrench, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-inspir-purple via-inspir-blue to-inspir-lime">
            404
          </h1>
          <div className="text-6xl mb-4">🤔</div>
        </div>

        {/* Message */}
        <h2 className="text-4xl font-black text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track!
        </p>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Link
            href="/"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-inspir-purple to-inspir-blue rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Go Home</h3>
            <p className="text-sm text-gray-600">Return to homepage</p>
          </Link>

          <Link
            href="/blog"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-inspir-blue to-inspir-lime rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Browse Blog</h3>
            <p className="text-sm text-gray-600">Read study tips</p>
          </Link>

          <Link
            href="/tools"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-inspir-lime to-inspir-coral rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">View Tools</h3>
            <p className="text-sm text-gray-600">Explore 15 tools</p>
          </Link>

          <Link
            href="/contact"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-inspir-coral to-inspir-purple rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Get Help</h3>
            <p className="text-sm text-gray-600">Contact support</p>
          </Link>
        </div>

        {/* Popular Pages */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Pages</h3>
          <div className="space-y-3">
            <Link
              href="/tools/quiz-generator"
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-700 group-hover:text-inspir-purple font-semibold">
                AI Quiz Generator
              </span>
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-inspir-purple rotate-180 transition-colors" />
            </Link>
            <Link
              href="/tools/flashcards"
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-700 group-hover:text-inspir-purple font-semibold">
                AI Flashcards
              </span>
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-inspir-purple rotate-180 transition-colors" />
            </Link>
            <Link
              href="/blog/active-recall-study-technique-guide"
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-700 group-hover:text-inspir-purple font-semibold">
                Active Recall Study Guide
              </span>
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-inspir-purple rotate-180 transition-colors" />
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-700 group-hover:text-inspir-purple font-semibold">
                Pricing & Free Trial
              </span>
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-inspir-purple rotate-180 transition-colors" />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-inspir-purple to-inspir-blue text-white font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Start Learning with AI
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
          <p className="text-sm text-gray-600 mt-4">
            14-day free trial • No credit card required
          </p>
        </div>
      </div>
    </main>
  )
}
