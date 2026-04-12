import Link from "next/link";
import { notFound } from "next/navigation";
import { getCanonBook } from "../../../lib/bible";
import { readMarkdownFile, markdownToSimpleHtml } from "../../../lib/markdown";

export default function CanonDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const book = getCanonBook(params.slug);

  if (!book) {
    notFound();
  }

  const markdown = readMarkdownFile(`content/canon/${params.slug}.md`);

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>{book.title}</h1>
      <p>
        <strong>Order:</strong> {book.order}
      </p>
      <p>
        <strong>Canon Group:</strong> {book.canon_group}
      </p>
      <p>
        <strong>Testament:</strong> {book.testament}
      </p>
      <p>{book.summary}</p>

      <p>
        <Link href={`/bible-reader/${book.slug}/1`}>Open Bible Reader</Link>
      </p>

      {markdown ? (
        <section
          dangerouslySetInnerHTML={{ __html: markdownToSimpleHtml(markdown) }}
        />
      ) : null}
    </main>
  );
}