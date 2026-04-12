import Link from "next/link";

type Props = {
  items: { label: string; href: string }[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav style={{ marginBottom: "1rem" }}>
      {items.map((item, i) => (
        <span key={item.href}>
          <Link href={item.href}>{item.label}</Link>
          {i < items.length - 1 ? " / " : ""}
        </span>
      ))}
    </nav>
  );
}