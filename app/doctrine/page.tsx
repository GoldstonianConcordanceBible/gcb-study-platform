import fs from "fs";
import path from "path";

export default function DoctrinePage() {
  const dir = path.join(process.cwd(), "content", "doctrine");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
    : [];

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Doctrine</h1>
      <p>Browse doctrine entries, interpretive structures, and thematic studies.</p>

      <ul>
        {files.map((file) => (
          <li key={file}>{file.replace(".md", "")}</li>
        ))}
      </ul>
    </main>
  );
}