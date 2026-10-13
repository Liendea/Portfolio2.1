import type { ReactNode } from "react";
import styles from "./Marquee.module.scss";

type MarqueeProps = {
  children: ReactNode;
  direction?: "left" | "right";
  /** Sekunder för ett helt varv. Lägre värde = snabbare. */
  speed?: number;
  className?: string;
};

export default function Marquee({
  children,
  direction = "left",
  speed = 30,
  className,
}: MarqueeProps) {
  return (
    <div
      className={[
        styles.marquee,
        direction === "right" && styles.marqueeRight,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={styles.marqueeTrack}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className={styles.marqueeSet}>{children}</div>
        {/* Duplicerad kopia för den sömlösa loopen - dold för skärmläsare */}
        <div className={styles.marqueeSet} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
