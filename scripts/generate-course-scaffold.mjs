import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const outputDir = path.join(ROOT, "data", "courses");
const contentDir = path.join(ROOT, "content", "courses");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function courseData(entry) {
  return {
    id: `course-foundations-of-${entry.slug}`,
    slug: `foundations-of-${entry.slug}`,
    title: `Foundations of ${entry.title}`,
    description: `A curriculum scaffold for studying ${entry.title} within the Goldstonian Concordance Bible ecosystem.`,
    book_links: [`book-${entry.slug}`],
    playlist_links: [`playlist-${entry.slug}-gcb`],
    doctrine_links: ["mirror-water-fire"],
    modules: [
      `${entry.title} Overview`,
      `${entry.title} Themes`,
      `${entry.title} Structure`,
      `${entry.title} GCB Framing`
    ]
  };
}

function courseMarkdown(entry) {
  return `# Foundations of ${entry.title}

## Course Description
A curriculum scaffold for studying ${entry.title} within the Goldstonian Concordance Bible ecosystem.

## Learning Goals
- understand the role of ${entry.title} in the canon
- identify major theological and literary themes
- connect ${entry.title} to the GCB doctrine layer
- prepare the book for curriculum and app use

## Modules
1. ${entry.title} Overview
2. ${entry.title} Themes
3. ${entry.title} Structure
4. ${entry.title} GCB Framing

## Linked Playlists
- playlist-${entry.slug}-gcb

## Linked Doctrine
- mirror-water-fire
`;
}

function main() {
  ensureDir(outputDir);
  ensureDir(contentDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing manifest: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("canon-manifest.json must be an array");
  }

  let count = 0;

  for (const entry of manifest) {
    const data = courseData(entry);

    fs.writeFileSync(
      path.join(outputDir, `${data.slug}.json`),
      JSON.stringify(data, null, 2) + "\n",
      "utf8"
    );

    fs.writeFileSync(
      path.join(contentDir, `${data.slug}.md`),
      courseMarkdown(entry),
      "utf8"
    );

    count += 1;
  }

  console.log(`Generated ${count} course data files.`);
  console.log(`Generated ${count} course markdown files.`);
}

main();