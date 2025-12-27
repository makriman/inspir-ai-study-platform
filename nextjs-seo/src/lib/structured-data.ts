/**
 * Structured Data (JSON-LD) Generators for SEO
 * Creates schema.org markup for rich results in Google Search
 */

import { BlogPost, Author, Category, ToolPage } from './supabase'

const SITE_URL = 'https://inspir.uk'
const SITE_NAME = 'inspir'
const SITE_LOGO = `${SITE_URL}/images/logo.png`

/**
 * Organization Schema (site-wide)
 * Shows brand info in search results
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'inspir',
    url: SITE_URL,
    logo: SITE_LOGO,
    description:
      'AI-powered study platform with 15 revolutionary tools for students. Learn smarter with flashcards, quiz generators, study timers, and personalized AI tutoring.',
    sameAs: [
      // Add social media links when available
      // 'https://twitter.com/inspirlearning',
      // 'https://www.facebook.com/inspirlearning',
      // 'https://www.linkedin.com/company/inspirlearning',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@inspir.uk',
      url: `${SITE_URL}/contact`,
    },
  }
}

/**
 * WebSite Schema with Search Action
 * Enables sitelinks search box in Google
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'AI-powered study platform helping students learn smarter with 15 revolutionary study tools.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * BreadcrumbList Schema
 * Shows breadcrumb navigation in search results
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * BlogPosting Schema
 * Rich results for blog posts with author, date, image
 */
export function generateBlogPostSchema(post: BlogPost & { author?: Author; category?: Category }) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.meta_description,
    image: post.featured_image || `${SITE_URL}/images/og-image.png`,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'inspir Team',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }

  // Add article section if category exists
  if (post.category) {
    schema.articleSection = post.category.name
  }

  // Keywords are not in the BlogPost interface, so we'll skip this for now
  // if (post.seo_keywords && post.seo_keywords.length > 0) {
  //   schema.keywords = post.seo_keywords.join(', ')
  // }

  // Reading time is not in the BlogPost interface, so we'll skip this for now
  // if (post.avg_read_time_minutes) {
  //   schema.timeRequired = `PT${post.avg_read_time_minutes}M`
  // }

  return schema
}

/**
 * SoftwareApplication Schema for Tool Pages
 * Shows ratings, pricing, and features in search results
 */
export function generateSoftwareApplicationSchema(tool: ToolPage) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}/tools/${tool.slug}`,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '14-day free trial, then from £4.99/month',
      url: `${SITE_URL}/pricing`,
    },
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  // Add aggregateRating if we have reviews in the future
  // schema.aggregateRating = {
  //   '@type': 'AggregateRating',
  //   ratingValue: '4.8',
  //   reviewCount: '127',
  // }

  // Features are stored differently in the ToolPage interface
  // if (tool.features && tool.features.length > 0) {
  //   schema.featureList = tool.features
  // }

  return schema
}

/**
 * FAQ Schema
 * Shows FAQ rich results with expandable Q&A in search
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * HowTo Schema
 * Step-by-step instructions with rich results
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }
}

/**
 * Product Schema (for Pricing Page)
 * Shows pricing and offers in search results
 */
export function generateProductSchema(
  name: string,
  description: string,
  price: string,
  currency: string = 'GBP'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/pricing`,
    },
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
  }
}

/**
 * ItemList Schema (for Tool Directory, Blog Index)
 * Shows structured lists in search results
 */
export function generateItemListSchema(
  name: string,
  description: string,
  items: Array<{ name: string; url: string; description?: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description && { description: item.description }),
    })),
  }
}

/**
 * Course Schema (for educational content)
 * Can be used for comprehensive study guides
 */
export function generateCourseSchema(
  name: string,
  description: string,
  provider: string = SITE_NAME
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: SITE_URL,
    },
    educationalLevel: 'Secondary Education',
    teaches: name,
  }
}

/**
 * Video Schema (for tool demos, tutorials)
 */
export function generateVideoSchema(
  name: string,
  description: string,
  videoUrl: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl: videoUrl,
    ...(duration && { duration }),
  }
}

/**
 * Review Schema (for testimonials, future use)
 */
export function generateReviewSchema(
  itemName: string,
  rating: number,
  reviewBody: string,
  authorName: string,
  datePublished: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: itemName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
    },
    reviewBody,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    datePublished,
  }
}

/**
 * Helper to safely serialize JSON-LD
 * Prevents XSS attacks in structured data
 */
export function serializeJsonLd(data: any): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}
