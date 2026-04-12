import { execSync } from "child_process";

const steps = [
  {
    name: "Check repository structure",
    cmd: "node scripts/check-gcb-structure.mjs"
  },
  {
    name: "Generate canon data files",
    cmd: "node scripts/generate-canon-files.mjs"
  },
  {
    name: "Generate canon markdown",
    cmd: "node scripts/generate-canon-markdown.mjs"
  },
  {
    name: "Generate reader scaffold",
    cmd: "node scripts/generate-reader-scaffold.mjs"
  },
  {
    name: "Generate playlist map",
    cmd: "node scripts/generate-playlist-map.mjs"
  },
  {
    name: "Generate course scaffold",
    cmd: "node scripts/generate-course-scaffold.mjs"
  },
  {
    name: "Generate reading plans",
    cmd: "node scripts/generate-reading-plans.mjs"
  },
  {
    name: "Generate reflection questions",
    cmd: "node scripts/generate-reflection-questions.mjs"
  },
  {
    name: "Generate article scaffold",
    cmd: "node scripts/generate-article-scaffold.mjs"
  },
  {
    name: "Generate podcast scaffold",
    cmd: "node scripts/generate-podcast-scaffold.mjs"
  },
  {
    name: "Regenerate search index",
    cmd: "node scripts/regenerate-search-index.mjs"
  }
];

try {
  for (const step of steps) {
    console.log(`\n=== ${step.name} ===`);
    execSync(step.cmd, { stdio: "inherit" });
  }

  console.log("\nGCB build complete.");
} catch (error) {
  console.error("\nGCB build failed.");
  process.exit(1);
}