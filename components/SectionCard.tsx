import Link from "next/link";
import React from "react";

type SectionCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function SectionCard({
  title,
  description,
  href
}: SectionCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: "1rem",
        minHeight: 140
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ marginBottom: 0 }}>{description}</p>
    </Link>
  );
}