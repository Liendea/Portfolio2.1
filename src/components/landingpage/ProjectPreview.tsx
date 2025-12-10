import arrow from "../../../public/icons/Arrows_dark.svg";
import ProjectCard from "../projects/ProjectCard";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

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

type projectItem = {
  _type: "projectItem";
  title: string;
  description: string;
  image: SanityImageSource;
  url: string;
};

type projectBlockType = {
  _type: "projectBlock";
  title: string;
  projectItems: projectItem[];
};

export default async function ProjectPreview() {
  // 1. GROQ-fråga för att hämta de 2 senaste projekten
  const featuredProjectsQuery = groq`
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

  // 2. Hämta data
  const featuredProjects: projectPageData = await client.fetch(
    featuredProjectsQuery
  );

  return (
    <section className="project-preview-section">
      <h4>Featured Projects</h4>
      <p className="body-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non magnam a
        facere libero mollitia voluptas amet. Et ipsa corrupti at doloribus
        dicta. Velit corrupti sit nesciunt! Aspernatur aperiam corporis nulla?
      </p>

      <div className="project-preview-grid">
        {featuredProjects.pageBuilder.map(
          (section: PageBuilderSection, index: number) => {
            switch (section._type) {
              case "projectBlock":
                // Type Assertion för att undvika TS-fel vid åtkomst av unika fält
                const projectBlock = section as projectBlockType;
                return (
                  <div key={index} className="project-grid">
                    {projectBlock.projectItems
                      .slice(0 - 2)
                      .map((item: projectItem, index: number) => (
                        <ProjectCard
                          key={index}
                          url={item.url}
                          title={item.title}
                          description={item.description}
                          imageObject={item.image}
                          width={500}
                          height={375}
                        />
                      ))}
                  </div>
                );

              default:
                return null;
            }
          }
        )}
      </div>

      <Link href="/projects" className="button projects-button">
        See all projects
        <Image
          width={34}
          height={34}
          alt="arrow"
          src={arrow}
          className="button-arrow"
        />
      </Link>
    </section>
  );
}
