import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const outputDir = path.join(ROOT, "data", "canon");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function summaryFor(entry) {
  return `${entry.title} is a structured canon entry in the Goldstonian Concordance Bible study platform, aligned to the ${entry.testament} and organized within the ${entry.canon_group} grouping.`;
}

function themesFor(entry) {
  const themes = [
    entry.canon_group.toLowerCase(),
    entry.testament.toLowerCase(),
    entry.title.toLowerCase()
  ];

  if (entry.canon_group === "Torah") {
    themes.push("covenant", "law", "foundation");
  } else if (entry.canon_group === "History") {
    themes.push("history", "kingdom", "providence");
  } else if (entry.canon_group === "Wisdom") {
    themes.push("wisdom", "discernment", "worship");
  } else if (entry.canon_group === "Prophets" || entry.canon_group === "Minor Prophets") {
    themes.push("prophecy", "judgment", "restoration");
  } else if (entry.canon_group === "Gospels") {
    themes.push("jesus", "gospel", "kingdom");
  } else if (entry.canon_group === "Epistles") {
    themes.push("church", "doctrine", "faithfulness");
  } else if (entry.canon_group === "Apocalyptic") {
    themes.push("apocalypse", "judgment", "victory");
  } else {
    themes.push("tradition", "witness", "canon");
  }

  return [...new Set(themes)];
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
    const record = {
      id: `book-${entry.slug}`,
      slug: entry.slug,
      title: entry.title,
      aliases: [],
      canon_group: entry.canon_group,
      testament: entry.testament,
      order: entry.order,
      summary: entry.summary ?? summaryFor(entry),
      themes: entry.themes ?? themesFor(entry),
      playlist_ids: [`playlist-${entry.slug}-gcb`],
      video_ids: [],
      doctrine_links: ["mirror-water-fire"],
      reading_plan_ids: []
    };

    fs.writeFileSync(
      path.join(outputDir, `${entry.slug}.json`),
      JSON.stringify(record, null, 2) + "\n",
      "utf8"
    );

    count += 1;
  }

  console.log(`Generated ${count} canon data files.`);
}

main();