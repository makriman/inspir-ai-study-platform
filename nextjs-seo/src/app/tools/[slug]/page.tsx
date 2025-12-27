import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import SeoMeta from '@/partials/SeoMeta'
import Link from 'next/link'
import { FaCheck, FaRocket, FaLightbulb } from 'react-icons/fa'
import StructuredData from '@/components/StructuredData'
import {
  generateBreadcrumbSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/structured-data'

export const revalidate = 3600
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = createServerClient()

  const { data: tool } = await supabase
    .from('seo_tool_pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!tool) {
    return { title: 'Tool Not Found' }
  }

  return {
    title: tool.seo_title || tool.title,
    description: tool.seo_description || tool.description,
    keywords: tool.seo_keywords || [],
    openGraph: {
      title: tool.seo_title || tool.title,
      description: tool.seo_description || tool.description,
      images: tool.og_image_url ? [tool.og_image_url] : [],
    },
  }
}

export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: tools } = await supabase
    .from('seo_tool_pages')
    .select('slug')

  return tools?.map((tool) => ({ slug: tool.slug })) || []
}

export default async function ToolPage(props: Props) {
  const params = await props.params
  const supabase = createServerClient()

  const { data: tool } = await supabase
    .from('seo_tool_pages')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!tool) {
    notFound()
  }

  // Fetch related tools (random 3 tools excluding current)
  const { data: relatedTools } = await supabase
    .from('seo_tool_pages')
    .select('*')
    .neq('slug', params.slug)
    .limit(3)

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://inspir.uk' },
    { name: 'Tools', url: 'https://inspir.uk/tools' },
    { name: tool.title, url: `https://inspir.uk/tools/${params.slug}` },
  ])

  const softwareSchema = generateSoftwareApplicationSchema(tool)

  return (
    <>
      <StructuredData data={[breadcrumbSchema, softwareSchema]} />

      <SeoMeta
        title={tool.title}
        meta_title={tool.seo_title || tool.title}
        description={tool.seo_description || tool.description}
        image={tool.og_image_url || '/assets/og-image.png'}
        canonical={`https://inspir.uk/tools/${params.slug}`}
      />

      {/* Hero Section */}
      <section className="section pt-16 pb-0">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10 text-center">
              <h1 className="mb-6">{tool.title}</h1>
              <p className="mb-8 text-xl text-text/80 dark:text-darkmode-text/80">
                {tool.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/chat" className="btn btn-primary btn-lg">
                  Start Using {tool.title}
                </Link>
                <Link href="/pricing" className="btn btn-outline-primary btn-lg">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Long Description */}
      {tool.long_description && (
        <section className="section bg-light dark:bg-darkmode-light">
          <div className="container">
            <div className="row justify-center">
              <div className="lg:col-10">
                <div className="prose prose-lg max-w-none dark:prose-invert text-center">
                  <p className="text-xl">{tool.long_description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {tool.features && tool.features.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="row justify-center mb-12">
              <div className="lg:col-8 text-center">
                <h2 className="mb-4">Powerful Features</h2>
                <p className="text-lg text-text/80 dark:text-darkmode-text/80">
                  Everything you need to maximize your productivity
                </p>
              </div>
            </div>
            <div className="row justify-center">
              <div className="lg:col-10">
                <div className="grid gap-6 md:grid-cols-2">
                  {tool.features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-lg bg-light p-6 dark:bg-darkmode-light"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <FaCheck className="text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      {tool.how_it_works && (
        <section className="section bg-light dark:bg-darkmode-light">
          <div className="container">
            <div className="row justify-center">
              <div className="lg:col-8 text-center mb-12">
                <h2 className="mb-4">How It Works</h2>
                <p className="text-lg text-text/80 dark:text-darkmode-text/80">
                  Getting started is simple and intuitive
                </p>
              </div>
            </div>
            <div className="row justify-center">
              <div className="lg:col-10">
                <div className="rounded-lg bg-white p-8 shadow-md dark:bg-darkmode-body">
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p>{tool.how_it_works}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {tool.use_cases && tool.use_cases.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="row justify-center mb-12">
              <div className="lg:col-8 text-center">
                <h2 className="mb-4">Perfect For</h2>
                <p className="text-lg text-text/80 dark:text-darkmode-text/80">
                  Real-world applications and scenarios
                </p>
              </div>
            </div>
            <div className="row justify-center">
              <div className="lg:col-10">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {tool.use_cases.map((useCase: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-lg border-2 border-border p-6 dark:border-darkmode-border"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10">
                          <FaLightbulb className="text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{useCase}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary via-blue-600 to-purple-600">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10 text-center text-white">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <FaRocket className="text-3xl" />
              </div>
              <h2 className="mb-4 text-white">Ready to Get Started?</h2>
              <p className="mb-8 text-lg opacity-90">
                Start using {tool.title} today and transform how you study. Join thousands of students already experiencing better results.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/chat"
                  className="btn bg-white text-primary hover:bg-white/90"
                >
                  Try {tool.title} Free
                </Link>
                <Link
                  href="/tools"
                  className="btn border-2 border-white bg-transparent text-white hover:bg-white/10"
                >
                  Explore All Tools
                </Link>
              </div>
              <p className="mt-6 text-sm opacity-75">
                ✨ No credit card required • Get started in 30 seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="row justify-center mb-12">
              <div className="lg:col-8 text-center">
                <h2 className="mb-4">You Might Also Like</h2>
                <p className="text-lg text-text/80 dark:text-darkmode-text/80">
                  Explore more powerful study tools
                </p>
              </div>
            </div>
            <div className="row gy-4">
              {relatedTools.map((relatedTool: any) => (
                <div key={relatedTool.id} className="md:col-6 lg:col-4">
                  <Link
                    href={`/tools/${relatedTool.slug}`}
                    className="block h-full rounded-lg border-2 border-border p-6 transition-all hover:border-primary hover:shadow-lg dark:border-darkmode-border dark:hover:border-darkmode-primary"
                  >
                    <h3 className="h5 mb-3">{relatedTool.title}</h3>
                    <p className="mb-4 text-sm">{relatedTool.description}</p>
                    <span className="text-sm font-medium text-primary">
                      Learn more →
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
