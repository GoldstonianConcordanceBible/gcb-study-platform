import { notFound } from "next/navigation";
import { getCollection } from "../../../lib/content";
import { readMarkdownFile, markdownToSimpleHtml } from "../../../lib/markdown";

type ReadingPlan = {
  id: string;
  slug: string;
  title: string;
  purpose: string;
  sequence?: string[];
  intended_use?: string[];
};

export default function ReadingPlanDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const plans = getCollection<ReadingPlan>("data/reading-plans", { excludeManifest: true });
  const plan = plans.find((item) => item.slug === params.slug);

  if (!plan) {
    notFound();
  }

  const markdown = readMarkdownFile(`content/reading-plans/${params.slug}.md`);

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>{plan.title}</h1>
      <p>{plan.purpose}</p>

      <h2>Sequence</h2>
      <ol>
        {(plan.sequence ?? []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>

      <h2>Intended Use</h2>
      <ul>
        {(plan.intended_use ?? []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {markdown ? (
        <section
          dangerouslySetInnerHTML={{ __html: markdownToSimpleHtml(markdown) }}
        />
      ) : null}
    </main>
  );
}