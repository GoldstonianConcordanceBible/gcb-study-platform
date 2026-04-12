import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const dirs = [
  { dir: "data/canon", type: "book" },
  { dir: "data/articles", type: "article" },
  { dir: "data/podcasts", type: "podcast" },
  { dir: "data/courses", type: "course" },
  { dir: "data/reading-plans", type: "reading-plan" }
];

const index = [];

for (const entry of dirs) {
  const dirPath = path.join(ROOT, entry.dir);

  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const data = JSON.parse(
      fs.readFileSync(path.join(dirPath, file), "utf8")
    );

    index.push({
      type: entry.type,
      id: data.id,
      title: data.title,
      summary: data.summary || data.description || "",
      slug: data.slug
    });
  }
}

fs.writeFileSync(
  path.join(ROOT, "public", "search-index.json"),
  JSON.stringify(index, null, 2)
);

console.log(`Search index rebuilt with ${index.length} records.`);