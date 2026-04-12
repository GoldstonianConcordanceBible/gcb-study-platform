import Link from "next/link";
import { getReaderBooks } from "../../lib/bible";

export default function BibleReaderIndex() {
  const books = getReaderBooks();

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Bible Reader</h1>

      <p>
        Navigate scripture within the Goldstonian Concordance Bible study
        platform.
      </p>

      {books.length === 0 ? (
        <p>No scripture files have been generated yet.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.slug}>
              <strong>{book.title}</strong>
              <ul>
                {book.chapters.map((chapter) => (
                  <li key={`${book.slug}-${chapter}`}>
                    <Link href={`/bible-reader/${book.slug}/${chapter}`}>
                      {book.title} {chapter}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}