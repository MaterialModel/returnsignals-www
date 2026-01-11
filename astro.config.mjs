import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'

// Site URL - can be overridden with SITE_URL env var for test deployments
const siteUrl = process.env.SITE_URL || 'https://www.returnsignals.com'

// See https://docs.astro.build
export default defineConfig({
  site: siteUrl,
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: true
    }),
    sitemap({
      // Exclude 404 page
      filter: (page) => !page.includes('404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === `${siteUrl}/`) {
          item.changefreq = 'weekly'
          item.priority = 1.0
        }
        return item
      }
    })
  ],
  build: {
    format: 'file' // Generate privacy.html instead of privacy/index.html
  },
  server: {
    port: 4321
  }
})
