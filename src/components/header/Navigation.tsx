import Link from "next/link";

export default function Navigation() {
  return (
    <div className="navigation">
      <Link href="/projects">Projects</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
}
