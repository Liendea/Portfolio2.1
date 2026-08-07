import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

type CaseItemProps = {
  imageObject: SanityImageSource;
  title: string;
  jobDescription?: string;
  projectDescription?: string;
  stack: string;
  width: number;
  height: number;
  url: string;
};
export default function CaseItem({
  imageObject,
  title,
  jobDescription,
  projectDescription,
  width,
  height,
  stack,
  url,
}: CaseItemProps) {
  const imageUrl = urlFor(imageObject)
    .width(width)
    .height(height)
    .quality(100)
    .url();

  return (
    <div className="case-item">
      <div className="case-item__flex-row">
        <p className="case-item__title">{title}</p>
        <div className="case-item__text">
          {jobDescription?.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>

      <div className="case-item__flex-row case-item__flex-row--hovered">
        <div className="case-item__flex-col">
          <p className="case-item__stack">{stack}</p>
          <p className="case-item__projectDescription">{projectDescription}</p>
          <Link
            href={url}
            target="_blank"
            rel="noopener norefferer"
            className="case-item__link"
          >
            <Image
              src="/icons/Arrow_right.svg"
              alt="Arrow"
              width={20}
              height={20}
            />
            <p className="case-item__link-text">View Project</p>
          </Link>
        </div>

        <div className="case-item__img-wrapper">
          <Image
            className="case-item__img"
            src={imageUrl}
            alt={title}
            width={width}
            height={height}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
