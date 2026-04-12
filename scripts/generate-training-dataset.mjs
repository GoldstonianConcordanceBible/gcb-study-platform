import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const canonManifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const outputDir = path.join(ROOT, "data", "training", "generated");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  ensureDir(outputDir);

  const manifest = JSON.parse(fs.readFileSync(canonManifestPath, "utf8"));

  const retrieval = [];
  const reasoning = [];

  for (const entry of manifest) {
    retrieval.push({
      input: `What canon group does ${entry.title} belong to?`,
      output: `${entry.title} belongs to the ${entry.canon_group} canon group.`,
      source_type: "canon",
      source_id: `book-${entry.slug}`
    });

    reasoning.push({
      input: `Why is ${entry.title} part of the GCB study platform?`,
      output: `${entry.title} is part of the GCB study platform because it is a structured canon entry within the ${entry.testament} and ${entry.canon_group} grouping.`,
      source_type: "canon",
      source_id: `book-${entry.slug}`
    });
  }

  fs.writeFileSync(
    path.join(outputDir, "canon-retrieval.generated.json"),
    JSON.stringify(retrieval, null, 2) + "\n"
  );

  fs.writeFileSync(
    path.join(outputDir, "scripture-reasoning.generated.json"),
    JSON.stringify(reasoning, null, 2) + "\n"
  );

  console.log(`Generated training records for ${manifest.length} canon entries.`);
}

main();