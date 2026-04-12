import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "languages");

if (!fs.existsSync(dir)) {
  console.log("No language directory found.");
  process.exit(0);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json") && !f.endsWith("manifest.json"));

for (const file of files) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));

  for (const key of ["code", "name", "available_books"]) {
    if (!(key in raw)) throw new Error(`${file} missing ${key}`);
  }

  if (!Array.isArray(raw.available_books)) {
    throw new Error(`${file} invalid available_books`);
  }
}

console.log(`Validated ${files.length} language files.`);