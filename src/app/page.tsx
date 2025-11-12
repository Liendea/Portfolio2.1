"use client";

import Hero from "./components/landingpage/Hero";
import ProjectPreview from "./components/landingpage/ProjectPreview";
import { useLandingLogic } from "./hooks/useLandingLogic";

export default function Page() {
  const { heroRef, previewRef, handleExploreClick, showVideo, showButton } =
    useLandingLogic();

  return (
    <div className="page-wrapper">
      <Hero
        onExploreClick={handleExploreClick}
        heroRef={heroRef}
        showVideo={showVideo}
        showButton={showButton}
      />

      <div ref={previewRef}>
        <ProjectPreview />
      </div>
    </div>
  );
}
