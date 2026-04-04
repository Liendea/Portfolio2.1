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

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener no refferer"
      className="project-card-link-wrapper"
    >
      <div className="project-card">
        <p className="project-title">{title}</p>
        <div className="project-img-wrapper">
          <Image
            className="project-img"
            src={imageUrl}
            alt={title}
            width={width}
            height={height}
            loading="eager"
          />
        </div>

        <div className="project-text">
          {description?.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </a>
  );
}
