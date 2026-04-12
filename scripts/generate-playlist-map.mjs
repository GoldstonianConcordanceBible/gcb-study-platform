import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const outputDir = path.join(ROOT, "data", "playlists");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function playlistRecord(entry) {
  return {
    id: `playlist-${entry.slug}-gcb`,
    slug: entry.slug,
    title: `${entry.title} Explained | GCB`,
    platform: "YouTube",
    url: "",
    description: `A structured ${entry.title} study playlist within the Goldstonian Concordance Bible ecosystem.`,
    book_links: [`book-${entry.slug}`],
    doctrine_links: ["mirror-water-fire"],
    video_ids: []
  };
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
      path.join(outputDir, `${entry.slug}.json`),
      JSON.stringify(playlistRecord(entry), null, 2) + "\n",
      "utf8"
    );
    count += 1;
  }

  console.log(`Generated ${count} playlist map files.`);
}

main();