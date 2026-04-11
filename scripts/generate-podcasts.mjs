import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "podcasts", "podcast-manifest.json");
const dataDir = path.join(ROOT, "data", "podcasts");
const contentDir = path.join(ROOT, "content", "podcasts");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildMarkdown(entry) {
  const books = (entry.book_links ?? []).map((book) => `- ${book}`).join("\n") || "- To be mapped";
  const doctrine = (entry.doctrine_links ?? []).map((item) => `- ${item}`).join("\n") || "- mirror-water-fire";

  return `# ${entry.title}

## Description
${entry.description}

## Duration
${entry.duration_seconds} seconds

## Published Date
${entry.published_date}

## Book Links
${books}

## Doctrine Links
${doctrine}

## Transcript URL
${entry.transcript_url || "To be added"}

## GCB Framing
This podcast entry functions as the audio study layer of the Goldstonian Concordance Bible study platform and supports future app routing, transcript linking, and curriculum use.
`;
}

function main() {
  ensureDir(dataDir);
  ensureDir(contentDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Podcast manifest not found: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("podcast-manifest.json must be an array");
  }

  let count = 0;

  for (const entry of manifest) {
    const required = ["id", "slug", "title", "description", "book_links"];
    for (const key of required) {
      if (!(key in entry)) {
        throw new Error(`Podcast entry missing '${key}': ${JSON.stringify(entry)}`);
      }
    }

    const dataRecord = {
      id: entry.id,
      slug: entry.slug,
      title: entry.title,
      description: entry.description,
      audio_url: entry.audio_url ?? "",
      duration_seconds: entry.duration_seconds ?? 0,
      published_date: entry.published_date ?? "",
      book_links: entry.book_links ?? [],
      doctrine_links: entry.doctrine_links ?? ["mirror-water-fire"],
      transcript_url: entry.transcript_url ?? ""
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

  console.log(`Generated ${count} podcast JSON files.`);
  console.log(`Generated ${count} podcast markdown files.`);
}

main();