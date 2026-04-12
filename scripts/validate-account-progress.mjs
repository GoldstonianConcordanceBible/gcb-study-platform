import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data", "account");

if (!fs.existsSync(dir)) {
  console.log("No account directory found.");
  process.exit(0);
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));

  if (!Array.isArray(raw)) {
    throw new Error(`${file} must contain an array`);
  }

  for (const item of raw) {
    for (const key of ["user_id", "content_type", "content_id", "status"]) {
      if (!item[key]) throw new Error(`${file} item missing ${key}`);
    }
  }
}

console.log(`Validated ${files.length} account progress files.`);