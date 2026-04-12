export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      }
    ],
    sitemap: "https://gcb-study-platform.org/sitemap.xml"
  };
}