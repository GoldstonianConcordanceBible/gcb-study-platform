import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const manifestPath = path.join(ROOT, "data", "courses", "course-manifest.json");
const contentDir = path.join(ROOT, "content", "courses");
const dataDir = path.join(ROOT, "data", "courses");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildMarkdown(entry) {
  const modules = (entry.modules ?? [])
    .map((module, index) => `${index + 1}. ${module}`)
    .join("\n");

  const playlists = (entry.playlist_links ?? []).map((id) => `- ${id}`).join("\n") || "- To be mapped";
  const doctrine = (entry.doctrine_links ?? []).map((id) => `- ${id}`).join("\n") || "- mirror-water-fire";

  return `# ${entry.title}

## Course Description
${entry.description}

## Learning Goals
- understand the theological role of ${entry.book_links?.[0] ?? "this canon entry"}
- identify major narrative or doctrinal movements
- connect the course to broader canon development
- relate course material to GCB doctrine structures

## Modules
${modules}

## Linked Playlists
${playlists}

## Linked Doctrine
${doctrine}
`;
}

function main() {
  ensureDir(contentDir);
  ensureDir(dataDir);

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Course manifest not found: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (!Array.isArray(manifest)) {
    throw new Error("course-manifest.json must be an array");
  }

  let count = 0;

  for (const entry of manifest) {
    const required = ["id", "slug", "title", "description"];
    for (const key of required) {
      if (!(key in entry)) {
        throw new Error(`Course entry missing '${key}': ${JSON.stringify(entry)}`);
      }
    }

    const dataRecord = {
      id: entry.id,
      slug: entry.slug,
      title: entry.title,
      description: entry.description,
      book_links: entry.book_links ?? [],
      playlist_links: entry.playlist_links ?? [],
      doctrine_links: entry.doctrine_links ?? ["mirror-water-fire"],
      modules: entry.modules ?? []
    };

    fs.writeFileSync(
      path.join(dataDir, `${entry.slug}.json`),
      JSON.stringify(dataRecord, null, 2) + "\n",
      "utf8"
    );

    fs.writeFileSync(
      path.join(contentDir, `${entry.slug}.md`),
      buildMarkdown(entry),
      "utf8"
    );

    count += 1;
  }

  console.log(`Generated ${count} course JSON files.`);
  console.log(`Generated ${count} course markdown files.`);
}

main();