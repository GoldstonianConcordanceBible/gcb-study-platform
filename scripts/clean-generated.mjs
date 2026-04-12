import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const targets = [
  {
    dir: "data/canon",
    keep: new Set(["canon-manifest.json"])
  },
  {
    dir: "content/canon",
    keep: new Set()
  },
  {
    dir: "data/bible-text",
    keep: new Set(["bible-manifest.json"])
  },
  {
    dir: "data/playlists",
    keep: new Set(["playlist-manifest.json"])
  },
  {
    dir: "data/courses",
    keep: new Set(["course-manifest.json"])
  },
  {
    dir: "content/courses",
    keep: new Set()
  },
  {
    dir: "data/reading-plans",
    keep: new Set(["reading-plan-manifest.json"])
  },
  {
    dir: "content/reading-plans",
    keep: new Set()
  },
  {
    dir: "data/reflection-questions",
    keep: new Set(["reflection-manifest.json"])
  },
  {
    dir: "content/reflection-questions",
    keep: new Set()
  },
  {
    dir: "data/articles",
    keep: new Set(["article-manifest.json"])
  },
  {
    dir: "content/essays",
    keep: new Set()
  },
  {
    dir: "data/podcasts",
    keep: new Set(["podcast-manifest.json"])
  },
  {
    dir: "content/podcasts",
    keep: new Set()
  }
];

function removeFile(filePath) {
  fs.unlinkSync(filePath);
}

let removed = 0;

for (const target of targets) {
  const fullDir = path.join(ROOT, target.dir);

  if (!fs.existsSync(fullDir)) continue;

  const entries = fs.readdirSync(fullDir);

  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isFile() && !target.keep.has(entry)) {
      removeFile(fullPath);
      removed += 1;
    }
  }
}

const searchIndex = path.join(ROOT, "public", "search-index.json");
if (fs.existsSync(searchIndex)) {
  fs.unlinkSync(searchIndex);
  removed += 1;
}

console.log(`Cleaned generated files. Removed: ${removed}`);