import type { MetadataRoute } from 'next'
import { pieces, finds } from './pieces/pieces'

const BASE_URL = 'https://ronakramnani.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/pieces`, lastModified: new Date() },
    { url: `${BASE_URL}/finds`, lastModified: new Date() },
  ]

  const dynamicRoutes: MetadataRoute.Sitemap = [...pieces, ...finds]
    .filter((entry) => entry.href)
    .map((entry) => ({
      url: `${BASE_URL}${entry.href}`,
      lastModified: new Date(),
    }))

  return [...staticRoutes, ...dynamicRoutes]
}
