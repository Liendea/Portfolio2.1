import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ProjectCardProps = {
  imageObject: SanityImageSource;
  title: string;
  description?: string;
  width: number;
  height: number;
  url: string;
};
export default function ProjectCard({
  imageObject,
  title,
  description,
  width,
  height,
  url,
}: ProjectCardProps) {
  const imageUrl = urlFor(imageObject)
    .width(width)
    .height(height)
    .quality(100)
    .url();

  console.log(imageUrl);
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
            src={imageUrl}
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
