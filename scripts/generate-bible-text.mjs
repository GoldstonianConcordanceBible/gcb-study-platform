import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "bible-text", "bible-manifest.json");
const outputDir = path.join(ROOT, "data", "bible-text");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  ensureDir(outputDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Bible manifest not found: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("bible-manifest.json must be an array");
  }

  let count = 0;

  for (const book of manifest) {
    if (!book.slug || !book.book_id || !Array.isArray(book.chapters)) {
      throw new Error(`Invalid bible manifest entry: ${JSON.stringify(book)}`);
    }

    for (const chapterEntry of book.chapters) {
      if (typeof chapterEntry.chapter !== "number" || !Array.isArray(chapterEntry.verses)) {
        throw new Error(`Invalid chapter entry for ${book.slug}`);
      }

      const fileName = `${book.slug}-${chapterEntry.chapter}.json`;
      const record = {
        book_id: book.book_id,
        chapter: chapterEntry.chapter,
        translation_note: chapterEntry.translation_note ?? "",
        ge_ez_available: chapterEntry.ge_ez_available ?? false,
        verses: chapterEntry.verses
      };

      fs.writeFileSync(
        path.join(outputDir, fileName),
        JSON.stringify(record, null, 2) + "\n",
        "utf8"
      );

      count += 1;
    }
  }

  console.log(`Generated ${count} bible chapter files.`);
}

main();