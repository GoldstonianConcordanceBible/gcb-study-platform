import { getTokenAccess } from "../../lib/account";

export default function TokenPage() {
  const entries = getTokenAccess();

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>GCB Token Layer</h1>

      <p>
        Information about the GCB community token, access logic, and future
        governance relationships.
      </p>

      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.access_type}</strong>
            <p>{entry.description}</p>
            <div>Token: {entry.token_name ?? "GCB"}</div>
            <div>Chain: {entry.token_chain ?? "Solana"}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}