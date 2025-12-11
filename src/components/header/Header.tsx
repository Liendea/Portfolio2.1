import Image from "next/image";
import Link from "next/link";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../sanity/lib/image";

type NavLink = {
  title: string;
  href: string;
};

type HeaderProps = {
  logo: SanityImageSource; // Sanity image
  navigationLinks: NavLink[];
  backgroundColor?: string;
  textColor?: string;
};

export default function Header({
  logo,
  navigationLinks,
  backgroundColor,
  textColor,
}: HeaderProps) {
  const imageUrl = urlFor(logo).url();

  return (
    <header
      className="header"
      style={{
        backgroundColor: backgroundColor || "",
        color: textColor || "#000",
      }}
    >
      <div className="header-container">
        {logo && (
          <Link href="/">
            <Image src={imageUrl} alt="Logo" width={200} height={50} />
          </Link>
        )}

        <nav className="navigation">
          {navigationLinks?.map((link, i) => (
            <Link key={i} href={`/${link.href}`}>
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
