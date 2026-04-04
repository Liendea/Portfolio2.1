"use client";
import H2_Animation from "../gsap/H2_Animation";
import type { SanityColor } from "../../app/(site)/[slug]/page";

type IntroSectionProps = {
  section: {
    pageTitle: string;
    ingress: string;
    pageTitleColor: SanityColor;
    ingressColor: SanityColor;
  };
};

export default function AboutParagraph({ section }: IntroSectionProps) {
  const paragraphs = section.ingress.split("\n");

  return (
    <section className="intro-section">
      <H2_Animation
        textToAnimate={section.pageTitle}
        color={section.pageTitleColor}
      />
      <div className="intro-paragraphs">
        {paragraphs.map((paragraph, index) => (
          <p key={index} style={{ color: section.ingressColor?.hex }}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
