import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import { generateBlogPostMetadata } from '@/lib/metadata'
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/structured-data'
import StructuredData from '@/components/seo/StructuredData'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react'
import ShareButtons from '@/components/blog/ShareButtons'
import RelatedPosts from '@/components/blog/RelatedPosts'
import TableOfContents from '@/components/blog/TableOfContents'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createServerClient()
  const { data: post } = await supabase
    .from('seo_blog_posts')
    .select(`
      *,
      author:seo_authors(name),
      category:seo_blog_categories(name)
    `)
    .eq('slug', slug)
    .single()

  if (!post) {
    return {
      title: 'Post Not Found | inspir',
    }
  }

  return generateBlogPostMetadata({
    title: post.seo_title,
    description: post.seo_description,
    keywords: post.seo_keywords,
    ogImage: post.og_image_url,
    canonical: `https://inspir.uk/blog/${post.slug}`,
    publishedTime: post.published_at,
    modifiedTime: post.updated_at,
    author: post.author?.name || 'inspir Team',
  })
}

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: posts } = await supabase
    .from('seo_blog_posts')
    .select('slug')
    .eq('status', 'published')

  return posts?.map((post) => ({
    slug: post.slug,
  })) || []
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createServerClient()

  // Get the blog post with author and category
  const { data: post } = await supabase
    .from('seo_blog_posts')
    .select(`
      *,
      author:seo_authors(name, bio, avatar_url),
      category:seo_blog_categories(name, slug, color)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    notFound()
  }

  // Get related posts (same category, exclude current) - increased to 6 for better interlinking
  const { data: relatedPosts } = await supabase
    .from('seo_blog_posts')
    .select(`
      *,
      category:seo_blog_categories(name, slug, color)
    `)
    .eq('category_id', post.category_id)
    .eq('status', 'published')
    .neq('id', post.id)
    .order('published_at', { ascending: false })
    .limit(6)

  // Get tags for this post
  const { data: postTags } = await supabase
    .from('seo_blog_post_tags')
    .select(`
      tag:seo_blog_tags(name, slug)
    `)
    .eq('post_id', post.id)

  const tags = (postTags?.map(pt => pt.tag).filter(Boolean) || []) as unknown as Array<{ name: string; slug: string }>

  // Generate structured data
  const blogPostSchema = generateBlogPostSchema({
    title: post.title,
    description: post.excerpt,
    url: `https://inspir.uk/blog/${post.slug}`,
    image: post.og_image_url || 'https://inspir.uk/assets/og-images/blog-default-og.png',
    publishedTime: post.published_at,
    modifiedTime: post.updated_at,
    author: post.author?.name || 'inspir Team',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://inspir.uk' },
    { name: 'Blog', url: 'https://inspir.uk/blog' },
    { name: post.category?.name || 'Article', url: `https://inspir.uk/blog/category/${post.category?.slug}` },
    { name: post.title, url: `https://inspir.uk/blog/${post.slug}` },
  ])

  // Increment view count (fire and forget)
  supabase
    .from('seo_blog_posts')
    .update({ view_count: (post.view_count || 0) + 1 })
    .eq('id', post.id)
    .then()

  return (
    <>
      <StructuredData data={blogPostSchema} />
      <StructuredData data={breadcrumbSchema} />

      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Breadcrumbs */}
        <nav className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-purple-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-purple-600 transition-colors">
                Blog
              </Link>
              {post.category && (
                <>
                  <span>/</span>
                  <Link
                    href={`/blog/category/${post.category.slug}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {post.category.name}
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Article Header & Content */}
        <article className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto lg:mx-0">
            {/* Category Badge */}
            {post.category && (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-6 hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: post.category.color ? `${post.category.color}20` : '#F3F4F6',
                  color: post.category.color || '#374151'
                }}
              >
                {post.category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-700">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{post.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
              {post.avg_read_time_minutes && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.avg_read_time_minutes} min read</span>
                </div>
              )}
              {post.view_count && post.view_count > 0 && (
                <div className="flex items-center gap-2">
                  <span>{post.view_count.toLocaleString()} views</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="my-12 rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-8xl">
                  {post.category?.name?.includes('Study') && '📚'}
                  {post.category?.name?.includes('Tool') && '🛠️'}
                  {post.category?.name?.includes('Subject') && '📖'}
                  {post.category?.name?.includes('Exam') && '✅'}
                  {post.category?.name?.includes('Productivity') && '⚡'}
                  {post.category?.name?.includes('AI') && '🤖'}
                </div>
              </div>
            )}
            </div>

            {/* Two Column Layout: Content + TOC */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
              {/* Main Content Column */}
              <div className="lg:col-span-8">
                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert prose-purple max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ node, ...props }) => (
                    <h2 className="text-3xl font-black mt-12 mb-6 text-gray-900" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-lg text-gray-700 leading-relaxed mb-6" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-purple-600 hover:text-purple-700 font-semibold underline" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-outside ml-6 mb-6 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-outside ml-6 mb-6 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-lg text-gray-700 pl-2" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-purple-600 pl-6 py-2 my-6 italic text-gray-700 bg-purple-50 rounded-r-lg" {...props} />
                  ),
                  code: ({ node, inline, ...props }: any) =>
                    inline ? (
                      <code className="bg-gray-100 text-purple-600 px-2 py-1 rounded text-base font-mono" {...props} />
                    ) : (
                      <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props} />
                    ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-gray-900">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/blog/tag/${tag.slug}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author?.bio && (
              <div className="mt-12 p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900">About the Author</h3>
                <div className="flex items-start gap-4">
                  {post.author.avatar_url && (
                    <div className="w-16 h-16 rounded-full bg-purple-200 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-2">{post.author.name}</p>
                    <p className="text-gray-700 leading-relaxed">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}

                {/* Share Buttons */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <ShareButtons
                    title={post.title}
                    url={`https://inspir.uk/blog/${post.slug}`}
                  />
                </div>
              </div>

              {/* TOC Sidebar Column */}
              <aside className="lg:col-span-4 hidden lg:block">
                <TableOfContents content={post.content} />
              </aside>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-black text-white mb-4">
              Apply What You've Learned
            </h2>
            <p className="text-lg text-purple-100 mb-8">
              Put these study strategies into action with inspir's AI-powered tools
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-purple-100 mt-4">
              14-day free trial • All 15 tools • No credit card required
            </p>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <RelatedPosts posts={relatedPosts} />
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-inspir-purple font-semibold hover:text-inspir-blue transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to all articles
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
