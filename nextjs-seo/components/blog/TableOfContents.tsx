'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Parse headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const items: TOCItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      items.push({ id, text, level })
    }

    setHeadings(items)

    // Observe heading intersections for active state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    // Wait for headings to render
    setTimeout(() => {
      items.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) observer.observe(element)
      })
    }, 100)

    return () => observer.disconnect()
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav className="bg-gradient-to-br from-inspir-purple/10 to-inspir-blue/10 rounded-xl p-6 border-2 border-inspir-purple/20 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-inspir-purple" />
        <h2 className="text-lg font-bold text-gray-900">Table of Contents</h2>
      </div>

      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${
                activeId === heading.id
                  ? 'bg-inspir-purple text-white font-semibold'
                  : 'text-gray-700 hover:bg-white hover:text-inspir-purple'
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-4 border-t border-inspir-purple/20">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm text-inspir-purple hover:text-inspir-blue font-semibold flex items-center gap-1"
        >
          ↑ Back to top
        </button>
      </div>
    </nav>
  )
}
