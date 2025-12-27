/**
 * RelatedPosts Component
 * Shows related blog posts based on category or tags
 */

import { createServerClient } from '@/lib/supabase'
import BlogCard from '@/components/BlogCard'

interface RelatedPostsProps {
  currentPostId: string
  categoryId?: string
  limit?: number
}

export default async function RelatedPosts({
  currentPostId,
  categoryId,
  limit = 3,
}: RelatedPostsProps) {
  const supabase = createServerClient()

  // Fetch related posts
  let query = supabase
    .from('seo_blog_posts')
    .select(`
      *,
      author:seo_authors(name, avatar_url),
      category:seo_blog_categories(name, slug, color)
    `)
    .eq('status', 'published')
    .neq('id', currentPostId)
    .limit(limit)

  // Prioritize posts from the same category if provided
  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  // Order by most recent
  query = query.order('published_at', { ascending: false })

  const { data: relatedPosts } = await query

  // If we don't have enough posts from the same category, get more from other categories
  if (relatedPosts && relatedPosts.length < limit && categoryId) {
    const remainingCount = limit - relatedPosts.length

    const { data: morePosts } = await supabase
      .from('seo_blog_posts')
      .select(`
        *,
        author:seo_authors(name, avatar_url),
        category:seo_blog_categories(name, slug, color)
      `)
      .eq('status', 'published')
      .neq('id', currentPostId)
      .neq('category_id', categoryId)
      .order('published_at', { ascending: false })
      .limit(remainingCount)

    if (morePosts) {
      relatedPosts.push(...morePosts)
    }
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="section pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-12 text-center">
            <h2 className="h3">Related Articles</h2>
            <p className="text-lg text-text/80 dark:text-darkmode-text/80">
              Continue learning with these related posts
            </p>
          </div>
          <div className="row gy-4">
            {relatedPosts.map((post: any) => (
              <div key={post.id} className="md:col-6 lg:col-4">
                <BlogCard data={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
