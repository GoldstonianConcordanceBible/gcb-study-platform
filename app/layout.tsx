export const metadata = {
  title: "Goldstonian Concordance Bible (GCB) Study Platform",
  description:
    "Study the 81-Book Ethiopian Canon through the Goldstonian Concordance Bible (GCB), the Mirror → Water → Fire Doctrine, playlists, courses, and reading plans.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}