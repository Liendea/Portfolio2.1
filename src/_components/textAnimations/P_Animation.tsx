"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type P_AnimationProps = {
  textToAnimate?: string;
  color?: string;
};

export default function P_Animation({
  textToAnimate,
  color,
}: P_AnimationProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.children,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, stagger: 0.04 },
    );
  }, [textToAnimate]);

  return (
    <p ref={ref} style={{ display: "flex" }} className="animated-text">
      {textToAnimate?.split("").map((c, i) => (
        <span key={i} style={{ color, whiteSpace: "pre" }}>
          {c}
        </span>
      ))}
    </p>
  );
}
