"use client";

import AnimatedText from "./AnimatedText";
import Image from "next/image";
import { useState } from "react";
import arrows from "../../../public/icons/Arrows_light.svg";
import type { SanityAssetDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../sanity/lib/image";

type HeroProps = {
  heading: string;
  subheading?: string;
  backgroundType?: "video" | "image" | "color"; // avgör vad som ska renderas
  backgroundMedia?: SanityAssetDocument | SanityImageSource | string; // video, bild eller färgkod
  backgroundColor?: string; // kan användas om backgroundType === "color"
  exploreText?: string;
};

export default function Hero({
  heading,
  subheading,
  backgroundType = "video",
  backgroundMedia,
  backgroundColor,
  exploreText = "EXPLORE",
}: HeroProps) {
  const [showVideo, setShowVideo] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const videostyling: React.CSSProperties = {
    opacity: showVideo ? 1 : 0,
    pointerEvents: showVideo ? "auto" : "none",
    transition: "opacity 0.5s ease",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -10,
  };

  const onExploreClick = () => {
    setShowVideo(false);
    setShowButton(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <section
      className="hero-section"
      style={{
        backgroundColor:
          backgroundType === "color" ? backgroundColor : undefined,
        overflow: "hidden",
        width: "100%",
        height: "100vh",
      }}
    >
      {backgroundType === "video" && backgroundMedia && (
        <video
          src={
            typeof backgroundMedia === "string"
              ? backgroundMedia
              : urlFor(backgroundMedia).url()
          }
          autoPlay
          loop
          muted
          playsInline
          style={videostyling}
        />
      )}

      {backgroundType === "image" && backgroundMedia && (
        <Image
          src={
            typeof backgroundMedia === "string"
              ? backgroundMedia
              : urlFor(backgroundMedia).url()
          }
          alt="Hero Background"
          fill
          style={{
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      )}

      <div className="hero-text">
        <h1>{heading}</h1>
        <AnimatedText textToAnimate={subheading} />
      </div>

      {showButton && (
        <div className="button-wrapper">
          <button onClick={onExploreClick} className="explore-button">
            {exploreText}
            <Image
              src={arrows}
              className="explore-arrow"
              alt="arrow"
              width={40}
              height={40}
            />
          </button>
        </div>
      )}
    </section>
  );
}
