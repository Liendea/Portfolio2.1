import Link from "next/link";
import Image from "next/image";
import arrow from "../../../public/icons/Arrows_dark.svg";

export default function button() {
  return (
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
  );
}
