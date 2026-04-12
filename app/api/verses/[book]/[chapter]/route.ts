import { getBibleChapter } from "../../../../../lib/bible";

export async function GET(
  request: Request,
  context: { params: Promise<{ book: string; chapter: string }> }
) {
  const params = await context.params;
  const chapter = getBibleChapter(params.book, Number(params.chapter));

  if (!chapter) {
    return Response.json({ error: "Chapter not found" }, { status: 404 });
  }

  return Response.json(chapter);
}