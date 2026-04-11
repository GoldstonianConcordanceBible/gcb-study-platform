import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const dataDir = path.join(ROOT, "data", "canon");
const contentDir = path.join(ROOT, "content", "canon");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function titleToThemes(title, canonGroup, testament) {
  const base = [canonGroup.toLowerCase(), testament.toLowerCase()];
  const special = [];

  if (canonGroup === "Torah") {
    special.push("covenant", "law", "foundation");
  } else if (canonGroup === "Historical Books") {
    special.push("history", "providence", "kingdom");
  } else if (canonGroup === "Wisdom Books") {
    special.push("wisdom", "worship", "discernment");
  } else if (canonGroup === "Major Prophets" || canonGroup === "Minor Prophets") {
    special.push("prophecy", "judgment", "restoration");
  } else if (canonGroup === "Gospels") {
    special.push("jesus", "gospel", "kingdom");
  } else if (canonGroup === "Pauline Epistles") {
    special.push("church", "grace", "doctrine");
  } else if (canonGroup === "General Epistles") {
    special.push("faithfulness", "truth", "holiness");
  } else if (canonGroup === "Apocalypse") {
    special.push("apocalypse", "judgment", "victory");
  } else {
    special.push("tradition", "instruction", "church-order");
  }

  const normalizedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  return [...new Set([normalizedTitle, ...base, ...special])];
}

function buildJsonRecord(entry) {
  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    aliases: entry.aliases ?? [],
    canon_group: entry.canon_group,
    testament: entry.testament,
    order: entry.order,
    summary: entry.summary,
    themes: entry.themes ?? titleToThemes(entry.title, entry.canon_group, entry.testament),
    playlist_ids: entry.playlist_ids ?? [],
    video_ids: entry.video_ids ?? [],
    doctrine_links: entry.doctrine_links ?? ["mirror-water-fire"],
    reading_plan_ids: entry.reading_plan_ids ?? []
  };
}

function buildMarkdown(entry, jsonRecord) {
  const themesList = jsonRecord.themes.map((theme) => `- ${theme}`).join("\n");

  return `# ${entry.title}

## Summary
${entry.summary}

## Canon Group
${entry.canon_group}

## Testament
${entry.testament}

## Order
${entry.order}

## Major Themes
${themesList}

## GCB Framing
Within the Goldstonian Concordance Bible, ${entry.title} functions as a structured canon entry connected to the 81-Book Ethiopian Canon, the Mirror → Water → Fire Doctrine, and the broader curriculum, search, and app layers of the GCB ecosystem.

## Doctrine Links
- Mirror → Water → Fire Doctrine

## Playlist Links
- To be mapped

## Course Use
- To be mapped
`;
}

function main() {
  ensureDir(dataDir);
  ensureDir(contentDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Manifest not found: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("canon-manifest.json must be an array");
  }

  let dataCount = 0;
  let contentCount = 0;

  for (const entry of manifest) {
    const required = ["id", "slug", "title", "canon_group", "testament", "order", "summary"];

    for (const key of required) {
      if (!(key in entry)) {
        throw new Error(`Manifest entry missing required field '${key}' for ${JSON.stringify(entry)}`);
      }
    }

    const jsonRecord = buildJsonRecord(entry);

    const dataPath = path.join(dataDir, `${entry.slug}.json`);
    const contentPath = path.join(contentDir, `${entry.slug}.md`);

    fs.writeFileSync(dataPath, JSON.stringify(jsonRecord, null, 2) + "\n", "utf8");
    dataCount += 1;

    fs.writeFileSync(contentPath, buildMarkdown(entry, jsonRecord), "utf8");
    contentCount += 1;
  }

  console.log(`Generated ${dataCount} canon JSON files.`);
  console.log(`Generated ${contentCount} canon markdown files.`);
  console.log(`Total generated files: ${dataCount + contentCount}`);
}

main();