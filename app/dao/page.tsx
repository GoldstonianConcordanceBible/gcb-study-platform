import fs from "fs";
import path from "path";

export default function DaoPage() {
  const dir = path.join(process.cwd(), "governance");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
    : [];

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>DAO Governance</h1>

      <p>
        Governance documentation, proposal pathways, and steward-facing
        coordination for the GCB ecosystem.
      </p>

      <ul>
        {files.map((file) => (
          <li key={file}>{file.replace(".md", "")}</li>
        ))}
      </ul>
    </main>
  );
}