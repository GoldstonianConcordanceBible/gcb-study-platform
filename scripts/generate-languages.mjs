import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "languages", "language-manifest.json");
const outputDir = path.join(ROOT, "data", "languages");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  ensureDir(outputDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Language manifest not found: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("language-manifest.json must be an array");
  }

  let count = 0;

  for (const entry of manifest) {
    const required = ["code", "name", "available_books"];
    for (const key of required) {
      if (!(key in entry)) {
        throw new Error(`Language entry missing '${key}': ${JSON.stringify(entry)}`);
      }
    }

    const record = {
      code: entry.code,
      name: entry.name,
      script: entry.script ?? "",
      available_books: entry.available_books ?? [],
      ge_ez_tradition: entry.ge_ez_tradition ?? false
    };

    fs.writeFileSync(
      path.join(outputDir, `${entry.code}.json`),
      JSON.stringify(record, null, 2) + "\n",
      "utf8"
    );

    count += 1;
  }

  console.log(`Generated ${count} language files.`);
}

main();