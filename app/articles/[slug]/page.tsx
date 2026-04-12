import { notFound } from "next/navigation";
import { getCollection } from "../../../lib/content";
import { readMarkdownFile, markdownToSimpleHtml } from "../../../lib/markdown";

type Article = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  author: string;
  published_date: string;
  book_links?: string[];
  tags?: string[];
};

export default function ArticleDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const articles = getCollection<Article>("data/articles", { excludeManifest: true });
  const article = articles.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  const markdown = readMarkdownFile(`content/essays/${params.slug}.md`);

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>{article.title}</h1>
      <p>
        <strong>{article.author}</strong> · {article.published_date}
      </p>
      <p>{article.summary}</p>

      <h2>Tags</h2>
      <ul>
        {(article.tags ?? []).map((tag) => (
          <li key={tag}>{tag}</li>
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