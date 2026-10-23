"use client";

import { useEffect, useRef, useState } from "react";
import type { SanityColor } from "@/src/sanity/types/sanity";
import styles from "../Hero.module.scss";

// Utanför komponenten: skapas en gång, inte vid varje rendering,
// och behöver därför inte ligga i useEffects dependency-array.
const ROLES = ["FRONTEND", "FULLSTACK", "UX ", "UI", "APP"] as const;
const THRESHOLD = 50;

type Props = { headingColor?: SanityColor };

// Desktop: rollen byts när man scrollar med hjulet/trackpad.
export default function HeroRoleScroller({ headingColor }: Props) {
  const [index, setIndex] = useState(0);
  const scrollValue = useRef(0);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      scrollValue.current += event.deltaY;
      if (scrollValue.current > 1000) scrollValue.current = 0;

      setIndex(
        Math.floor(Math.abs(scrollValue.current / THRESHOLD)) % ROLES.length,
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const role = ROLES[index];

  return (
    <>
      <h1 className={styles.heroText} style={{ color: headingColor?.hex }}>
        <span key={role} className={styles.roleAnimation}>
          {role}
        </span>
      </h1>
      <h1 className={styles.heroSubText}>
        {role === "UX " || role === "UI" ? "DESIGN" : "DEVELOPMENT"}
      </h1>
    </>
  );
}
