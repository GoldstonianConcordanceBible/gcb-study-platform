import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "reading-plans");

if (!fs.existsSync(dir)) {
  console.log("No reading plans directory found.");
  process.exit(0);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json") && !f.endsWith("manifest.json"));

for (const file of files) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));

  for (const key of ["id", "slug", "title", "purpose"]) {
    if (!raw[key]) throw new Error(`${file} missing ${key}`);
  }

  if (!Array.isArray(raw.sequence)) {
    throw new Error(`${file} missing sequence`);
  }
}

console.log(`Validated ${files.length} reading plan files.`);