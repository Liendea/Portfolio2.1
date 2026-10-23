"use client";

import type { SanityAssetDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityColor } from "@/src/sanity/types/sanity";
import BackgroundMedia from "@/src/_components/backgroundMedia/BackgroundMedia";
import ContourField from "@/src/_components/backgroundContour/ContourField";
import { useMediaQuery } from "@/src/_hooks/useMediaQuery";
import HeroRoleScroller from "./components/HeroRoleScroller";
import HeroStatic from "./components/HeroStatic";
import styles from "./Hero.module.scss";

// Motsatsen till @mixin mobile (max-width: 768px) i _mixins.scss — håll
// dem i synk. Den som har stängt av animationer i OS:et får statisk version.
const ANIMATED_QUERY =
  "(min-width: 769px) and (prefers-reduced-motion: no-preference)";

type HeroProps = {
  heading: string;
  backgroundType?: "video" | "image" | "color";
  backgroundMedia?: SanityAssetDocument | SanityImageSource | string;
  backgroundColor?: SanityColor;
  exploreText?: string;
  headingColor: SanityColor;
};

export default function Hero({
  backgroundType = "video",
  backgroundMedia,
  backgroundColor,
  headingColor,
}: HeroProps) {
  // false på servern och första klientrenderingen → statisk version först,
  // sedan byter desktop till den animerade.
  const isAnimated = useMediaQuery(ANIMATED_QUERY);

  return (
    <section
      className={styles.heroSection}
      style={{
        zIndex: 100,
        backgroundColor:
          backgroundType === "color" ? backgroundColor?.hex : undefined,
        overflow: "hidden",
      }}
    >
      {/* Bakgrund */}
      {(backgroundType === "video" || backgroundType === "image") &&
        backgroundMedia && (
          <BackgroundMedia
            type={backgroundType}
            backgroundMedia={backgroundMedia}
          />
        )}
      <ContourField />

      {/* Innehåll */}

      {isAnimated ? (
        <HeroRoleScroller headingColor={headingColor} />
      ) : (
        <HeroStatic headingColor={headingColor} />
      )}
    </section>
  );
}
