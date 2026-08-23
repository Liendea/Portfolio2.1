"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavLink = {
  title: string;
  href: string;
};

type navbarProps = {
  navigationLinks: NavLink[];
};

export default function Navbar({ navigationLinks }: navbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        {navigationLinks.map((link, i) => {
          // Aktiv sida = vit prick, annars svart (som smälter in mot
          // den mörka bakgrunden och alltså inte syns).
          const isActive = pathname === `/${link.href}`;

          return (
            <div key={i} className="navlink-wrapper">
              <Link
                href={`/${link.href}`}
                className="navlink"
                onClick={closeMenu}
              >
                {link.title}
              </Link>

              <Image
                src={isActive ? "/icons/dot_white.svg" : "/icons/dot_black.svg"}
                alt=""
                width={20}
                height={20}
                className="navlink-dot"
              />
            </div>
          );
        })}
      </nav>
    </>
  );
}
