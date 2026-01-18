#!/usr/bin/env node
/**
 * Generate Terraform URL rewrites for all static pages.
 * Automatically updates loadbalancer.tf with the new rewrites.
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

function main() {
  const terraformFile = join(
    rootDir,
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
    execSync('npm run build', { cwd: rootDir, stdio: 'pipe' })
  } catch (error) {
    console.error('Error running npm build:', error)
    process.exit(1)
  }

  console.log('Generating URL rewrites...')

  // Generate the rewrite list for returnsignals-www pages
  const rewrites: string[] = [
    '          { path = "/privacy", rewrite = "/privacy.html" },',
    '          { path = "/terms", rewrite = "/terms.html" },',
  ]

  // Read the terraform file
  let content = readFileSync(terraformFile, 'utf-8')

  // Build the rewrite list section (what goes between [ and ])
  const rewriteSection = rewrites.join('\n')

  // Find and replace the path_matcher blocks with path_rules
  const prodPattern = /(  path_matcher \{\n    name\s+=\s+"returnsignals-www"\n    default_service = google_compute_backend_bucket\.returnsignals_www\.id)\n((?:.*?\n)*?)(  \})/m
  const testPattern = /(  path_matcher \{\n    name\s+=\s+"returnsignals-test-www"\n    default_service = google_compute_backend_bucket\.returnsignals_www_test\.id)\n((?:.*?\n)*?)(  \})/m

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
    content = content.replace(testPattern, `$1${testPathRuleBlock}`)
    console.log('✓ Added path_rule block to returnsignals-test-www')
  }

  // Write back
  writeFileSync(terraformFile, content, 'utf-8')

  console.log()
  console.log('✓ Generated rewrites for:')
  console.log(`  - privacy page`)
  console.log(`  - terms page`)
  console.log()
  console.log(`✓ Updated ${terraformFile}`)
  console.log()
  console.log("Run 'cd materialmodel-terraform && terraform apply' to deploy changes")
}

main()
