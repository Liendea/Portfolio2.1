//import ScrollCarousel from "./carousel/ScrollCarusel";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import ShowcaseList from "./projectList/ProjectList";

export type projectBlockType = {
  _type: "projectBlock";
  title: string;
  projectItems: projectItem[];
};

export type projectItem = {
  _type: "projectItem";
  title: string;
  jobDescription: string;
  projectDescription: string;
  stack: string;
  image: SanityImageSource;
  url: string;
};

type projectSectionProps = {
  projectBlock: projectBlockType;
};

// Denna komponent är ansvarig för att rendera projektsektionen på sidan.
// Den tar emot en projectBlock som innehåller information om projekten.

export default function ShowcaseSection({ projectBlock }: projectSectionProps) {
  return (
    <section className="showcase_section">
      <ShowcaseList projectItems={projectBlock.projectItems} />
    </section>
  );
}
