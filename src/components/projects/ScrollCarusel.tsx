"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type {
  projectBlockType,
  projectItem,
} from "../../app/(site)/projects/page";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

type ScrollCaruselProps = {
  projectBlock: projectBlockType;
};

export default function ScrollCarusel({ projectBlock }: ScrollCaruselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const cards = gsap.utils.toArray(".container", container);

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
      {projectBlock.projectItems.map((item: projectItem, index: number) => (
        <div key={index} className="container">
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
