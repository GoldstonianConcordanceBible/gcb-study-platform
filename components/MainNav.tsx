import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/canon", label: "Canon" },
  { href: "/bible-reader", label: "Bible Reader" },
  { href: "/courses", label: "Courses" },
  { href: "/articles", label: "Articles" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/reading-plans", label: "Reading Plans" },
  { href: "/playlists", label: "Playlists" },
  { href: "/doctrine", label: "Doctrine" },
  { href: "/glossary", label: "Glossary" },
  { href: "/search", label: "Search" },
  { href: "/roadmap", label: "Roadmap" }
];

export default function MainNav() {
  return (
    <nav
      style={{
        borderBottom: "1px solid #ddd",
        padding: "1rem 0",
        marginBottom: "2rem"
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem"
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              textDecoration: "none",
              padding: "0.4rem 0.65rem",
              border: "1px solid #ddd",
              borderRadius: 8
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}