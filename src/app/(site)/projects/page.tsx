import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import ProjectCard from "@/src/components/ProjectCard";

type Project = {
  _id: number;
  _type: "project";
  title: string;
  slug: string;
  description?: string;
  imageSrc: string;
  url: string;
};

export default async function ProjectsPage() {
  const projectsQuery = groq`
*[_type == "project"]
{
    _id, 
    title, 
    "slug":slug.current, 
    description, 
    url, 
    "imageSrc": mainImage.asset->url
}`;

  const projects: Project[] = await client.fetch(projectsQuery);

  return (
    <section className="project-section">
      <h2 className="page-title">Projects</h2>
      <p className="body-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            url={project.url}
            title={project.title}
            description={project.description}
            src={project.imageSrc}
            width={750}
            height={600}
          />
        ))}
      </div>
    </section>
  );
}
