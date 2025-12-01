import Image from "next/image";

type ProjectCardProps = {
  src: string;
  title: string;
  description?: string;
  width: number;
  height: number;
  url: string;
};
export default function ProjectCard({
  src,
  title,
  description,
  width,
  height,
  url,
}: ProjectCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener no refferer"
      className="project-card-link-wrapper"
    >
      <div className="project-card">
        <div className="project-img-wrapper">
          <Image
            className="project-img"
            src={src}
            alt={title}
            width={width}
            height={height}
          />
          <p className="project-title">{title}</p>
        </div>

        <div className="project-text">
          <p>UX/UI</p>
          <p>{description}</p>
        </div>
      </div>
    </a>
  );
}
