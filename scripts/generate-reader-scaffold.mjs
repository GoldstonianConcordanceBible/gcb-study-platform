import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const outputDir = path.join(ROOT, "data", "bible-text");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function chapterTemplate(entry) {
  return {
    book_id: `book-${entry.slug}`,
    chapter: 1,
    translation_note: `Prototype scripture reader dataset for ${entry.title}.`,
    ge_ez_available: false,
    verses: [
      {
        verse: 1,
        text: `${entry.title} chapter 1 verse 1 placeholder text for the GCB reader scaffold.`
      },
      {
        verse: 2,
        text: `${entry.title} chapter 1 verse 2 placeholder text for the GCB reader scaffold.`
      },
      {
        verse: 3,
        text: `${entry.title} chapter 1 verse 3 placeholder text for the GCB reader scaffold.`
      }
    ]
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
      path.join(outputDir, `${entry.slug}-1.json`),
      JSON.stringify(chapterTemplate(entry), null, 2) + "\n",
      "utf8"
    );
    count += 1;
  }

  console.log(`Generated ${count} reader scaffold chapter files.`);
}

main();