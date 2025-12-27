import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import BlogCard from '@/components/BlogCard'
import PageHeader from '@/partials/PageHeader'
import SeoMeta from '@/partials/SeoMeta'

export const revalidate = 3600
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = createServerClient()

  const { data: tag } = await supabase
    .from('seo_blog_tags')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!tag) {
    return { title: 'Tag Not Found' }
  }

  return {
    title: `${tag.name} Articles - inspir Blog`,
    description: `Browse all articles tagged with "${tag.name}" on inspir`,
  }
}

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: tags } = await supabase
    .from('seo_blog_tags')
    .select('slug')

  return tags?.map((tag) => ({ slug: tag.slug })) || []
}

export default async function TagPage(props: Props) {
  const params = await props.params
  const supabase = createServerClient()

  // Get tag
  const { data: tag } = await supabase
    .from('seo_blog_tags')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!tag) {
    notFound()
  }

  // Get posts with this tag (via junction table)
  const { data: taggedPosts } = await supabase
    .from('seo_blog_post_tags')
    .select(`
      post:seo_blog_posts(
        *,
        author:seo_authors(name, avatar_url),
        category:seo_blog_categories(name, slug, color)
      )
    `)
    .eq('tag_id', tag.id)

  // Extract posts from the junction table results
  const posts = taggedPosts
    ?.map((item: any) => item.post)
    .filter((post: any) => post && post.status === 'published')
    .sort((a: any, b: any) => {
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    }) || []

  return (
    <>
      <SeoMeta
        title={`${tag.name} Articles`}
        meta_title={`${tag.name} Articles - inspir Blog`}
        description={`Browse all articles tagged with "${tag.name}"`}
        canonical={`https://inspir.uk/blog/tag/${params.slug}`}
      />
      <PageHeader title={`Tag: ${tag.name}`} />
      <section className="section">
        <div className="container">
          <div className="mb-8 text-center">
            <p className="text-lg">
              Showing all articles tagged with <strong>"{tag.name}"</strong>
            </p>
          </div>
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
              <p className="text-lg">No posts found with this tag.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
