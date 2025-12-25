import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import { generatePageMetadata } from '@/lib/metadata'
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createServerClient()
  const { data: category } = await supabase
    .from('seo_blog_categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    return {
      title: 'Category Not Found | inspir',
    }
  }

  return generatePageMetadata({
    title: `${category.name} Articles | inspir Blog`,
    description: category.seo_description || `Read expert articles about ${category.name.toLowerCase()} on the inspir blog. Study tips, guides, and insights for students.`,
    keywords: ['study tips', category.name.toLowerCase(), 'learning', 'education'],
    canonical: `https://inspir.uk/blog/category/${category.slug}`,
  })
}

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: categories } = await supabase
    .from('seo_blog_categories')
    .select('slug')

  return categories?.map((category) => ({
    slug: category.slug,
  })) || []
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createServerClient()

  // Get the category
  const { data: category } = await supabase
    .from('seo_blog_categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    notFound()
  }

  // Get all posts in this category
  const { data: posts } = await supabase
    .from('seo_blog_posts')
    .select(`
      *,
      author:seo_authors(name),
      category:seo_blog_categories(name, slug, color)
    `)
    .eq('category_id', category.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  // Get all categories for navigation
  const { data: allCategories } = await supabase
    .from('seo_blog_categories')
    .select('*')
    .order('name')

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-purple-600 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">{category.name}</span>
          </div>
        </div>
      </nav>

      {/* Category Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block px-6 py-3 rounded-full text-lg font-bold mb-6"
              style={{
                backgroundColor: category.color ? `${category.color}20` : '#F3F4F6',
                color: category.color || '#374151'
              }}
            >
              {category.icon} {category.name}
            </div>
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="text-gradient">{category.name} Articles</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className="px-5 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              All Posts
            </Link>
            {allCategories?.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className={`px-5 py-2 font-semibold rounded-full transition-colors ${
                  cat.slug === slug
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={
                  cat.slug === slug
                    ? {
                        backgroundColor: cat.color || '#7C3AED',
                      }
                    : {
                        backgroundColor: cat.color ? `${cat.color}20` : undefined,
                        color: cat.color || undefined,
                      }
                }
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts && posts.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600 text-lg">
                  {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-gray-200 hover:border-purple-600"
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
                    <h2 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
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
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles yet</h3>
              <p className="text-lg text-gray-600 mb-8">
                We're working on great content for this category. Check back soon!
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Browse all articles
              </Link>
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
