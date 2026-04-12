import { getCanonBooks } from "../lib/bible";

export default async function sitemap() {
  const books = getCanonBooks();

  const base = "https://gcb-study-platform.org";

  const canonPages = books.map((book) => ({
    url: `${base}/canon/${book.slug}`,
    lastModified: new Date()
  }));

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/canon`, lastModified: new Date() },
    { url: `${base}/courses`, lastModified: new Date() },
    { url: `${base}/articles`, lastModified: new Date() },
    { url: `${base}/podcasts`, lastModified: new Date() },
    { url: `${base}/reading-plans`, lastModified: new Date() },
    { url: `${base}/bible-reader`, lastModified: new Date() },
    ...canonPages
  ];
}