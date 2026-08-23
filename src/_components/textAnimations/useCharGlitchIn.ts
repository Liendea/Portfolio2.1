"use client";

import { gsap } from "gsap/gsap-core";
import { SplitText } from "gsap/all";
import { useEffect, type RefObject } from "react";

gsap.registerPlugin(SplitText);

type CharGlitchOptions = {
  /** Total tidsspridning (s) mellan första och sista bokstavens start.
   * Längre text -> höj detta så det inte känns hoprusat. Default matchar
   * H2_Animation:s ursprungliga hastighet. */
  staggerAmount?: number;
  /** Skalar alla tweens (blink, fade-in, rättning). 1 = H2:s standard. */
  durationScale?: number;
};

/**
 * Delar upp texten i det givna elementet i bokstäver och kör in dem:
 * ~30% av bokstäverna får en glitch-behandling (spegelvända + blink),
 * resten fadas in normalt. Delad animation för H2_Animation och
 * P_Animation - splittas alltid på det egna elementet (ref), inte en
 * global klass, annars skulle alla instanser på sidan träffas av samma
 * SplitText-anrop.
 */
export function useCharGlitchIn(
  ref: RefObject<HTMLElement | null>,
  { staggerAmount = 0.15, durationScale = 1 }: CharGlitchOptions = {},
) {
  useEffect(() => {
    if (!ref.current) return;

    // "words, chars" (inte bara "chars") - annars äts mellanslagen mellan
    // ord upp av SplitText och orden klistras ihop. split.chars ger
    // fortfarande alla enskilda tecken att stagger:a.
    const split = SplitText.create(ref.current, { type: "words, chars" });

    const ctx = gsap.context(() => {
      const isGlitch = split.chars.map(() => Math.random() < 0.3);
      const glitchChars = split.chars.filter((_, i) => isGlitch[i]);
      const normalChars = split.chars.filter((_, i) => !isGlitch[i]);

      const tl = gsap.timeline();

      // Startlägen
      tl.set(glitchChars, { scaleX: -1, opacity: 0 }, 0);
      tl.set(normalChars, { opacity: 0, y: 20 }, 0);

      // Glitch-bokstäverna: "blinket" medan de är bakvända
      tl.to(
        glitchChars,
        {
          opacity: 1,
          duration: 0.06 * durationScale,
          repeat: 2,
          yoyo: true,
          stagger: { amount: staggerAmount, from: "end" },
        },
        0,
      );

      // Resten: vanlig mjuk infade, samtidigt som blinket
      tl.to(
        normalChars,
        {
          opacity: 1,
          y: 0,
          duration: 0.2 * durationScale,
          ease: "power2.out",
          stagger: { amount: staggerAmount, from: "end" },
        },
        0,
      );

      // Glitch-bokstäverna rättas till sist
      tl.to(
        glitchChars,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.15 * durationScale,
          ease: "power4.out",
          stagger: { amount: staggerAmount * (2 / 3), from: "end" },
        },
        "-=0.2",
      );
    });

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);
}
