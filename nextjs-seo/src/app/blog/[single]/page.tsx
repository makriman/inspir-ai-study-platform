import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import ImageFallback from '@/helpers/ImageFallback'
import MDXContent from '@/helpers/MDXContent'
import dateFormat from '@/lib/utils/dateFormat'
import SeoMeta from '@/partials/SeoMeta'
import Link from 'next/link'
import Share from '@/components/Share'
import { FaRegClock, FaRegFolder, FaRegUserCircle } from 'react-icons/fa'
import StructuredData from '@/components/StructuredData'
import TableOfContents from '@/components/TableOfContents'
import RelatedPosts from '@/components/RelatedPosts'
import {
  generateBreadcrumbSchema,
  generateBlogPostSchema,
} from '@/lib/structured-data'

export const revalidate = 3600
export const dynamicParams = true

type Props = {
  params: Promise<{ single: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { single: slug } = await params
  const supabase = createServerClient()

  const { data: post } = await supabase
    .from('seo_blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: posts } = await supabase
    .from('seo_blog_posts')
    .select('slug')
    .eq('status', 'published')

  return posts?.map((post) => ({ single: post.slug })) || []
}

const PostSingle = async (props: Props) => {
  const params = await props.params
  const supabase = createServerClient()

  const { data: post } = await supabase
    .from('seo_blog_posts')
    .select(`
      *,
      author:seo_authors(name, avatar_url),
      category:seo_blog_categories(name, slug, color)
    `)
    .eq('slug', params.single)
    .eq('status', 'published')
    .single()

  if (!post) {
    notFound()
  }

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://inspir.uk' },
    { name: 'Blog', url: 'https://inspir.uk/blog' },
    ...(post.category
      ? [
          {
            name: post.category.name,
            url: `https://inspir.uk/blog/category/${post.category.slug}`,
          },
        ]
      : []),
    { name: post.title, url: `https://inspir.uk/blog/${params.single}` },
  ])

  const blogPostSchema = generateBlogPostSchema(post)

  return (
    <>
      <StructuredData data={[breadcrumbSchema, blogPostSchema]} />

      <SeoMeta
        title={post.title}
        meta_title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        image={post.featured_image}
        canonical={`https://inspir.uk/blog/${params.single}`}
      />
      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-8">
              {post.featured_image && (
                <div className="mb-10">
                  <ImageFallback
                    src={post.featured_image}
                    height={500}
                    width={1200}
                    alt={post.title}
                    className="w-full rounded"
                  />
                </div>
              )}
              <h1 className="h2 mb-4">{post.title}</h1>
              <ul className="mb-8">
                {post.author && (
                  <li className="mr-4 inline-block">
                    <FaRegUserCircle className="-mt-1 mr-2 inline-block" />
                    {post.author.name}
                  </li>
                )}
                {post.category && (
                  <li className="mr-4 inline-block">
                    <FaRegFolder className="-mt-1 mr-2 inline-block" />
                    <Link href={`/blog/category/${post.category.slug}`}>
                      {post.category.name}
                    </Link>
                  </li>
                )}
                {post.published_at && (
                  <li className="mr-4 inline-block">
                    <FaRegClock className="-mt-1 mr-2 inline-block" />
                    {dateFormat(post.published_at)}
                  </li>
                )}
              </ul>
              {post.excerpt && (
                <div className="mb-8 text-xl opacity-80">
                  {post.excerpt}
                </div>
              )}

              {/* Table of Contents */}
              <div className="mb-10">
                <TableOfContents content={post.content} />
              </div>

              <div className="content mb-10">
                <MDXContent content={post.content} />
              </div>
              <div className="flex items-center justify-end">
                <h5 className="mr-3">Share :</h5>
                <Share
                  className="social-icons"
                  title={post.title}
                  description={post.excerpt || ''}
                  slug={params.single}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <RelatedPosts
        currentPostId={post.id}
        categoryId={post.category_id}
        limit={3}
      />
    </>
  )
}

export default PostSingle
