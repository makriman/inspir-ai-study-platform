'use client'

import { Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-gray-600">Share:</span>

      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-gray-100 hover:bg-[#1DA1F2] text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors group"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-gray-100 hover:bg-[#4267B2] text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors group"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-gray-100 hover:bg-[#0077B5] text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors group"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>

      <button
        onClick={copyToClipboard}
        className="w-10 h-10 bg-gray-100 hover:bg-inspir-purple text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-5 h-5" />
        ) : (
          <LinkIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  )
}
