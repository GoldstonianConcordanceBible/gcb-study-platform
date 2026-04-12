"use client";

export default function Error({
  error
}: {
  error: Error;
}) {
  console.error(error);

  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Unexpected Error</h1>

      <p>
        An unexpected error occurred while rendering this page.
      </p>

      <p>Please try refreshing or navigating to another section.</p>
    </main>
  );
}