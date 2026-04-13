"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../../../_components/projectCard/ProjectCard";
import type { projectItem } from "../../../app/(site)/[slug]/page";

gsap.registerPlugin(ScrollTrigger);

export type projectBlockType = {
  _type: "projectBlock";
  title: string;
  projectItems: projectItem[];
};

type ScrollCarouselProps = {
  projectItems: projectItem[];
};

export default function ScrollCarousel({ projectItems }: ScrollCarouselProps) {
  return (
    <div className="project-carousel">
      {projectItems?.map((item: projectItem, index: number) => (
        <div key={index} className="project-card-container">
          <ProjectCard
            url={item.url}
            title={item.title}
            description={item.description}
            imageObject={item.image}
            width={3000}
            height={2250}
          />
        </div>
      ))}
    </div>
  );
}
