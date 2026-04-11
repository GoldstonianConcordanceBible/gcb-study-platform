import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "playlists", "playlist-manifest.json");
const outputDir = path.join(ROOT, "data", "playlists");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  ensureDir(outputDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Playlist manifest not found: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("playlist-manifest.json must be an array");
  }

  let count = 0;

  for (const entry of manifest) {
    const required = ["id", "slug", "title", "platform", "description", "book_links"];
    for (const key of required) {
      if (!(key in entry)) {
        throw new Error(`Playlist entry missing '${key}': ${JSON.stringify(entry)}`);
      }
    }

    const record = {
      id: entry.id,
      title: entry.title,
      platform: entry.platform,
      url: entry.url ?? "",
      description: entry.description,
      book_links: entry.book_links ?? [],
      doctrine_links: entry.doctrine_links ?? ["mirror-water-fire"],
      video_ids: entry.video_ids ?? []
    };

    const filePath = path.join(outputDir, `${entry.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(record, null, 2) + "\n", "utf8");
    count += 1;
  }

  console.log(`Generated ${count} playlist files.`);
}

main();