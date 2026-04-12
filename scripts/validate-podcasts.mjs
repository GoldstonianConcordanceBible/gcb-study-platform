import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "podcasts");

if (!fs.existsSync(dir)) {
  console.log("No podcast directory found.");
  process.exit(0);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json") && !f.endsWith("manifest.json"));

for (const file of files) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));

  for (const key of ["id", "slug", "title", "description"]) {
    if (!raw[key]) throw new Error(`${file} missing ${key}`);
  }

  if (!Array.isArray(raw.book_links)) {
    throw new Error(`${file} missing book_links`);
  }
}

console.log(`Validated ${files.length} podcast files.`);