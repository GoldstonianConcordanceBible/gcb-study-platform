import fs from "fs";
import path from "path";

export type BibleVerse = {
  verse: number;
  text: string;
  ge_ez_text?: string;
  annotation_ids?: string[];
};

export type BibleChapter = {
  book_id: string;
  chapter: number;
  translation_note?: string;
  ge_ez_available?: boolean;
  verses: BibleVerse[];
};

export type CanonBook = {
  id: string;
  slug: string;
  title: string;
  aliases?: string[];
  canon_group: string;
  testament: string;
  order: number;
  summary: string;
  themes?: string[];
  playlist_ids?: string[];
  video_ids?: string[];
  doctrine_links?: string[];
  reading_plan_ids?: string[];
};

const ROOT = process.cwd();

function readJSON<T>(file: string): T | null {
  try {
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return null;
  }
}

export function getCanonBooks(): CanonBook[] {
  const dir = path.join(ROOT, "data", "canon");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const books: CanonBook[] = [];

  for (const file of files) {
    if (file === "canon-manifest.json") continue;
    const data = readJSON<CanonBook>(path.join(dir, file));
    if (data?.id && data?.slug) books.push(data);
  }

  return books.sort((a, b) => a.order - b.order);
}

export function getCanonBook(slug: string): CanonBook | null {
  return readJSON<CanonBook>(path.join(ROOT, "data", "canon", `${slug}.json`));
}

export function getBibleChapter(book: string, chapter: number): BibleChapter | null {
  return readJSON<BibleChapter>(
    path.join(ROOT, "data", "bible-text", `${book}-${chapter}.json`)
  );
}

export function getReaderBooks(): Array<{ slug: string; title: string; chapters: number[] }> {
  const dir = path.join(ROOT, "data", "bible-text");
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json") && f !== "bible-manifest.json");

  const canon = getCanonBooks();
  const map = new Map<string, number[]>();

  for (const file of files) {
    const match = file.match(/^(.*)-(\d+)\.json$/);
    if (!match) continue;

    const [, slug, chapterRaw] = match;
    const chapter = Number(chapterRaw);

    if (!map.has(slug)) map.set(slug, []);
    map.get(slug)?.push(chapter);
  }

  return Array.from(map.entries())
    .map(([slug, chapters]) => {
      const canonBook = canon.find((b) => b.slug === slug);
      return {
        slug,
        title: canonBook?.title ?? slug,
        chapters: chapters.sort((a, b) => a - b)
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}