"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  /** Räknaren står still på startValue tills animate är true. */
  animate: boolean;
  /** Var räknaren börjar. Default 0. */
  startValue?: number;
  /** Millisekunder. Bör matcha transition-tiden på progress-baren den hör ihop med. */
  duration?: number;
  suffix?: string;
  /** T.ex. n => n.toLocaleString() för tusentalsavgränsare. */
  format?: (n: number) => string;
};

export default function AnimatedNumber({
  value,
  animate,
  startValue = 0,
  duration = 1200,
  suffix = "",
  format = (n) => String(n),
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(startValue);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!animate) return;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out - snabb start, långsammare avslut.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + eased * (value - startValue)));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [animate, value, startValue, duration]);

  return (
    <>
      {format(displayValue)}
      {suffix}
    </>
  );
}
