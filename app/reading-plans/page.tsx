import Link from "next/link";
import { getCollection } from "../../lib/content";

type ReadingPlan = {
  id: string;
  slug: string;
  title: string;
  purpose: string;
  sequence?: string[];
};

export default function ReadingPlansPage() {
  const plans = getCollection<ReadingPlan>("data/reading-plans", { excludeManifest: true });

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Reading Plans</h1>
      <p>Follow structured journeys across books, themes, and doctrinal pathways.</p>

      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <strong>{plan.title}</strong>
            <p>{plan.purpose}</p>
            <div>Books in sequence: {plan.sequence?.length ?? 0}</div>
            <Link href={`/reading-plans/${plan.slug}`}>View reading plan</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}