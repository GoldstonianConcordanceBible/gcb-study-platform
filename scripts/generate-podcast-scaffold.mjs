import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const outputDir = path.join(ROOT, "data", "podcasts");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function podcastData(entry) {
  return {
    id: `podcast-${entry.slug}`,
    slug: entry.slug,
    title: `${entry.title} Explained | GCB Podcast`,
    description: `Audio exploration of ${entry.title} within the Goldstonian Concordance Bible ecosystem.`,
    audio_url: "",
    duration_seconds: 900,
    published_date: new Date().toISOString().slice(0,10),
    book_links: [`book-${entry.slug}`],
    doctrine_links: ["mirror-water-fire"],
    transcript_url: ""
  };
}

function main() {
  ensureDir(outputDir);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  let count = 0;

  for (const entry of manifest) {
    fs.writeFileSync(
      path.join(outputDir, `${entry.slug}.json`),
      JSON.stringify(podcastData(entry), null, 2)
    );

    count++;
  }

  console.log(`Generated ${count} podcast scaffolds.`);
}

main();