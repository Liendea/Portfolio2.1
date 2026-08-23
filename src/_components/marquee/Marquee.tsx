import type { ReactNode } from "react";

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
      className={["marquee", `marquee-${direction}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        <div className="marquee-set">{children}</div>
        {/* Duplicerad kopia för den sömlösa loopen - dold för skärmläsare */}
        <div className="marquee-set" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
