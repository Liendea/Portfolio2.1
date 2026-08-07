import H2_Animation from "../../_components/textAnimations/H2_Animation";
import type { SanityColor } from "../../app/(site)/[slug]/page";

type IntroSectionProps = {
  section: {
    pageTitle: string;
    ingress: string;
    pageTitleColor: SanityColor;
    ingressColor: SanityColor;
  };
  /** true = dela ingress-texten på radbrytning till flera stycken (about-sidan) */
  splitParagraphs?: boolean;
};

export default function IntroSection({
  section,
  splitParagraphs = false,
}: IntroSectionProps) {
  return (
    <section
      className={splitParagraphs ? "intro-section about" : "intro-section"}
    >
      <H2_Animation
        textToAnimate={section.pageTitle}
        color={section.pageTitleColor}
      />

      {splitParagraphs ? (
        <div className="intro-paragraphs about">
          {section.ingress.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="intro-paragraph"
              style={{ color: section.ingressColor?.hex }}
            >
              <span className="paragraph-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="paragraph-text">{paragraph}</span>
            </p>
          ))}
        </div>
      ) : (
        <p className="body-text" style={{ color: section.ingressColor?.hex }}>
          {section.ingress}
        </p>
      )}
    </section>
  );
}
