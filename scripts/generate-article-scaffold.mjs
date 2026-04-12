import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const outputDir = path.join(ROOT, "data", "articles");
const contentDir = path.join(ROOT, "content", "essays");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function articleData(entry) {
  return {
    id: `article-${entry.slug}`,
    slug: entry.slug,
    title: `${entry.title} in the Goldstonian Concordance Bible`,
    summary: `An article exploring ${entry.title} within the GCB canon framework.`,
    author: "Justin Goldston",
    published_date: new Date().toISOString().slice(0,10),
    book_links: [`book-${entry.slug}`],
    doctrine_links: ["mirror-water-fire"],
    tags: [entry.title, "GCB", "canon"]
  };
}

function articleMarkdown(entry) {
  return `# ${entry.title} in the Goldstonian Concordance Bible

## Overview

This article introduces ${entry.title} as part of the structured canon exploration within the Goldstonian Concordance Bible ecosystem.

## Canon Role

${entry.title} contributes to the biblical narrative through its placement in the ${entry.canon_group} tradition.

## Doctrinal Frame

Within the GCB system, ${entry.title} can be studied through the Mirror → Water → Fire interpretive structure.

## Future Expansion

This article scaffold will expand as canonical study continues.
`;
}

function main() {
  ensureDir(outputDir);
  ensureDir(contentDir);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  let count = 0;

  for (const entry of manifest) {
    const data = articleData(entry);

    fs.writeFileSync(
      path.join(outputDir, `${entry.slug}.json`),
      JSON.stringify(data, null, 2)
    );

    fs.writeFileSync(
      path.join(contentDir, `${entry.slug}.md`),
      articleMarkdown(entry)
    );

    count++;
  }

  console.log(`Generated ${count} article scaffolds.`);
}

main();