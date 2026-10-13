import H2_Animation from "../../_components/textAnimations/H2_Animation";
import type { SanityColor } from "../../app/(site)/[slug]/page";
import styles from "./Intro.module.scss";

type IntroSectionProps = {
  section: {
    pageTitle: string;
    ingress: string;
    pageTitleColor: SanityColor;
    ingressColor: SanityColor;
  };
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
