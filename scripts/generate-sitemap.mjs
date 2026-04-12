import fs from "fs";

const pages = [
  "/",
  "/canon",
  "/courses",
  "/articles",
  "/podcasts",
  "/reading-plans",
  "/bible-reader"
];

const base = "https://gcb-study-platform.org";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `
<url>
<loc>${base}${p}</loc>
</url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", xml);

console.log("Generated sitemap.xml");