"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedNumber from "@/src/_components/animatedNumber/AnimatedNumber";

type CommitCounterProps = {
  totalCommits: number;
  /** Hur många committer räknaren max animerar igenom, oavsett totalsumma. */
  countFrom?: number;
};

export default function CommitCounter({
  totalCommits,
  countFrom = 50,
}: CommitCounterProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Egen scroll-trigger, oberoende av språk-staplarnas observer.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // ska bara triggas en gång
        }
      },
      { threshold: 0.8 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Börjar countFrom committer under totalen istället för på 0 -
  // annars blir det en väldigt lång räknare för höga totalsummor.
  const startValue = Math.max(0, totalCommits - countFrom);

  return (
    <h2 ref={ref} className="animeradSiffra">
      <AnimatedNumber
        value={totalCommits}
        startValue={startValue}
        animate={inView}
        format={(n) => n.toLocaleString()}
      />
    </h2>
  );
}
