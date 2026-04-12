import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "canon", "canon-manifest.json");
const outputDir = path.join(ROOT, "data", "reading-plans");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildPlan(entry) {
  return {
    id: `reading-plan-${entry.slug}`,
    slug: entry.slug,
    title: `Reading ${entry.title}`,
    purpose: `A structured reading pathway through ${entry.title} within the Goldstonian Concordance Bible study platform.`,
    sequence: [`book-${entry.slug}`],
    intended_use: [
      "personal study",
      "course preparation",
      "canon familiarity"
    ]
  };
}

function main() {
  ensureDir(outputDir);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  let count = 0;

  for (const entry of manifest) {
    const plan = buildPlan(entry);

    fs.writeFileSync(
      path.join(outputDir, `${entry.slug}.json`),
      JSON.stringify(plan, null, 2) + "\n"
    );

    count++;
  }

  console.log(`Generated ${count} reading plans.`);
}

main();