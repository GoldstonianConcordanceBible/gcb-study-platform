import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "content",
    "doctrine",
    "mirror-water-fire.md"
  );

  const content = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : null;

  return Response.json({
    id: "mirror-water-fire",
    title: "Mirror → Water → Fire Doctrine",
    content
  });
}