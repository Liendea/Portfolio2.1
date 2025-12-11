"use client";

import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../sanity/lib/image";

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
};

export default function Footer({
  exploreLinks = [],
  socialLinks = [],
  contactEmail = "",
  logo,
  copyright = "",
}: FooterProps) {
  const imageUrl = logo ? urlFor(logo).url() : "";

  return (
    <footer className="footer-section">
      <div className="footer-content">
        {/* Explore */}
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

        {/* Socials */}
        <div className="footer-socials">
          <p>FOLLOW ME</p>
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

        {/* Contact */}
        {contactEmail && (
          <div className="footer-contact">
            <p>SAY HELLO</p>
            <a href={`mailto:${contactEmail}`} className="footer-email">
              {contactEmail}
            </a>
          </div>
        )}
      </div>

      {/* Logo + Copyright */}
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
          {copyright && <p className="footer-copy">{copyright}</p>}
        </div>
      )}
    </footer>
  );
}
