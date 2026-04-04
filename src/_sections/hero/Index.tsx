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

  const theshold1 = 50; // Fullstack
  const theshold2 = 100; // UX
  const theshold3 = 150; // UI
  const theshold4 = 200; // App
  const maxScroll = 250; // Reset

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      scrollValue.current += event.deltaY;

      if (scrollValue.current < theshold1) {
        setCurrentRole("FRONTEND");
      } else if (
        scrollValue.current >= theshold1 &&
        scrollValue.current < theshold2
      ) {
        setCurrentRole("FULLSTACK");
      } else if (
        scrollValue.current >= theshold2 &&
        scrollValue.current < theshold3
      ) {
        setCurrentRole("UX ");
      } else if (
        scrollValue.current >= theshold3 &&
        scrollValue.current < theshold4
      ) {
        setCurrentRole("UI");
      } else if (
        scrollValue.current >= theshold4 &&
        scrollValue.current < maxScroll
      ) {
        setCurrentRole("APP");
      } else if (scrollValue.current >= maxScroll) {
        scrollValue.current = 0; // Reset
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  });

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
          <span key={currentRole} className="role-animation">
            {currentRole}
          </span>
          <br /> {currentRole === "FRONTEND" && "DEVELOPER"}
          {currentRole === "FULLSTACK" && "DEVELOPER"}
          {currentRole === "UX " && "DESIGNER"}
          {currentRole === "UI" && "DESIGNER"}
          {currentRole === "APP" && "DEVELOPER"}
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
