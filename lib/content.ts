import fs from "fs";
import path from "path";

type GenericRecord = Record<string, unknown>;

const ROOT = process.cwd();

function readJSON<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return null;
  }
}

function getJsonFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
}

export function getCollection<T = GenericRecord>(
  relativeDir: string,
  options?: { excludeManifest?: boolean }
): T[] {
  const dir = path.join(ROOT, relativeDir);
  const files = getJsonFiles(dir).filter((file) => {
    if (!options?.excludeManifest) return true;
    return !file.endsWith("manifest.json");
  });

  const items: T[] = [];

  for (const file of files) {
    const record = readJSON<T>(path.join(dir, file));
    if (record) items.push(record);
  }

  return items;
}

export function getArrayCollection<T = GenericRecord>(
  relativeDir: string,
  options?: { excludeManifest?: boolean }
): T[] {
  const dir = path.join(ROOT, relativeDir);
  const files = getJsonFiles(dir).filter((file) => {
    if (!options?.excludeManifest) return true;
    return !file.endsWith("manifest.json");
  });

  const items: T[] = [];

  for (const file of files) {
    const record = readJSON<T[]>(path.join(dir, file));
    if (Array.isArray(record)) {
      items.push(...record);
    }
  }

  return items;
}