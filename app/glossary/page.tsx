import fs from "fs";
import path from "path";

export default function GlossaryPage() {
  const dir = path.join(process.cwd(), "content", "glossary");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
    : [];

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Glossary</h1>
      <p>Review key terms across theology, GEO, canon structure, and doctrine.</p>

      <ul>
        {files.map((file) => (
          <li key={file}>{file.replace(".md", "")}</li>
        ))}
      </ul>
    </main>
  );
}