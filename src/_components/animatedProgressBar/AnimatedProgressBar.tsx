"use client";

import { useEffect, useState } from "react";

type AnimatedProgressBarProps = {
  percentage: number;
  fillColor: string;
  /** Stapeln står still på 0% tills denna är true (t.ex. styrt av en scroll-observer hos föräldern). */
  animate: boolean;
};

export default function AnimatedProgressBar({
  percentage,
  fillColor,
  animate,
}: AnimatedProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!animate) return;
    // Sätts till målvärdet på nästa frame, så CSS-transitionen nedan
    // faktiskt har något att animera mellan (0% -> målvärde).
    const frame = requestAnimationFrame(() => setWidth(percentage || 0));
    return () => cancelAnimationFrame(frame);
  }, [animate, percentage]);

  return (
    <div className="progress-wrapper">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${width}%`,
            background: fillColor,
            // 1.2s matchar durationen på AnimatedNumber-räknaren, så
            // stapel och siffra fylls i klart samtidigt.
            transition: "width 1.2s ease-out",
          }}
        />
      </div>
    </div>
  );
}
