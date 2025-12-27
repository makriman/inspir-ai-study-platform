'use client'

/**
 * TableOfContents Component
 * Auto-generates a table of contents from markdown headings
 */

import { useEffect, useState } from 'react'
import { FaList } from 'react-icons/fa'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const items: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length // Number of # symbols
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      items.push({ id, text, level })
    }

    setTocItems(items)
  }, [content])

  useEffect(() => {
    // Track active heading based on scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    )

    // Observe all headings
    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [tocItems])

  if (tocItems.length === 0) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="rounded-lg border-2 border-border bg-light p-6 dark:border-darkmode-border dark:bg-darkmode-light">
      <div className="mb-4 flex items-center gap-2">
        <FaList className="text-primary" />
        <h3 className="h5 mb-0">Table of Contents</h3>
      </div>
      <ul className="space-y-2">
        {tocItems.map(({ id, text, level }) => (
          <li
            key={id}
            className={`${
              level === 3 ? 'ml-4' : ''
            } list-none`}
          >
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`block text-sm transition-colors hover:text-primary ${
                activeId === id
                  ? 'font-semibold text-primary'
                  : 'text-text/80 dark:text-darkmode-text/80'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
