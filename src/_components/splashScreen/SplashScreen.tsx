"use client";

import { gsap } from "gsap/gsap-core";
import { SplitText } from "gsap/all";
import type { SanityColor } from "../../app/(site)/[slug]/page";

gsap.registerPlugin(SplitText);

type SplashScreenProps = {
  /** Sanity: splashBlock.name */
  name?: string;
  /** Sanity: splashBlock.tagline */
  tagline?: string;
  /** Sanity: splashBlock.textColor - gäller både namn och tagline. */
  textColor?: SanityColor;
  /** Sanity: splashBlock.backgroundColor */
  backgroundColor?: SanityColor;
};

export default function SplashScreen({
  name,
  tagline,
  textColor,
  backgroundColor,
}: SplashScreenProps) {
  document.body.classList.add("no-scroll");

  return (
    <div
      className="splash-screen"
      style={{
        backgroundColor: backgroundColor?.hex,
        color: textColor?.hex,
      }}
    >
      <div className="splash-screen__stage">
        <h1 className="splash-screen__name">{name}</h1>
        <p className="splash-screen__tagline">{tagline}</p>
      </div>
    </div>
  );
}
