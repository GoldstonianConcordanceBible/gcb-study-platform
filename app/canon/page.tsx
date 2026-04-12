import Link from "next/link";
import { getCanonBooks } from "../../lib/bible";

export default function CanonPage() {
  const books = getCanonBooks();

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Canon</h1>
      <p>Browse the 81-Book Ethiopian Canon through the GCB study platform.</p>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.order}. {book.title}</strong>
            <div>{book.canon_group} · {book.testament}</div>
            <p>{book.summary}</p>
            <Link href={`bible-reader/${book.slug}/1`}>Open reader</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}