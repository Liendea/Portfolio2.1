"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import type { projectItem } from "../../app/(site)/[slug]/page";

gsap.registerPlugin(ScrollTrigger);

export type projectBlockType = {
  _type: "projectBlock";
  title: string;
  projectItems: projectItem[];
};

type ScrollCarouselProps = {
  projectBlock: projectBlockType;
};

export default function ScrollCarousel({ projectBlock }: ScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!projectBlock?.projectItems || projectBlock.projectItems.length === 0)
      return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const cards = gsap.utils.toArray(".project-card-container", container);

      if (!cards || cards.length === 0) return;

      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          start: "top top",
          end: `+=${cards.length * window.innerHeight}`,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projectBlock]);

  return (
    <div ref={containerRef} className="project-carousel">
      {projectBlock.projectItems.map((item, index) => (
        <div key={index} className="project-card-container">
          <ProjectCard
            url={item.url}
            title={item.title}
            description={item.description}
            imageObject={item.image}
            width={1000}
            height={750}
          />
        </div>
      ))}
    </div>
  );
}
