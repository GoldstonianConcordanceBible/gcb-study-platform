import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const outputDir = path.join(ROOT, "content", "canon");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildMarkdown(entry) {
  return `# ${entry.title}

## Summary
${entry.summary ?? `${entry.title} is a structured canon entry within the Goldstonian Concordance Bible study platform.`}

## Canon Group
${entry.canon_group}

## Testament
${entry.testament}

## Order
${entry.order}

## GCB Framing
Within the Goldstonian Concordance Bible, ${entry.title} functions as a canon entry connected to scripture study, doctrine navigation, curriculum development, and future app retrieval across the 81-book ecosystem.

## Doctrine Links
- Mirror → Water → Fire Doctrine

## Playlist Links
- ${entry.title} Explained | GCB

## Course Use
- To be enriched
`;
}

function main() {
  ensureDir(outputDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing manifest: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("canon-manifest.json must be an array");
  }

  let count = 0;

  for (const entry of manifest) {
    fs.writeFileSync(
      path.join(outputDir, `${entry.slug}.md`),
      buildMarkdown(entry),
      "utf8"
    );
    count += 1;
  }

  console.log(`Generated ${count} canon markdown files.`);
}

main();