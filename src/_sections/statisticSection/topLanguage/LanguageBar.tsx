"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedProgressBar from "@/src/_components/animatedProgressBar/AnimatedProgressBar";
import AnimatedNumber from "@/src/_components/animatedNumber/AnimatedNumber";

type TopLanguage = {
  name: string;
  size: number;
  percentage: number;
};

type LanguageBarProps = {
  topLanguages: TopLanguage[];
};

const getColorGradient = (index: number) => {
  const gradients = [
    { start: "#6fc0f2", end: "#00b5f1" }, // Blå (Ljus till mörk)
    { start: "#f6eeb1", end: "#d4bf13" }, // Gul (Ljus till mörk)
    { start: "#60b5ff", end: "#0e4068" }, // Ljusblå (Ljus till mörk)
    { start: "#f49f94", end: "#f46812" }, // Röd/Orange (Ljus till mörk)
    { start: "#f0bbf1", end: "#e328ea" }, // Lila (Ljus till mörk)
  ];
  return gradients[index % gradients.length];
};

export default function LanguageBar({ topLanguages }: LanguageBarProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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

  if (!topLanguages || topLanguages.length === 0) {
    return null;
  }

  return (
    <div className="language-bars" ref={containerRef}>
      {topLanguages.map((language, index) => {
        const { start, end } = getColorGradient(index);
        return (
          <div key={language.name} className="language-bar-row">
            <div className="language-bar-header">
              <span className="language-name">{language.name}</span>
              <span className="language-percentage">
                <AnimatedNumber
                  value={Math.round(language.percentage)}
                  animate={inView}
                  suffix="%"
                />
              </span>
            </div>
            <AnimatedProgressBar
              percentage={language.percentage}
              fillColor={`linear-gradient(90deg, ${start} 0%, ${end} 100%)`}
              animate={inView}
            />
          </div>
        );
      })}
    </div>
  );
}
