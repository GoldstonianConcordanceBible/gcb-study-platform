export function buildMetadata(
  title: string,
  description: string
) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website"
    }
  };
}