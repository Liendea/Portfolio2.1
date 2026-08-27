"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/src/sanity/lib/image";
import type { SanityColor } from "../../app/(site)/[slug]/page";
import type { FooterColumn } from "@/src/sanity/lib/fetchSettings";

gsap.registerPlugin(ScrollTrigger);

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
  const footerRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Sätter --footer-height på :root så .site-main (se _global.scss) vet
  // hur mycket den ska dras ner över footern för ridå-effekten.
  // OBS: Footer ligger i den delade (site)-layouten och monteras ALDRIG
  // om mellan sidnavigeringar, så ResizeObserver måste leva hela tiden
  // (inte pathname-beroende) - den fångar automatiskt om footerns egen
  // höjd skulle ändras.
  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const setHeightVar = () => {
      document.documentElement.style.setProperty(
        "--footer-height",
        `${footerEl.offsetHeight}px`,
      );
      // Sidans totala scrollhöjd beror på --footer-height (se .site-main
      // och .footer-reveal-wrapper), så ScrollTrigger måste räkna om sig
      // varje gång värdet ändras.
      ScrollTrigger.refresh();
    };

    setHeightVar();
    const observer = new ResizeObserver(setHeightVar);
    observer.observe(footerEl);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--footer-height");
    };
  }, []);

  // Footerns innehåll tonas/glider in i takt med scrollen medan den
  // avslöjas bakom sidans innehåll (ren scrub-animation, ingen pin).
  // Körs om vid varje sidbyte (pathname) - eftersom Footer inte monteras
  // om mellan sidor måste vi själva skapa om ScrollTrigger med färska
  // mått, annars ligger triggerns start/slut kvar från förra sidans
  // (annorlunda långa) layout och animationen "fastnar" osynlig eller
  // redan klar.
  useEffect(() => {
    const footerEl = footerRef.current;
    const innerEl = innerRef.current;
    if (!footerEl || !innerEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerEl,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerEl,
            start: "top bottom",
            end: "top 65%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      // Vänta en frame så det nya sidinnehållet (och --footer-height)
      // hunnit läggas ut innan vi tvingar fram en omräkning.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, footerEl);

    return () => ctx.revert();
  }, [pathname]);

  if (pathname === "/") return null;

  const imageUrl = logo ? urlFor(logo).url() : "";

  return (
    <div className="footer-reveal-wrapper">
      <footer
        ref={footerRef}
        className="footer-section"
        style={{ backgroundColor: backgroundColor?.hex }}
      >
      <div className="footer-inner" ref={innerRef}>
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
      </div>
      </footer>
    </div>
  );
}
