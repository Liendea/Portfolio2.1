"use client";

import { useRef } from "react";
import type { SanityColor } from "../../app/(site)/[slug]/page";
import { useCharGlitchIn } from "./useCharGlitchIn";

type H2_AnimationProps = {
  textToAnimate: string;
  color?: SanityColor;
};

export default function H2_Animation({
  textToAnimate,
  color,
}: H2_AnimationProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useCharGlitchIn(titleRef);

  return (
    <h2 ref={titleRef} className="page-title" style={{ color: color?.hex }}>
      {textToAnimate}
    </h2>
  );
}
