import { getDemoProgress } from "../../../lib/account";

export default function AccountProgressPage() {
  const items = getDemoProgress();

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Study Progress</h1>
      <p>Demo progress layer for future authenticated study tracking.</p>

      <ul>
        {items.map((item) => (
          <li key={`${item.user_id}-${item.content_id}`}>
            <strong>{item.content_id}</strong>
            <div>Type: {item.content_type}</div>
            <div>Status: {item.status}</div>
            <div>Complete: {item.percent_complete ?? 0}%</div>
            <div>Last Accessed: {item.last_accessed ?? "Unknown"}</div>
            {item.notes ? <p>{item.notes}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}