"use client";
import { useState, useRef } from "react";
import { useLandingScroll } from "./useLandingScroll";
import { useScrollLock } from "./useScrollLock";

export function useLandingLogic() {
  const [scrollLocked, setScrollLocked] = useState(true);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const { showVideo, showButton, setExploreClicked } = useLandingScroll();
  useScrollLock(scrollLocked);

  const handleExploreClick = () => {
    setExploreClicked(true);
    setScrollLocked(false);
    previewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    heroRef,
    previewRef,
    handleExploreClick,
    showVideo,
    showButton,
  };
}
