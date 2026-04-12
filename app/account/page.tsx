import Link from "next/link";

export default function AccountPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Account</h1>
      <p>
        Future home for saved study journeys, tracked progress, and user-facing
        learning tools within the GCB Study Platform.
      </p>

      <ul>
        <li>
          <Link href="/account/progress">Study Progress</Link>
        </li>
        <li>
          <Link href="/account/saved">Saved Content</Link>
        </li>
      </ul>
    </main>
  );
}