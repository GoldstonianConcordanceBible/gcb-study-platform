import { getCanonBooks } from "../../../lib/bible";

export async function GET() {
  const books = getCanonBooks();

  return Response.json({
    count: books.length,
    items: books
  });
}