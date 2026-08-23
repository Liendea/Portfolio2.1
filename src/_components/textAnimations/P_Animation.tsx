"use client";

import { useRef } from "react";
import { useCharGlitchIn } from "./useCharGlitchIn";

type P_AnimationProps = {
  textToAnimate?: string;
  color?: string;
};

export default function P_Animation({
  textToAnimate,
  color,
}: P_AnimationProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  // Längre text -> mer utspridd och långsammare animation än H2:s default.
  useCharGlitchIn(ref, { staggerAmount: 0.6, durationScale: 1.5 });

  return (
    <p ref={ref} className="animated-text" style={{ color }}>
      {textToAnimate}
    </p>
  );
}
