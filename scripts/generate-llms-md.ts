/**
 * Generate LLM-friendly markdown files from MDX sources
 *
 * This script reads MDX files from src/pages/ and generates clean markdown
 * versions in public/ for the llms.txt standard.
 *
 * Usage: npx tsx scripts/generate-llms-md.ts
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, "..");

interface FrontMatter {
  title?: string;
  description?: string;
  lastUpdated?: string;
}

/**
 * Parse frontmatter from MDX content
 */
function parseFrontmatter(content: string): {
  frontmatter: FrontMatter;
  body: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterStr = match[1];
  const body = match[2];

  // Simple YAML parsing for our use case
  const frontmatter: FrontMatter = {};
  for (const line of frontmatterStr.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      frontmatter[key as keyof FrontMatter] = value;
    }
  }

  return { frontmatter, body };
}

/**
 * Clean up MDX-specific syntax for plain markdown
 */
function cleanMdxForMarkdown(content: string): string {
  // Remove any JSX/component imports
  content = content.replace(/^import\s+.*$/gm, "");

  // Remove any export statements
  content = content.replace(/^export\s+.*$/gm, "");

  // Convert MDX components to plain text if any (shouldn't be in legal pages)
  // Remove HTML-style class attributes in anchor tags
  content = content.replace(
    /<a\s+href="([^"]+)"\s+class="[^"]*">([^<]+)<\/a>/g,
    "[$2]($1)"
  );

  // Clean up any remaining HTML anchor tags
  content = content.replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, "[$2]($1)");

  // Remove excessive blank lines (more than 2 consecutive)
  content = content.replace(/\n{3,}/g, "\n\n");

  return content.trim();
}

/**
 * Generate markdown file from MDX source
 */
function generateMarkdownFromMdx(
  mdxPath: string,
  outputPath: string
): void {
  const content = readFileSync(mdxPath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(content);

  // Build the markdown content
  let markdown = "";

  // Add title as H1
  if (frontmatter.title) {
    markdown += `# ${frontmatter.title}\n\n`;
  }

  // Add description as blockquote (llms.txt standard)
  if (frontmatter.description) {
    markdown += `> ${frontmatter.description}\n\n`;
  }

  // Add last updated if present
  if (frontmatter.lastUpdated) {
    markdown += `Last Updated: ${frontmatter.lastUpdated}\n\n`;
  }

  // Add the cleaned body content
  markdown += cleanMdxForMarkdown(body);

  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, markdown);
  console.log(`Generated: ${outputPath}`);
}

// MDX files to convert
const MDX_FILES = [
  { source: "src/pages/privacy.mdx", output: "public/privacy.md" },
  { source: "src/pages/security.mdx", output: "public/security.md" },
  { source: "src/pages/terms.mdx", output: "public/terms.md" },
];

// Generate all markdown files
console.log("Generating LLM-friendly markdown files...\n");

for (const file of MDX_FILES) {
  const sourcePath = join(ROOT_DIR, file.source);
  const outputPath = join(ROOT_DIR, file.output);

  if (existsSync(sourcePath)) {
    generateMarkdownFromMdx(sourcePath, outputPath);
  } else {
    console.warn(`Warning: Source file not found: ${sourcePath}`);
  }
}

console.log("\nDone!");
