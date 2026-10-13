"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/src/sanity/lib/image";
import type { SanityColor } from "../../app/(site)/[slug]/page";
import type { FooterColumn } from "@/src/sanity/lib/fetchSettings";
import styles from "./Footer.module.scss";

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

  // Footer ligger i den delade (site)-layouten och monteras ALDRIG om
  // mellan sidnavigeringar - men vi tvingar fram en ren omstart av både
  // höjdmätning och scroll-animation vid varje sidbyte (key={pathname}
  // på wrappern nedan ger ett helt nytt DOM-element varje gång, så det
  // aldrig finns kvarbliven GSAP-state från en tidigare sida kvar).
  useEffect(() => {
    const footerEl = footerRef.current;
    const innerEl = innerRef.current;
    if (!footerEl || !innerEl) return;

    let frame = 0;
    let ctx: gsap.Context | undefined;

    const setHeightVar = () => {
      document.documentElement.style.setProperty(
        "--footer-height",
        `${footerEl.offsetHeight}px`,
      );
    };

    // 1. Mät footerns höjd direkt (--footer-height styr .site-main och
    //    .footer-reveal-wrapper, se _global.scss / _footer.scss).
    setHeightVar();

    // 2. Vänta en frame så layouten hunnit lägga om sig utifrån den nya
    //    höjden innan ScrollTrigger mäter var i dokumentet footern
    //    faktiskt hamnar - annars riskerar starten/slutet av animationen
    //    att räknas ut fel just den här gången.
    frame = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
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
      }, footerEl);

      ScrollTrigger.refresh();
    });

    // Om footerns egen höjd ändras senare (t.ex. fönster ändrar storlek
    // och kolumnerna radas om) - håll --footer-height och ScrollTriggers
    // mått i synk.
    const observer = new ResizeObserver(() => {
      setHeightVar();
      ScrollTrigger.refresh();
    });
    observer.observe(footerEl);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      ctx?.revert();
      document.documentElement.style.removeProperty("--footer-height");
    };
  }, [pathname]);

  if (pathname === "/") return null;

  const imageUrl = logo ? urlFor(logo).url() : "";

  return (
    <div className={styles.footerRevealWrapper} key={pathname}>
      <footer
        ref={footerRef}
        className={styles.footerSection}
        style={{ backgroundColor: backgroundColor?.hex }}
      >
        <div className="footer-inner" ref={innerRef}>
          <div
            className={styles.footerContent}
            style={{ color: textColor?.hex }}
          >
            {columns.map((column, i) => (
              <div key={i} className={styles.footerColumn}>
                {column.title && (
                  <h5 className={styles.footerColumnTitle}>
                    {column.title.toUpperCase()}
                  </h5>
                )}
                <div className={styles.footerLinks}>
                  {column.links?.map((link, j) => {
                    if (!link.url) {
                      return (
                        <p key={j} className={styles.footerLink}>
                          {link.displayText}
                        </p>
                      );
                    }

                    // Interna sidor (/about, /contact, /showcase) och
                    // ankare (#sektion) navigeras med Next Link så det
                    // blir en vanlig SPA-övergång utan omladdning.
                    // Riktiga externa länkar (https://...) samt
                    // mailto:/tel: kan inte routas av Next och öppnas
                    // därför som vanliga länkar.
                    const isInternal =
                      link.url.startsWith("/") || link.url.startsWith("#");

                    if (isInternal) {
                      return (
                        <Link
                          key={j}
                          href={link.url}
                          className={styles.footerLink}
                        >
                          {link.displayText}
                        </Link>
                      );
                    }

                    const isExternalHttp = /^https?:\/\//.test(link.url);

                    return (
                      <a
                        key={j}
                        href={link.url}
                        className={styles.footerLink}
                        {...(isExternalHttp
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.displayText}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {logo && (
            <div className={styles.footerLogoContainer}>
              <Image
                src={imageUrl}
                alt="Footer Logo"
                className={styles.footerLogo}
                width={1000}
                height={500}
                priority
              />
            </div>
          )}

          {copyright && (
            <p className={styles.footerCopy} style={{ color: textColor?.hex }}>
              Copyright:{copyright}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}
