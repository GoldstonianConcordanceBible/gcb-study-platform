import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const requiredDirs = [
  "data/canon",
  "data/bible-text",
  "data/playlists",
  "data/courses",
  "data/reading-plans",
  "data/reflection-questions",
  "data/articles",
  "data/podcasts",
  "content/canon",
  "content/courses",
  "content/essays",
  "public",
  "scripts"
];

let created = 0;

for (const dir of requiredDirs) {
  const fullPath = path.join(ROOT, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created missing directory: ${dir}`);
    created += 1;
  }
}

console.log(`Structure check complete. Directories created: ${created}`);