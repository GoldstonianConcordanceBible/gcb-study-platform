import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "data",
    "releases",
    "release-manifest.json"
  );

  const content = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  return Response.json({
    count: content.length,
    items: content
  });
}