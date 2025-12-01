import arrow from "../../../public/icons/Arrows_dark.svg";
import ProjectCard from "../ProjectCard";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  url: string;
}

export default async function ProjectPreview({
  ref,
}: {
  ref?: React.Ref<HTMLElement>;
}) {
  // 1. GROQ-fråga för att hämta de 2 senaste projekten
  const featuredProjectsQuery = groq`
        *[_type == "project" && defined(mainImage)] {
            _id,
            title,
            description,
            url,
            // Hämta URL:en från Sanity
            "imageSrc": mainImage.asset->url, 
        } | order(_createdAt desc) [0..1]
    `;

  // 2. Hämta data
  const featuredProjects: Project[] = await client.fetch(featuredProjectsQuery);

  return (
    <section ref={ref} className="project-preview-section">
      <h4>Featured Projects</h4>
      <p className="body-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non magnam a
        facere libero mollitia voluptas amet. Et ipsa corrupti at doloribus
        dicta. Velit corrupti sit nesciunt! Aspernatur aperiam corporis nulla?
      </p>

      <div className="project-preview-grid">
        {featuredProjects.map((project: Project, index: number) => (
          <ProjectCard
            key={index}
            url={project.url}
            title={project.title}
            description={project.description}
            src={project.imageSrc}
            width={750}
            height={600}
          />
        ))}
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
