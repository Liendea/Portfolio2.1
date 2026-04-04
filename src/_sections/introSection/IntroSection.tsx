import H2_Animation from "../../_components/gsap/H2_Animation";
import type { SanityColor } from "../../app/(site)/[slug]/page";

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
    <section className="intro-section">
      <H2_Animation
        textToAnimate={section.pageTitle}
        color={section.pageTitleColor}
      />
      <p className="body-text" style={{ color: section.ingressColor?.hex }}>
        {section.ingress}
      </p>
    </section>
  );
}
