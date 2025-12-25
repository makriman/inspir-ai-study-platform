import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/blog/', '/tools/', '/about', '/pricing'],
        disallow: ['/api/', '/chat/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0.5,
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot'],
        crawlDelay: 5,
      },
      {
        userAgent: ['MJ12bot', 'BLEXBot', 'DataForSeoBot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://inspir.uk/sitemap.xml',
  }
}
