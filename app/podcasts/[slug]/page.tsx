import { notFound } from "next/navigation";
import { getCollection } from "../../../lib/content";
import { readMarkdownFile, markdownToSimpleHtml } from "../../../lib/markdown";

type Podcast = {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration_seconds?: number;
  published_date?: string;
  audio_url?: string;
  transcript_url?: string;
};

export default function PodcastDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const podcasts = getCollection<Podcast>("data/podcasts", { excludeManifest: true });
  const podcast = podcasts.find((item) => item.slug === params.slug);

  if (!podcast) {
    notFound();
  }

  const markdown = readMarkdownFile(`content/podcasts/${params.slug}.md`);

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>{podcast.title}</h1>
      <p>{podcast.description}</p>
      <p>
        <strong>Duration:</strong> {podcast.duration_seconds ?? 0} seconds
      </p>
      <p>
        <strong>Published:</strong> {podcast.published_date || "Unscheduled"}
      </p>

      {podcast.audio_url ? (
        <p>
          <a href={podcast.audio_url} target="_blank" rel="noreferrer">
            Listen
          </a>
        </p>
      ) : null}

      {podcast.transcript_url ? (
        <p>
          <a href={podcast.transcript_url} target="_blank" rel="noreferrer">
            Transcript
          </a>
        </p>
      ) : null}

      {markdown ? (
        <section
          dangerouslySetInnerHTML={{ __html: markdownToSimpleHtml(markdown) }}
        />
      ) : null}
    </main>
  );
}