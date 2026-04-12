import { getCollection } from "../../lib/content";

type Playlist = {
  id: string;
  title: string;
  platform: string;
  description: string;
};

export default function PlaylistsPage() {
  const playlists = getCollection<Playlist>("data/playlists", { excludeManifest: true });

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Playlists</h1>
      <p>Browse curated GCB playlists organized by canon, theme, and study flow.</p>

      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <strong>{playlist.title}</strong>
            <div>{playlist.platform}</div>
            <p>{playlist.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}