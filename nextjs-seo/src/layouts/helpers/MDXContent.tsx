import { marked } from 'marked'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// Configure marked with GFM (GitHub Flavored Markdown) support
marked.setOptions({
  gfm: true,
  breaks: true,
})

// Custom renderer for code blocks with syntax highlighting
const renderer = new marked.Renderer()

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  // If language is specified, wrap in pre/code with language class for Prism.js
  if (lang) {
    return `<pre><code class="language-${lang}">${marked.parseInline(
      text
    )}</code></pre>`
  }

  // No language specified, return plain code block
  return `<pre><code>${marked.parseInline(text)}</code></pre>`
}

// Auto-generate IDs for headings (for table of contents linking)
renderer.heading = function ({ tokens, depth }: { tokens: any[]; depth: number }) {
  const text = tokens.map((t) => t.text || t.raw).join('')
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return `<h${depth} id="${id}">${text}</h${depth}>`
}

const MDXContent = async ({ content }: { content: any }) => {
  // Use marked with custom renderer
  const htmlContent = await marked(content || '', { renderer })

  return (
    <div
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

export default MDXContent
