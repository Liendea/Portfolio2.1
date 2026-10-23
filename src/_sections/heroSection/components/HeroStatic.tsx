import type { SanityColor } from "@/src/sanity/types/sanity";
import styles from "../Hero.module.scss";

type Props = { headingColor?: SanityColor };

// Mobil / reduced motion: inget animeras. Byt innehållet fritt.
export default function HeroStatic({ headingColor }: Props) {
  return (
    <div className={styles.mobileHero}>
      <div className={styles.mobileHeroTop}>
        <p>Specialized in</p>
        <h1 className={styles.heroSubText}>
          DEVELOPMENT <br />& DESIGN
        </h1>
      </div>
      <div className={styles.mobileHeroBottom}>
        <h1 className={styles.right} style={{ color: headingColor?.hex }}>
          WEBB
        </h1>
        <h1 className={styles.left} style={{ color: headingColor?.hex }}>
          FRONTEND
        </h1>
        <h1 className={styles.left} style={{ color: headingColor?.hex }}>
          BACKEND
        </h1>
        <h1 className={styles.center} style={{ color: headingColor?.hex }}>
          APP
        </h1>
        <h1 className={styles.left} style={{ color: headingColor?.hex }}>
          Branding
        </h1>
        <h1 className={styles.left} style={{ color: headingColor?.hex }}>
          UX design
        </h1>
        <h1 className={styles.right} style={{ color: headingColor?.hex }}>
          UI design
        </h1>
      </div>
    </div>
  );
}
