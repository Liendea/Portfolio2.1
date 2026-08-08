"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type NavLink = {
  title: string;
  href: string;
};

type navbarProps = {
  navigationLinks: NavLink[];
};

export default function Navbar({ navigationLinks }: navbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Låser bakgrundsscroll medan fullskärmsmenyn är öppen (mobil).
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        className={`hamburger-button${isOpen ? " open" : ""}`}
        aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      <nav className={`navigation${isOpen ? " navigation-open" : ""}`}>
        {navigationLinks.map((link, i) => (
          <div key={i}>
            <Link
              href={`/${link.href}`}
              className="navlink"
              onClick={closeMenu}
            >
              {link.title}
            </Link>
          </div>
        ))}
      </nav>
    </>
  );
}
