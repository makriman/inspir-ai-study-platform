import { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import SeoMeta from '@/partials/SeoMeta'
import { FaArrowRight, FaBrain, FaRocket, FaShieldAlt, FaUsers } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'inspir - Revolutionary AI Study Platform | Powered by Claude Sonnet 4.5',
  description: 'Transform your learning with inspir - the revolutionary AI study platform. 15 powerful study tools, intelligent tutoring, and personalized learning paths. Study smarter, not harder.',
}

export const revalidate = 3600

export default async function Home() {
  const supabase = createServerClient()

  // Fetch featured tools
  const { data: tools } = await supabase
    .from('seo_tool_pages')
    .select('*')
    .limit(6)

  // Fetch recent blog posts
  const { data: posts } = await supabase
    .from('seo_blog_posts')
    .select(`
      *,
      author:seo_authors(name, avatar_url),
      category:seo_blog_categories(name, slug, color)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <>
      <SeoMeta
        title="inspir - Revolutionary AI Study Platform"
        meta_title="inspir - Revolutionary AI Study Platform | Powered by Claude Sonnet 4.5"
        description="Transform your learning with inspir - the revolutionary AI study platform. 15 powerful study tools, intelligent tutoring, and personalized learning paths. Study smarter, not harder."
        image="/og-image.jpg"
        canonical="https://inspir.uk/"
      />

      {/* Hero Section */}
      <section className="section pb-0 pt-16 md:pt-24">
        <div className="container">
          <div className="row items-center justify-center">
            <div className="lg:col-7 mb-8 text-center lg:text-left">
              <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-7xl">
                Study Smarter with
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> AI-Powered </span>
                Learning
              </h1>
              <p className="mb-8 text-xl text-text/80 dark:text-darkmode-text/80">
                Revolutionary AI study platform powered by Claude Sonnet 4.5. Features 15 intelligent study tools, personalized tutoring, and adaptive learning that transforms how you study.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  className="btn btn-primary btn-lg inline-flex items-center gap-2"
                  href="/chat"
                >
                  Start Learning Free
                  <FaArrowRight />
                </Link>
                <Link
                  className="btn btn-outline-primary btn-lg"
                  href="/tools"
                >
                  Explore 15 Tools
                </Link>
              </div>
              <p className="mt-4 text-sm text-text/60 dark:text-darkmode-text/60">
                ✨ No credit card required • Get started in 30 seconds
              </p>
            </div>
            <div className="lg:col-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-3xl"></div>
                <img
                  src="/images/call-to-action.png"
                  alt="inspir AI Study Platform"
                  className="relative rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <div className="rounded-2xl bg-gradient-to-r from-primary to-blue-600 p-8 text-white">
                <div className="row text-center">
                  <div className="md:col-4 mb-4 md:mb-0">
                    <div className="text-4xl font-bold">15+</div>
                    <div className="text-sm opacity-90">Study Tools</div>
                  </div>
                  <div className="md:col-4 mb-4 md:mb-0">
                    <div className="text-4xl font-bold">100K+</div>
                    <div className="text-sm opacity-90">Students Helped</div>
                  </div>
                  <div className="md:col-4">
                    <div className="text-4xl font-bold">98%</div>
                    <div className="text-sm opacity-90">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-light dark:bg-darkmode-light">
        <div className="container">
          <div className="row justify-center mb-12">
            <div className="lg:col-8 text-center">
              <h2 className="mb-4">Why Students Love inspir</h2>
              <p className="text-lg text-text/80 dark:text-darkmode-text/80">
                Built for students, by educators. Powered by the world's most advanced AI.
              </p>
            </div>
          </div>
          <div className="row gy-4">
            <div className="md:col-6 lg:col-3">
              <div className="h-full rounded-lg bg-white p-6 text-center shadow-md dark:bg-darkmode-body">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FaBrain className="text-3xl text-primary" />
                </div>
                <h3 className="h5 mb-3">AI-Powered Intelligence</h3>
                <p className="text-sm">
                  Powered by Claude Sonnet 4.5 - the most advanced AI for education and tutoring.
                </p>
              </div>
            </div>
            <div className="md:col-6 lg:col-3">
              <div className="h-full rounded-lg bg-white p-6 text-center shadow-md dark:bg-darkmode-body">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10">
                  <FaRocket className="text-3xl text-blue-600" />
                </div>
                <h3 className="h5 mb-3">15 Revolutionary Tools</h3>
                <p className="text-sm">
                  Quiz generator, flashcards, study timer, math solver, and 11 more innovative tools.
                </p>
              </div>
            </div>
            <div className="md:col-6 lg:col-3">
              <div className="h-full rounded-lg bg-white p-6 text-center shadow-md dark:bg-darkmode-body">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10">
                  <FaShieldAlt className="text-3xl text-green-600" />
                </div>
                <h3 className="h5 mb-3">Safe & Private</h3>
                <p className="text-sm">
                  Age-appropriate content filtering, privacy-first design, and secure data handling.
                </p>
              </div>
            </div>
            <div className="md:col-6 lg:col-3">
              <div className="h-full rounded-lg bg-white p-6 text-center shadow-md dark:bg-darkmode-body">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-600/10">
                  <FaUsers className="text-3xl text-amber-600" />
                </div>
                <h3 className="h5 mb-3">Personalized Learning</h3>
                <p className="text-sm">
                  Adaptive AI that learns your style and creates custom study paths just for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      {tools && tools.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="row justify-center mb-12">
              <div className="lg:col-8 text-center">
                <h2 className="mb-4">Powerful Study Tools</h2>
                <p className="text-lg text-text/80 dark:text-darkmode-text/80">
                  Everything you need to study effectively, all in one place.
                </p>
              </div>
            </div>
            <div className="row gy-4">
              {tools.slice(0, 6).map((tool: any) => (
                <div key={tool.id} className="md:col-6 lg:col-4">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="block h-full rounded-lg border-2 border-border p-6 transition-all hover:border-primary hover:shadow-lg dark:border-darkmode-border dark:hover:border-darkmode-primary"
                  >
                    <h3 className="h5 mb-3">{tool.title}</h3>
                    <p className="mb-4 text-sm text-text/80 dark:text-darkmode-text/80">
                      {tool.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Learn more <FaArrowRight className="text-xs" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/tools" className="btn btn-outline-primary">
                View All 15 Tools
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Blog Posts */}
      {posts && posts.length > 0 && (
        <section className="section bg-light dark:bg-darkmode-light">
          <div className="container">
            <div className="row justify-center mb-12">
              <div className="lg:col-8 text-center">
                <h2 className="mb-4">Latest Study Tips & Guides</h2>
                <p className="text-lg text-text/80 dark:text-darkmode-text/80">
                  Expert advice, study strategies, and learning science insights.
                </p>
              </div>
            </div>
            <div className="row gy-4">
              {posts.map((post: any) => (
                <div key={post.id} className="md:col-6 lg:col-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-xl dark:bg-darkmode-body"
                  >
                    {post.category && (
                      <span
                        className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: post.category.color || '#7C3AED',
                          color: '#fff',
                        }}
                      >
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="h5 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="mb-4 text-sm text-text/80 line-clamp-3 dark:text-darkmode-text/80">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text/60 dark:text-darkmode-text/60">
                      {post.author && <span>{post.author.name}</span>}
                      {post.avg_read_time_minutes && (
                        <>
                          <span>•</span>
                          <span>{post.avg_read_time_minutes} min read</span>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blog" className="btn btn-outline-primary">
                Read More Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <div className="rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-purple-600 p-12 text-center text-white">
                <h2 className="mb-4 text-white">Ready to Transform Your Learning?</h2>
                <p className="mb-8 text-lg opacity-90">
                  Join thousands of students already using inspir to study smarter, ace exams, and achieve their academic goals.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/chat"
                    className="btn bg-white text-primary hover:bg-white/90"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="/pricing"
                    className="btn border-2 border-white bg-transparent text-white hover:bg-white/10"
                  >
                    View Pricing
                  </Link>
                </div>
                <p className="mt-6 text-sm opacity-75">
                  ✨ 14-day free trial • No credit card required • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
