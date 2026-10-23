import H2_Animation from "../../_components/textAnimations/H2_Animation";
import type { TextBlock } from "@/src/sanity/types/sanity";
import styles from "./Intro.module.scss";

type IntroSectionProps = {
  section: TextBlock;
};

export default function IntroSection({ section }: IntroSectionProps) {
  return (
    <section className={styles.introSection}>
      <H2_Animation
        textToAnimate={section.pageTitle}
        color={section.pageTitleColor}
      />

      <p
        className={styles.bodyText}
        style={{ color: section.ingressColor?.hex }}
      >
        {section.ingress}
      </p>
    </section>
  );
}
