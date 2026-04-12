import Link from "next/link";
import { getCollection } from "../../lib/content";

type Podcast = {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration_seconds?: number;
  published_date?: string;
};

export default function PodcastsPage() {
  const podcasts = getCollection<Podcast>("data/podcasts", { excludeManifest: true });

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Podcasts</h1>
      <p>Audio studies, discussions, and transcript-linked theological teaching.</p>

      <ul>
        {podcasts.map((podcast) => (
          <li key={podcast.id}>
            <strong>{podcast.title}</strong>
            <div>{podcast.published_date || "Unscheduled"}</div>
            <div>Duration: {podcast.duration_seconds ?? 0} seconds</div>
            <p>{podcast.description}</p>
            <Link href={`/podcasts/${podcast.slug}`}>View episode</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}