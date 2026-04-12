import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "reflection-questions");

if (!fs.existsSync(dir)) {
  console.log("No reflection questions directory found.");
  process.exit(0);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json") && !f.endsWith("manifest.json"));

for (const file of files) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));

  if (!Array.isArray(raw)) {
    throw new Error(`${file} must contain an array`);
  }

  for (const item of raw) {
    for (const key of ["id", "question", "context_type", "context_id"]) {
      if (!item[key]) throw new Error(`${file} reflection item missing ${key}`);
    }
  }
}

console.log(`Validated ${files.length} reflection question files.`);