import type { MetadataRoute } from 'next'

const BASE_URL = 'https://ronakramnani.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/pieces/human-error/script-displays',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
