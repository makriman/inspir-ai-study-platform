import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  published_at: string
  avg_read_time_minutes: number
  category: {
    name: string
    slug: string
    color: string
  }
}

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <span className="text-4xl">📚</span>
        Related Articles
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 border-2 border-gray-200 dark:border-gray-700 hover:border-inspir-purple dark:hover:border-inspir-purple"
          >
            <span
              className="inline-block px-3 py-1 text-sm font-semibold rounded-full mb-3"
              style={{
                backgroundColor: `${post.category.color}20`,
                color: post.category.color,
              }}
            >
              {post.category.name}
            </span>

            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-inspir-purple transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.avg_read_time_minutes}m
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-inspir-purple group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
