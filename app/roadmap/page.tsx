import fs from "fs";
import path from "path";

export default function RoadmapPage() {
  const dir = path.join(process.cwd(), "docs", "release-notes");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
    : [];

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Roadmap</h1>
      <p>Track public build progress across canon, courses, doctrine, and app layers.</p>

      <ul>
        {files.map((file) => (
          <li key={file}>{file.replace(".md", "")}</li>
        ))}
      </ul>
    </main>
  );
}