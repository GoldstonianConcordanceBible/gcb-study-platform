import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "releases", "release-manifest.json");
const outputDir = path.join(ROOT, "data", "releases", "generated");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildZenodoRecord(entry) {
  return {
    title: entry.title,
    description: entry.description,
    upload_type: "dataset",
    keywords: [
      "Goldstonian Concordance Bible",
      "GCB",
      "81-Book Ethiopian Canon",
      "dataset"
    ],
    access_right: "open",
    version: entry.version
  };
}

function buildFigshareRecord(entry) {
  return {
    title: entry.title,
    description: entry.description,
    defined_type: "dataset",
    tags: [
      "GCB",
      "theology",
      "canon",
      "dataset"
    ],
    version: entry.version
  };
}

function buildDataverseRecord(entry) {
  return {
    title: entry.title,
    description: entry.description,
    subject: ["Humanities and Social Sciences", "Religion"],
    version: entry.version
  };
}

function main() {
  ensureDir(outputDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing release manifest: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  let count = 0;

  for (const entry of manifest) {
    fs.writeFileSync(
      path.join(outputDir, `${entry.id}.zenodo.json`),
      JSON.stringify(buildZenodoRecord(entry), null, 2) + "\n"
    );

    fs.writeFileSync(
      path.join(outputDir, `${entry.id}.figshare.json`),
      JSON.stringify(buildFigshareRecord(entry), null, 2) + "\n"
    );

    fs.writeFileSync(
      path.join(outputDir, `${entry.id}.dataverse.json`),
      JSON.stringify(buildDataverseRecord(entry), null, 2) + "\n"
    );

    count += 1;
  }

  console.log(`Generated release metadata for ${count} releases.`);
}

main();