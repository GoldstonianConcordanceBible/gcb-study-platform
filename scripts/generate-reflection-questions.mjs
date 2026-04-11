import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "reflection-questions", "reflection-manifest.json");
const dataDir = path.join(ROOT, "data", "reflection-questions");
const contentDir = path.join(ROOT, "content", "reflection-questions");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildMarkdown(slug, questions) {
  const items = questions.map((q, index) => `${index + 1}. ${q.question}`).join("\n");

  const title = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return `# ${title} Reflection Questions

${items}
`;
}

function main() {
  ensureDir(dataDir);
  ensureDir(contentDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Reflection manifest not found: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("reflection-manifest.json must be an array");
  }

  let count = 0;

  for (const entry of manifest) {
    if (!entry.slug || !Array.isArray(entry.questions)) {
      throw new Error(`Invalid reflection entry: ${JSON.stringify(entry)}`);
    }

    fs.writeFileSync(
      path.join(dataDir, `${entry.slug}.json`),
      JSON.stringify(entry.questions, null, 2) + "\n",
      "utf8"
    );

    fs.writeFileSync(
      path.join(contentDir, `${entry.slug}.md`),
      buildMarkdown(entry.slug, entry.questions),
      "utf8"
    );

    count += 1;
  }

  console.log(`Generated ${count} reflection JSON files.`);
  console.log(`Generated ${count} reflection markdown files.`);
}

main();