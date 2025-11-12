import { forwardRef } from "react";
import Image, { StaticImageData } from "next/image";
import { projects } from "../../../../public/MOCKDATA/Projects";
import Button from "../Button";
import arrow from "../../../../public/icons/Arrows.svg";

interface Project {
  title: string;
  description: string;
  img: StaticImageData;
  url: string;
}

const ProjectPreview = forwardRef<HTMLDivElement>((_, ref) => {
  function handleOnClick(url: string) {
    window.open(url, "_blank");
  }

  // Visa endast två första projekten
  const featuredProjects = projects.slice(0, 2);

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
          <div key={index} className="project-card">
            <div className="project-img-wrapper">
              <Image
                className="project-img"
                src={project.img}
                alt={project.title}
                width={750}
                height={600}
                onClick={() => handleOnClick(project.url)}
              />
              <p className="project-title">{project.title}</p>
            </div>

            <div className="project-text">
              <p>UX/UI</p>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button>
        <span className="projects-button">
          See all projects
          <Image
            width={34}
            height={34}
            alt="arrow"
            src={arrow}
            className="button-arrow"
          />
        </span>
      </Button>
    </section>
  );
});

ProjectPreview.displayName = "ProjectPreview";
export default ProjectPreview;
