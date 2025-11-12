"use client";

import { RefObject } from "react";
import AnimatedText from "./AnimatedText";
import Image from "next/image";
import arrows from "../../../../public/images/Arrows.svg";

interface HeroProps {
  onExploreClick: () => void;
  heroRef: RefObject<HTMLElement | null>;
  showVideo: boolean;
  showButton: boolean;
}

export default function Hero({
  onExploreClick,
  heroRef,
  showVideo,
  showButton,
}: HeroProps) {
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
    zIndex: -1000,
  };

  return (
    <section ref={heroRef} className="hero-section">
      {/* Bakgrundsvideo */}
      <div className={`background-video ${showVideo ? "" : "hidden"}`}>
        <video
          src="/images/ForestVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={videostyling}
        />
      </div>

      {/* Text */}
      <div className="hero-text">
        <h1>FRONTEND</h1>
        <h1>DEVELOPER</h1>
        <AnimatedText />
      </div>

      {/* Explore-knapp */}
      <div className={`button-wrapper ${showButton ? "" : "hidden"}`}>
        <button onClick={onExploreClick} className="explore-button">
          EXPLORE
          <Image
            src={arrows}
            className="explore-arrow"
            alt="arrow"
            width={40}
            height={40}
          />
        </button>
      </div>
    </section>
  );
}
