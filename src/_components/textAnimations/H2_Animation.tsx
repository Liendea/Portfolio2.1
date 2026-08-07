"use client";

import { gsap } from "gsap/gsap-core";
import { SplitText } from "gsap/all";
import { useEffect } from "react";
import type { SanityColor } from "../../app/(site)/[slug]/page";

gsap.registerPlugin(SplitText);

type H2_AnimationProps = {
  textToAnimate: string;
  color?: SanityColor;
};

export default function H2_Animation({
  textToAnimate,
  color,
}: H2_AnimationProps) {
  useEffect(() => {
    const split = SplitText.create(".page-title", {
      type: "chars, words, lines",
    });

    gsap.from(split.chars, {
      y: 100,
      autoAlpha: 0,
      stagger: {
        amount: 0.1,
        from: "end",
      },
    });
  }, []);

  return (
    <h2 className="page-title" style={{ color: color?.hex }}>
      {textToAnimate}
    </h2>
  );
}
