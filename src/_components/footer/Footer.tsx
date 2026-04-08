"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/src/sanity/lib/image";
import type { SanityColor } from "../../app/(site)/[slug]/page";

type LinkItem = {
  title: string;
  href: string;
};

type FooterProps = {
  exploreLinks?: LinkItem[];
  socialLinks?: LinkItem[];
  contactEmail?: string;
  logo?: SanityImageSource;
  copyright?: string;
  textColor?: SanityColor;
  backgroundColor?: SanityColor;
};

export default function Footer({
  exploreLinks = [],
  socialLinks = [],
  contactEmail = "",
  logo,
  copyright,
  textColor,
  backgroundColor,
}: FooterProps) {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const imageUrl = logo ? urlFor(logo).url() : "";

  return (
    <footer
      className="footer-section"
      style={{ backgroundColor: backgroundColor?.hex }}
    >
      <div className="footer-content" style={{ color: textColor?.hex }}>
        <div className="footer-explore">
          <p>EXPLORE</p>
          <div className="footer-links">
            {exploreLinks.map((link, i) => (
              <a key={i} href={link.href} className="footer-link">
                {link.title}
              </a>
            ))}
          </div>
        </div>
        {pathname !== "/contact" && socialLinks.length > 0 && (
          <div className="footer-socials">
            <p>CONNECT</p>
            <div className="footer-links">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        )}
        {pathname !== "/contact" && contactEmail && (
          <div className="footer-contact">
            <p>SAY HELLO</p>
            <a href={`mailto:${contactEmail}`} className="footer-email">
              Send Email
            </a>
          </div>
        )}
      </div>
      {logo && (
        <div className="footer-logo-container">
          <Image
            src={imageUrl}
            alt="Footer Logo"
            className="footer-logo"
            width={1000}
            height={500}
            priority
          />
          {copyright && (
            <p className="footer-copy" style={{ color: textColor?.hex }}>
              Copyright:{copyright}
            </p>
          )}
        </div>
      )}
    </footer>
  );
}
