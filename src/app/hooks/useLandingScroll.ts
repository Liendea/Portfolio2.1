"use client";
import { useState } from "react";

export function useLandingScroll() {
  const [exploreClicked, setExploreClicked] = useState(false);

  // Både video och knapp visas tills användaren klickar på Explore
  const showVideo = !exploreClicked;
  const showButton = !exploreClicked;

  return { showVideo, showButton, setExploreClicked };
}
