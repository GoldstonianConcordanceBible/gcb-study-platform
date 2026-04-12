import { getCollection } from "../../lib/content";

type Article = {
  id: string;
  title: string;
  summary: string;
  author: string;
  published_date: string;
};

export default function ArticlesPage() {
  const articles = getCollection<Article>("data/articles", { excludeManifest: true });

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Articles</h1>
      <p>Publication-style essays and written studies connected to the GCB ecosystem.</p>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong>
            <div>{article.author} · {article.published_date}</div>
            <p>{article.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}