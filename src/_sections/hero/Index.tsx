"use client";

import type { SanityAssetDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import BackgroundVideo from "../../_components/backgroundVideo/BackgroundVideo";
import BackgroundImage from "../../_components/backgroundImage/BackgroundImage";
import P_Animation from "../../_components/gsap/P_Animation";
import type { SanityColor } from "../../app/(site)/[slug]/page";
import { useEffect, useState, useRef } from "react";

type HeroProps = {
  heading: string;
  subheading?: string;
  backgroundType?: "video" | "image" | "color"; // avgör vad som ska renderas
  backgroundMedia?: SanityAssetDocument | SanityImageSource | string; // video, bild eller färgkod
  backgroundColor?: SanityColor;
  exploreText?: string;
  subheadingColor: SanityColor;
  headingColor: SanityColor;
};

type Role = "FRONTEND" | "FULLSTACK" | "UX " | "UI" | "APP";

export default function Hero({
  //heading,
  subheading,
  backgroundType = "video",
  backgroundMedia,
  backgroundColor,
  subheadingColor,
  headingColor,
}: HeroProps) {
  const [currentRole, setCurrentRole] = useState<Role>("FRONTEND");
  const scrollValue = useRef(0);
  const roles: Role[] = ["FRONTEND", "FULLSTACK", "UX ", "UI", "APP"];

  useEffect(() => {
    // 1. Kolla om vi är på mobil (t.ex. skärmbredd under 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // --- MOBILLOGIK: Tidsstyrd loop ---
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % roles.length;
        setCurrentRole(roles[index]);
      }, 2000);

      return () => clearInterval(interval);
    } else {
      // --- DESKTOPLOGIK: Wheel/Scroll ---
      const handleWheel = (event: WheelEvent) => {
        scrollValue.current += event.deltaY;

        const threshold = 50;
        // Enklare sätt att räkna ut index baserat på scroll
        const newIndex =
          Math.floor(Math.abs(scrollValue.current / threshold)) % roles.length;
        setCurrentRole(roles[newIndex]);

        // Valfritt: Hindra scrollValue från att växa i oändlighet
        if (scrollValue.current > 1000) scrollValue.current = 0;
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      return () => window.removeEventListener("wheel", handleWheel);
    }
  }, []); // Körs en gång vid mount

  return (
    <section
      className="hero-section"
      style={{
        backgroundColor:
          backgroundType === "color" ? backgroundColor?.hex : undefined,
        overflow: "hidden",
      }}
    >
      {backgroundType === "video" && backgroundMedia && (
        <BackgroundVideo backgroundMedia={backgroundMedia} />
      )}

      {backgroundType === "image" && backgroundMedia && (
        <BackgroundImage backgroundMedia={backgroundMedia} />
      )}

      <div className="hero-text-container">
        <h1 className="hero-text" style={{ color: headingColor?.hex }}>
          <span key={currentRole} className="role-animation glitch">
            {currentRole}
          </span>
          <br />
          {/* Dynamisk text efter roll */}
          {currentRole === "UX " || currentRole === "UI"
            ? "DESIGNER"
            : "DEVELOPER"}
        </h1>
        <div className="animated-text-container">
          <P_Animation
            textToAnimate={subheading}
            color={subheadingColor?.hex}
          />
        </div>
      </div>
    </section>
  );
}
