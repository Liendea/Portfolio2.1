import ScrollCarousel from "./carousel/ScrollCarusel";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import ProjectGrid from "./projectGrid/projectGrid";

export type projectBlockType = {
  _type: "projectBlock";
  title: string;
  projectItems: projectItem[];
};

export type projectItem = {
  _type: "projectItem";
  title: string;
  description: string;
  image: SanityImageSource;
  url: string;
};

type projectSectionProps = {
  projectBlock: projectBlockType;
};

// Denna komponent är ansvarig för att rendera projektsektionen på sidan.
// Den tar emot en projectBlock som innehåller information om projekten.

export default function ProjectSection({ projectBlock }: projectSectionProps) {
  return (
    <section className="project-section">
      <div className="desktop-only">
        <ProjectGrid projectItems={projectBlock.projectItems} />
      </div>
      <div className="mobile-only">
        <ScrollCarousel projectItems={projectBlock.projectItems} />
      </div>
    </section>
  );
}
