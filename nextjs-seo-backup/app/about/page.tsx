import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'About inspir - AI-Powered Study Platform',
  description: 'Learn about inspir, the revolutionary AI study platform powered by Claude. Our mission is to make education accessible and effective for every student.',
  keywords: ['about inspir', 'AI education', 'study platform', 'mission'],
  canonical: 'https://inspir.uk/about',
})

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black mb-6 text-gradient">About inspir</h1>
          <p className="text-xl text-gray-700">
            Revolutionizing education with AI-powered learning tools
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2>Our Mission</h2>
          <p>
            At inspir, we believe every student deserves access to world-class educational support. We're building the future of learning by combining cutting-edge AI technology with proven study methodologies.
          </p>

          <h2>What Makes Us Different</h2>
          <p>
            Unlike traditional AI chatbots, inspir is purpose-built for students. We integrate 15 specialized study tools directly into your learning workflow, from quiz generators and flashcards to study timers and habit trackers.
          </p>

          <h2>Powered by Claude AI</h2>
          <p>
            Our platform is powered by Anthropic's Claude, one of the world's most advanced AI systems. Claude provides accurate, helpful, and age-appropriate educational support for students of all levels.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li><strong>Accessibility</strong> - Education should be available to everyone</li>
            <li><strong>Safety</strong> - Age-appropriate content and robust moderation</li>
            <li><strong>Excellence</strong> - The best tools, beautifully designed</li>
            <li><strong>Innovation</strong> - Constantly improving and adding new features</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have questions or feedback? Reach out to us at <a href="mailto:support@inspir.uk">support@inspir.uk</a>
          </p>
        </div>
      </section>
    </main>
  )
}
