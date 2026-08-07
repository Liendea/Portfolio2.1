"use client";
import Link from "next/link";

type NavLink = {
  title: string;
  href: string;
};

type navbarProps = {
  navigationLinks: NavLink[];
};
export default function Navbar({ navigationLinks }: navbarProps) {
  return (
    <nav className={`navigation`}>
      {navigationLinks.map((link, i) => (
        <div key={i}>
          <Link href={`/${link.href}`} className="navlink">
            {link.title}
          </Link>
        </div>
      ))}
    </nav>
  );
}
