import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";

import ScrollCarousel from "@/src/components/projects/ScrollCarusel";

type PageBuilderSection = textBlockType | projectBlockType;

type projectPageData = {
  _id: string;
  title: string;
  slug: string;
  pageBuilder: PageBuilderSection[];
};

type textBlockType = {
  _type: "textBlock";
  pageTitle: string;
  ingress: string;
};

export type projectItem = {
  _type: "projectItem";
  title: string;
  description: string;
  image: SanityImageSource;
  url: string;
};

export type projectBlockType = {
  _type: "projectBlock";
  title: string;
  projectItems: projectItem[];
};

export default async function ProjectsPage() {
  const projectQuery = groq`
*[_type == "page" && slug.current == "projects"][0] { 
    _id, 
    title, 
    "slug": slug.current, 
    
    // Hämta hela Page Builder arrayen
    pageBuilder[] { ..., // Hämta alla syandardfält (inkl _key och _type)
    
    _type == "textBlock" => {
    pageTitle,
    ingress
    },
        _type == "projectBlock" => {
            title,
            "projectItems": projects[] -> {
           title,
           url,
           description,
           // Hämta hela bildobjektet, inklusive asset-referensen
                image,
            },  
        },
    }
}`;

  const projects: projectPageData = await client.fetch(projectQuery);

  return (
    <section className="project-section">
      {projects.pageBuilder?.map(
        (section: PageBuilderSection, index: number) => {
          switch (section._type) {
            case "textBlock":
              return (
                <div className="project-content" key={index}>
                  <h2 className="page-title">{section.pageTitle}</h2>
                  <p className="body-text">{section.ingress}</p>
                </div>
              );
            case "projectBlock":
              const projectBlock = section as projectBlockType;
              return <ScrollCarousel key={index} projectBlock={projectBlock} />;

            default:
              return null;
          }
        }
      )}
    </section>
  );
}
