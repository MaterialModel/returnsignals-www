#!/usr/bin/env node
/**
 * Generate Terraform URL rewrites for all static pages.
 * Automatically updates loadbalancer.tf with the new rewrites.
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const wwwDir = join(__dirname, '..')
const repoRoot = join(__dirname, '..', '..', '..')
const distDir = join(wwwDir, 'dist')

// Files to exclude from rewrite generation
const EXCLUDED_FILES = ['index.html', '404.html']

/**
 * Recursively find all HTML files in a directory
 */
function findHtmlFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = []

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...findHtmlFiles(fullPath, baseDir))
    } else if (entry.endsWith('.html')) {
      const relativePath = relative(baseDir, fullPath)
      files.push(relativePath)
    }
  }

  return files
}

/**
 * Convert a file path to a URL path and rewrite target
 * e.g., "blog/post.html" -> { path: "/blog/post", rewrite: "/blog/post.html" }
 */
function fileToRewrite(file: string): { path: string; rewrite: string } | null {
  // Skip excluded files
  if (EXCLUDED_FILES.includes(file)) {
    return null
  }

  // Convert to URL path (remove .html extension)
  const urlPath = '/' + file.replace(/\.html$/, '')
  const rewritePath = '/' + file

  return { path: urlPath, rewrite: rewritePath }
}

function main() {
  const terraformFile = join(
    repoRoot,
    'materialmodel-terraform',
    'modules',
    'web',
    'loadbalancer.tf'
  )

  if (!existsSync(terraformFile)) {
    console.error(`Error: ${terraformFile} not found`)
    process.exit(1)
  }

  console.log('Building site to discover all pages...')
  try {
    execSync('pnpm run build', { cwd: wwwDir, stdio: 'inherit' })
  } catch (error) {
    console.error('Error running build:', error)
    process.exit(1)
  }

  if (!existsSync(distDir)) {
    console.error(`Error: dist directory not found at ${distDir}`)
    process.exit(1)
  }

  console.log('\nDiscovering pages from build output...')

  // Find all HTML files
  const htmlFiles = findHtmlFiles(distDir)
  const rewrites = htmlFiles
    .map(fileToRewrite)
    .filter((r): r is { path: string; rewrite: string } => r !== null)
    .sort((a, b) => a.path.localeCompare(b.path))

  console.log(`Found ${rewrites.length} pages requiring rewrites`)

  // Categorize for display
  const staticPages = rewrites.filter((r) => !r.path.startsWith('/blog/'))
  const blogPosts = rewrites.filter(
    (r) => r.path.startsWith('/blog/') && !r.path.startsWith('/blog/tag/')
  )
  const blogTags = rewrites.filter((r) => r.path.startsWith('/blog/tag/'))

  // Generate the rewrite list for terraform
  const rewriteLines = rewrites.map(
    (r) => `          { path = "${r.path}", rewrite = "${r.rewrite}" },`
  )

  // Add section comments for readability
  const formattedRewrites: string[] = []

  if (staticPages.length > 0) {
    formattedRewrites.push(
      ...staticPages.map((r) => `          { path = "${r.path}", rewrite = "${r.rewrite}" },`)
    )
  }

  if (blogPosts.length > 0) {
    formattedRewrites.push('          # Blog posts')
    formattedRewrites.push(
      ...blogPosts.map((r) => `          { path = "${r.path}", rewrite = "${r.rewrite}" },`)
    )
  }

  if (blogTags.length > 0) {
    formattedRewrites.push('          # Blog tag pages')
    formattedRewrites.push(
      ...blogTags.map((r) => `          { path = "${r.path}", rewrite = "${r.rewrite}" },`)
    )
  }

  const rewriteSection = formattedRewrites.join('\n')

  // Read the terraform file
  let content = readFileSync(terraformFile, 'utf-8')

  const pathRuleBlock = `
    # URL rewrites for returnsignals pages
    dynamic "path_rule" {
      for_each = [
${rewriteSection}
      ]
      content {
        paths   = [path_rule.value.path]
        service = google_compute_backend_bucket.returnsignals_www.id
        route_action {
          url_rewrite {
            path_prefix_rewrite = path_rule.value.rewrite
          }
        }
      }
    }
  }`

  const testPathRuleBlock = `
    # URL rewrites for returnsignals pages (test)
    dynamic "path_rule" {
      for_each = [
${rewriteSection}
      ]
      content {
        paths   = [path_rule.value.path]
        service = google_compute_backend_bucket.returnsignals_www_test.id
        route_action {
          url_rewrite {
            path_prefix_rewrite = path_rule.value.rewrite
          }
        }
      }
    }
  }`

  // Replace production path_matcher
  if (content.includes('# URL rewrites for returnsignals pages')) {
    // Update existing
    content = content.replace(
      /(  path_matcher \{\n    name\s+=\s+"returnsignals-www"\n    default_service = google_compute_backend_bucket\.returnsignals_www\.id)\n(?:.*?\n)*?(  \})/m,
      `$1${pathRuleBlock}`
    )
    console.log('✓ Updated path_rule block in returnsignals-www')
  } else {
    // Add new
    const prodPattern =
      /(  path_matcher \{\n    name\s+=\s+"returnsignals-www"\n    default_service = google_compute_backend_bucket\.returnsignals_www\.id)\n((?:.*?\n)*?)(  \})/m
    content = content.replace(prodPattern, `$1${pathRuleBlock}`)
    console.log('✓ Added path_rule block to returnsignals-www')
  }

  // Replace test path_matcher
  if (content.includes('# URL rewrites for returnsignals pages (test)')) {
    // Update existing
    content = content.replace(
      /(  path_matcher \{\n    name\s+=\s+"returnsignals-test-www"\n    default_service = google_compute_backend_bucket\.returnsignals_www_test\.id)\n(?:.*?\n)*?(  \})/m,
      `$1${testPathRuleBlock}`
    )
    console.log('✓ Updated path_rule block in returnsignals-test-www')
  } else {
    // Add new
    const testPattern =
      /(  path_matcher \{\n    name\s+=\s+"returnsignals-test-www"\n    default_service = google_compute_backend_bucket\.returnsignals_www_test\.id)\n((?:.*?\n)*?)(  \})/m
    content = content.replace(testPattern, `$1${testPathRuleBlock}`)
    console.log('✓ Added path_rule block to returnsignals-test-www')
  }

  // Write back
  writeFileSync(terraformFile, content, 'utf-8')

  console.log()
  console.log('✓ Generated rewrites for:')
  if (staticPages.length > 0) {
    console.log(`  Static pages (${staticPages.length}):`)
    staticPages.forEach((p) => console.log(`    - ${p.path}`))
  }
  if (blogPosts.length > 0) {
    console.log(`  Blog posts (${blogPosts.length}):`)
    blogPosts.forEach((p) => console.log(`    - ${p.path}`))
  }
  if (blogTags.length > 0) {
    console.log(`  Blog tags (${blogTags.length}):`)
    blogTags.forEach((p) => console.log(`    - ${p.path}`))
  }
  console.log()
  console.log(`✓ Updated ${terraformFile}`)
  console.log()
  console.log("Run 'cd materialmodel-terraform && terraform plan' to preview changes")
}

main()
