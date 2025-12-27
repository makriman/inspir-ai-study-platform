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

  const { data: category } = await supabase
    .from('seo_blog_categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.name} - inspir Blog`,
    description: category.description || `Browse all ${category.name} articles on inspir`,
  }
}

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: categories } = await supabase
    .from('seo_blog_categories')
    .select('slug')

  return categories?.map((cat) => ({ slug: cat.slug })) || []
}

export default async function CategoryPage(props: Props) {
  const params = await props.params
  const supabase = createServerClient()

  const { data: category } = await supabase
    .from('seo_blog_categories')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!category) {
    notFound()
  }

  const { data: posts } = await supabase
    .from('seo_blog_posts')
    .select(`
      *,
      author:seo_authors(name, avatar_url),
      category:seo_blog_categories(name, slug, color)
    `)
    .eq('category_id', category.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (
    <>
      <SeoMeta
        title={category.name}
        meta_title={`${category.name} - inspir Blog`}
        description={category.description || `Browse all ${category.name} articles`}
        canonical={`https://inspir.uk/blog/category/${params.slug}`}
      />
      <PageHeader title={category.name} />
      <section className="section">
        <div className="container">
          {category.description && (
            <div className="mb-12 text-center">
              <p className="text-lg">{category.description}</p>
            </div>
          )}
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
              <p className="text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
