"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { urlFor } from "@/src/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import styles from "../../Showcase.module.scss";

type CaseItemProps = {
  imageObject: SanityImageSource;
  videoObject?: string;
  title: string;
  jobDescription?: string;
  projectDescription?: string;
  stack: string;
  width: number;
  height: number;
  url: string;
  isOpen: boolean;
  onToggle: () => void;
};
export default function CaseItem({
  imageObject,
  title,
  jobDescription,
  projectDescription,
  width,
  height,
  stack,
  url,
  isOpen,
  videoObject,
  onToggle,
}: CaseItemProps) {
  const imageUrl = urlFor(imageObject)
    .width(width)
    .height(height)
    .quality(100)
    .url();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Videon ska börja spelas direkt när caset öppnas, och pausas/nollställas
  // igen när det stängs.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isOpen) {
      videoEl.currentTime = 0;
      videoEl.play().catch(() => {
        // Autoplay kan blockeras av webbläsaren i vissa lägen - inget att
        // felsöka, användaren kan då starta videon manuellt via kontrollerna.
      });
    } else {
      videoEl.pause();
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.caseItem}${isOpen ? ` ${styles.caseItemOpen}` : ""}`}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
    >
      <div className={styles.caseItemFlexRow}>
        <h4 className={styles.caseItemTitle}>{title}</h4>
        <div className={styles.caseItemRight}>
          <div className={styles.caseItemText}>
            {jobDescription?.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <span className={styles.accordionItemIcon} aria-hidden="true">
            <span
              className={`${styles.accordionItemIconLine} ${styles.accordionItemIconLineVertical}`}
            />
            <span
              className={`${styles.accordionItemIconLine} ${styles.accordionItemIconLineHorizontal}`}
            />
          </span>
        </div>
      </div>

      <div
        className={`${styles.caseItemFlexRow} ${styles.caseItemFlexRowExpanded}`}
      >
        <div className={styles.caseItemFlexCol}>
          <p className={styles.caseItemStack}>{stack}</p>
          <p className={styles.caseItemProjectDescription}>
            {projectDescription}
          </p>
          <Link
            href={url}
            target="_blank"
            rel="noopener norefferer"
            className={styles.caseItemLink}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src="/icons/Arrow_right.svg"
              alt="Arrow"
              width={15}
              height={15}
            />
            <p className={styles.caseItemLinkText}>View Project</p>
          </Link>
        </div>

        <div className={styles.caseItemImgWrapper}>
          {videoObject ? (
            <video
              ref={videoRef}
              src={videoObject}
              className={styles.caseItemVideo}
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              className={styles.caseItemImg}
              src={imageUrl}
              alt={title}
              width={width}
              height={height}
              loading="eager"
            />
          )}
        </div>
      </div>
    </div>
  );
}
