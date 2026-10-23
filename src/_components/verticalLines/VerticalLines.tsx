"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "./VerticalLines.module.scss";

const GAP = 6; // px mellan linjerna

// Toppar och dalar från vänster till höger, höjd 0–1.
// Lägg till, ta bort eller ändra punkter tills siluetten känns rätt.
const RIDGE = [
  0.4, 0.3, 0.4, 0.6, 0.55, 0.5, 0.5, 0.4, 0.6, 0.55, 0.7, 1, 0.9, 0.8, 0.75,
  0.6, 0.5, 0.6, 0.55, 0.4, 0.55, 0.45, 0.35,
];

// Höjd 0–1 för linje i av total, utläst från RIDGE.
function getHeight(i: number, total: number): number {
  if (total < 2) return RIDGE[0];

  // Var i bergskedjan den här linjen hamnar (0 till RIDGE.length - 1)
  const pos = (i / (total - 1)) * (RIDGE.length - 1);
  const from = Math.floor(pos);
  const to = Math.min(from + 1, RIDGE.length - 1);
  const t = pos - from;

  // Rak linje mellan två punkter ger spetsiga toppar, inte rundade
  return RIDGE[from] + (RIDGE[to] - RIDGE[from]) * t;
}

export default function VerticalLines() {
  // Startvärde som används på servern och vid första renderingen
  const [count, setCount] = useState(100);

  useEffect(() => {
    // window finns bara i webbläsaren, därför inuti useEffect
    const update = () => setCount(Math.floor(window.innerWidth / GAP) + 1);

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className={styles.flex} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={styles.line}
          style={{ "--h": getHeight(i, count) } as CSSProperties}
        />
      ))}
    </div>
  );
}
