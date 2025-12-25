import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { generatePageMetadata } from '@/lib/metadata'
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Study Tips & AI Education Blog | inspir',
  description: 'Expert study tips, exam preparation guides, and AI education insights. Learn how to study smarter with proven techniques and AI-powered tools.',
  keywords: ['study tips', 'exam preparation', 'learning strategies', 'AI education', 'student blog'],
  canonical: 'https://inspir.uk/blog',
})

export default async function BlogPage() {
  const supabase = createServerClient()

  // Get all published blog posts
  const { data: posts } = await supabase
    .from('seo_blog_posts')
    .select(`
      *,
      author:seo_authors(name, avatar_url),
      category:seo_blog_categories(name, slug, color)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  // Get all categories for filtering
  const { data: categories } = await supabase
    .from('seo_blog_categories')
    .select('*')
    .order('name')

  // Get featured posts (top 3)
  const featuredPosts = posts?.slice(0, 3) || []
  const regularPosts = posts?.slice(3) || []

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Study Smarter, Not Harder
            </div>
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="text-gradient">inspir Learning Hub</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Expert study tips, exam preparation guides, and insights on AI-powered learning. Everything you need to excel academically.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
            >
              All Posts
            </Link>
            {categories?.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="px-5 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors"
                style={{
                  backgroundColor: category.color ? `${category.color}20` : undefined,
                  color: category.color || undefined
                }}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                >
                  {post.featured_image && (
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        {post.category?.name?.includes('Study') && '📚'}
                        {post.category?.name?.includes('Tool') && '🛠️'}
                        {post.category?.name?.includes('Subject') && '📖'}
                        {post.category?.name?.includes('Exam') && '✅'}
                        {post.category?.name?.includes('Productivity') && '⚡'}
                        {post.category?.name?.includes('AI') && '🤖'}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    {post.category && (
                      <span
                        className="inline-block px-3 py-1 text-sm font-semibold rounded-full mb-3"
                        style={{
                          backgroundColor: post.category.color ? `${post.category.color}20` : '#F3F4F6',
                          color: post.category.color || '#374151'
                        }}
                      >
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      {post.avg_read_time_minutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.avg_read_time_minutes} min read
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Latest Articles
          </h2>

          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 border-2 border-gray-200 hover:border-purple-600"
                >
                  {post.category && (
                    <span
                      className="inline-block px-3 py-1 text-sm font-semibold rounded-full mb-3"
                      style={{
                        backgroundColor: post.category.color ? `${post.category.color}20` : '#F3F4F6',
                        color: post.category.color || '#374151'
                      }}
                    >
                      {post.category.name}
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                      {post.avg_read_time_minutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.avg_read_time_minutes}m
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Transform Your Study Habits?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Apply these insights with our AI-powered study tools. Start your 14-day free trial today.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-purple-100 mt-4">
            No credit card required • All 15 tools included • Cancel anytime
          </p>
        </div>
      </section>
    </main>
  )
}
