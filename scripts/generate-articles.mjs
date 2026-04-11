import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "articles", "article-manifest.json");
const dataDir = path.join(ROOT, "data", "articles");
const contentDir = path.join(ROOT, "content", "essays");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildMarkdown(entry) {
  const tags = (entry.tags ?? []).map((tag) => `- ${tag}`).join("\n") || "- GCB";
  const books = (entry.book_links ?? []).map((book) => `- ${book}`).join("\n") || "- To be mapped";
  const doctrine = (entry.doctrine_links ?? []).map((item) => `- ${item}`).join("\n") || "- mirror-water-fire";

  return `# ${entry.title}

## Summary
${entry.summary}

## Author
${entry.author}

## Published Date
${entry.published_date}

## Book Links
${books}

## Doctrine Links
${doctrine}

## Tags
${tags}

## GCB Framing
This article functions as a publication-style essay within the Goldstonian Concordance Bible study platform. It exists to support canon understanding, doctrine navigation, curriculum development, and search visibility.
`;
}

function main() {
  ensureDir(dataDir);
  ensureDir(contentDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Article manifest not found: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("article-manifest.json must be an array");
  }

  let count = 0;

  for (const entry of manifest) {
    const required = ["id", "slug", "title", "summary", "author", "published_date"];
    for (const key of required) {
      if (!(key in entry)) {
        throw new Error(`Article entry missing '${key}': ${JSON.stringify(entry)}`);
      }
    }

    const dataRecord = {
      id: entry.id,
      slug: entry.slug,
      title: entry.title,
      summary: entry.summary,
      author: entry.author,
      published_date: entry.published_date,
      book_links: entry.book_links ?? [],
      doctrine_links: entry.doctrine_links ?? ["mirror-water-fire"],
      substack_url: entry.substack_url ?? "",
      tags: entry.tags ?? []
    };

    fs.writeFileSync(
      path.join(dataDir, `${entry.slug}.json`),
      JSON.stringify(dataRecord, null, 2) + "\n",
      "utf8"
    );

    fs.writeFileSync(
      path.join(contentDir, `${entry.slug}.md`),
      buildMarkdown(entry),
      "utf8"
    );

    count += 1;
  }

  console.log(`Generated ${count} article JSON files.`);
  console.log(`Generated ${count} article markdown files.`);
}

main();