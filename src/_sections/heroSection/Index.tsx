"use client";

import type { SanityAssetDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import BackgroundMedia from "../../_components/backgroundMedia/BackgroundMedia";
import type { SanityColor } from "../../app/(site)/[slug]/page";
import { useEffect, useState, useRef } from "react";
import AsciiField from "@/src/_components/backgroundAscii/AsciiField";

type HeroProps = {
  heading: string;
  backgroundType?: "video" | "image" | "color";
  backgroundMedia?: SanityAssetDocument | SanityImageSource | string;
  backgroundColor?: SanityColor;
  exploreText?: string;
  headingColor: SanityColor;
};

type Role = "FRONTEND" | "FULLSTACK" | "UX " | "UI" | "APP";

export default function Hero({
  backgroundType = "video",
  backgroundMedia,
  backgroundColor,
  headingColor,
}: HeroProps) {
  const [currentRole, setCurrentRole] = useState<Role>("FRONTEND");
  const scrollValue = useRef(0);
  const roles: Role[] = ["FRONTEND", "FULLSTACK", "UX ", "UI", "APP"];

  useEffect(() => {
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
        const newIndex =
          Math.floor(Math.abs(scrollValue.current / threshold)) % roles.length;
        setCurrentRole(roles[newIndex]);

        if (scrollValue.current > 1000) scrollValue.current = 0;
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      return () => window.removeEventListener("wheel", handleWheel);
    }
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        zIndex: 100,

        backgroundColor:
          backgroundType === "color" ? backgroundColor?.hex : undefined,
        overflow: "hidden",
      }}
    >
      {(backgroundType === "video" || backgroundType === "image") &&
        backgroundMedia && (
          <BackgroundMedia
            type={backgroundType}
            backgroundMedia={backgroundMedia}
          />
        )}

      <AsciiField />

      <div
        className="hero-text-container"
        style={{ position: "relative", zIndex: 10 }}
      >
        <h1 className="hero-text" style={{ color: headingColor?.hex }}>
          <span key={currentRole} className="role-animation">
            {currentRole}
          </span>
          <br />

          {currentRole === "UX " || currentRole === "UI"
            ? "DESIGNER"
            : "DEVELOPER"}
        </h1>
      </div>
    </section>
  );
}
