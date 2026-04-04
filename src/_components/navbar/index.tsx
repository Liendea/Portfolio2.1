"use client";
import Link from "next/link";
import Image from "next/image";
import smiley from "../../../public/icons/smiley.svg";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type NavLink = {
  title: string;
  href: string;
};

type navbarProps = {
  navigationLinks: NavLink[];
  showNavbar?: boolean;
  closeNavbar?: () => void;
};
export default function Navbar({
  navigationLinks,
  showNavbar,
  closeNavbar,
}: navbarProps) {
  const currentPath = usePathname();
  const normalizedPath = currentPath.slice(1);

  const isHomePage = currentPath === "/" || currentPath === "/home";

  const navLinksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (showNavbar) {
      // Animera in länkarna när navbar visas
      gsap.fromTo(
        navLinksRef.current,
        {
          opacity: 0,
          y: -20, // Startar 20px över sin position
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08, // Varje länk kommer in lite efter den förra
        },
      );
    }
  }, [showNavbar, normalizedPath]); // Kör när navbar visas eller path ändras

  return (
    <nav
      className={`navigation 
        ${!showNavbar ? "hidden" : ""}
      ${!isHomePage ? "shifted" : ""}`}
    >
      {navigationLinks
        ?.filter((link) => normalizedPath !== link.href)
        .map((link, i) => (
          <div
            key={i}
            ref={(el) => {
              navLinksRef.current[i] = el;
            }}
          >
            <Link
              href={`/${link.href}`}
              className="navlink"
              onClick={closeNavbar}
            >
              <span>
                <Image
                  className="smiley"
                  src={smiley}
                  alt="smiley face"
                  width="20"
                  height="20"
                />
              </span>{" "}
              {link.title}
            </Link>
          </div>
        ))}
    </nav>
  );
}
