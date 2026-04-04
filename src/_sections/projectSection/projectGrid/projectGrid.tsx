"use client";

import ProjectCard from "../../../_components/projectCard/ProjectCard";
import type { projectItem } from "../../../app/(site)/[slug]/page";

export default function ProjectGrid({
  projectItems,
}: {
  projectItems: projectItem[];
}) {
  return (
    <div className="project-grid">
      {projectItems?.map((item: projectItem, index: number) => (
        <ProjectCard
          key={index}
          url={item.url}
          title={item.title}
          description={item.description}
          imageObject={item.image}
          width={3000}
          height={2250}
        />
      ))}
    </div>
  );
}
