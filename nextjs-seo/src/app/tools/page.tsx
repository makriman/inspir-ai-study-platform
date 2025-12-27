import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import PageHeader from '@/partials/PageHeader'
import SeoMeta from '@/partials/SeoMeta'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Study Tools - inspir AI Platform',
  description: '15 revolutionary AI-powered study tools to enhance your learning experience.',
}

export const revalidate = 3600

export default async function ToolsPage() {
  const supabase = createServerClient()

  const { data: tools, error } = await supabase
    .from('seo_tool_pages')
    .select('*')
    .order('title')

  if (error) {
    console.error('Error fetching tools:', error)
  }

  return (
    <>
      <SeoMeta
        title="Study Tools"
        meta_title="Study Tools - inspir AI Platform"
        description="15 revolutionary AI-powered study tools to enhance your learning experience."
        canonical="https://inspir.uk/tools"
      />
      <PageHeader title="Study Tools" />
      <section className="section">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-lg">
              Discover 15 revolutionary AI-powered study tools designed to enhance your learning experience
            </p>
          </div>

          {tools && tools.length > 0 ? (
            <div className="row gy-4">
              {tools.map((tool: any) => (
                <div key={tool.id} className="md:col-6 lg:col-4">
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg">No tools found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <div className="h-full rounded-lg border-2 border-border p-6 transition-all hover:border-primary hover:shadow-lg dark:border-darkmode-border dark:hover:border-darkmode-primary">
      <h3 className="h4 mb-3">
        <Link href={`/tools/${tool.slug}`} className="hover:text-primary">
          {tool.title}
        </Link>
      </h3>
      <p className="mb-4">{tool.description}</p>
      <Link
        href={`/tools/${tool.slug}`}
        className="inline-flex items-center font-medium text-primary hover:underline"
      >
        Learn more
        <FaArrowRight className="ml-2" />
      </Link>
    </div>
  )
}
