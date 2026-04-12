import SectionCard from "../components/SectionCard";

const sections = [
  {
    title: "Canon",
    description: "Browse the 81-Book Ethiopian Canon through structured entries.",
    href: "/canon"
  },
  {
    title: "Bible Reader",
    description: "Read scripture chapter-by-chapter inside the study platform.",
    href: "/bible-reader"
  },
  {
    title: "Courses",
    description: "Explore curriculum-ready theological learning modules.",
    href: "/courses"
  },
  {
    title: "Articles",
    description: "Read publication-style essays tied to canon and doctrine.",
    href: "/articles"
  },
  {
    title: "Podcasts",
    description: "Access the audio study layer of the GCB ecosystem.",
    href: "/podcasts"
  },
  {
    title: "Reading Plans",
    description: "Follow structured study journeys across books and themes.",
    href: "/reading-plans"
  },
  {
    title: "Playlists",
    description: "Browse mapped playlist structures for the video corpus.",
    href: "/playlists"
  },
  {
    title: "Search",
    description: "Search canon entries, courses, playlists, podcasts, and articles.",
    href: "/search"
  }
];

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <h1>Goldstonian Concordance Bible (GCB) Study Platform</h1>

      <p>
        The scripture-centered, curriculum-ready, app-ready operating layer of
        the Goldstonian Concordance Bible ecosystem.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          marginTop: "2rem"
        }}
      >
        {sections.map((section) => (
          <SectionCard
            key={section.href}
            title={section.title}
            description={section.description}
            href={section.href}
          />
        ))}
      </div>
    </main>
  );
}