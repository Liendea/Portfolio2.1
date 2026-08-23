"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/src/sanity/lib/image";
import type { SanityColor } from "../../app/(site)/[slug]/page";
import type { FooterColumn } from "@/src/sanity/lib/fetchSettings";

type FooterProps = {
  contactEmail?: string;
  columns?: FooterColumn[];
  logo?: SanityImageSource;
  copyright?: string;
  textColor?: SanityColor | null;
  backgroundColor?: SanityColor | null;
};

export default function Footer({
  columns = [],
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
        {columns.map((column, i) => (
          <div key={i} className="footer-column">
            {column.title && (
              <h5 className="footer-column__title">
                {column.title.toUpperCase()}
              </h5>
            )}
            <div className="footer-links">
              {column.links?.map((link, j) =>
                link.url ? (
                  <a
                    key={j}
                    href={link.url}
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.displayText}
                  </a>
                ) : (
                  <p key={j} className="footer-link">
                    {link.displayText}
                  </p>
                ),
              )}
            </div>
          </div>
        ))}
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
        </div>
      )}

      {copyright && (
        <p className="footer-copy" style={{ color: textColor?.hex }}>
          Copyright:{copyright}
        </p>
      )}
    </footer>
  );
}
