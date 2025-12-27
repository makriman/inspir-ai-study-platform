import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import BlogCard from '@/components/BlogCard'
import PageHeader from '@/partials/PageHeader'
import SeoMeta from '@/partials/SeoMeta'

export const metadata: Metadata = {
  title: 'Blog - inspir AI Study Platform',
  description: 'Discover tips, strategies, and insights for effective studying with AI-powered learning.',
}

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const supabase = createServerClient()

  // Fetch all published blog posts with author and category
  const { data: posts, error } = await supabase
    .from('seo_blog_posts')
    .select(`
      *,
      author:seo_authors(name, avatar_url),
      category:seo_blog_categories(name, slug, color)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
  }

  return (
    <>
      <SeoMeta
        title="Blog"
        meta_title="Blog - inspir AI Study Platform"
        description="Discover tips, strategies, and insights for effective studying with AI-powered learning."
        canonical="https://inspir.uk/blog"
      />
      <PageHeader title="Blog" />
      <section className="section">
        <div className="container">
          {posts && posts.length > 0 ? (
            <div className="row gy-4">
              {posts.map((post: any) => (
                <div key={post.id} className="mb-14 md:col-6 lg:col-4">
                  <BlogCard data={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
