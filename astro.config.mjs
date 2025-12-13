import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

// See https://docs.astro.build
export default defineConfig({
  site: 'https://www.returnsignals.com',
  integrations: [
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
        if (item.url === 'https://www.returnsignals.com/') {
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
