export default function StorePage() {
  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>GCB Store</h1>

      <p>Books, volumes, and resources connected to the GCB ecosystem.</p>

      <ul>
        <li>
          <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
            G. Rune Publishing on Amazon
          </a>
        </li>
        <li>
          <a href="https://whatnot.com" target="_blank" rel="noopener noreferrer">
            Whatnot Live Sales
          </a>
        </li>
      </ul>

      <p>
        This route can later support direct product records, book metadata, and
        mission-aligned resource discovery.
      </p>
    </main>
  );
}