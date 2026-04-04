"use client";

import { gsap } from "gsap/gsap-core";
import { SplitText } from "gsap/all";
import { useEffect } from "react";

gsap.registerPlugin(SplitText);

export default function H1_Animation({
  textToAnimate,
}: {
  textToAnimate: string;
}) {
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

  return <h2 className="page-title">{textToAnimate}</h2>;
}
