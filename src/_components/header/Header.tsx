"use client";
import Image from "next/image";
import Link from "next/link";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../sanity/lib/image";
import Navbar from "../navbar/Navbar";

import type { SanityColor } from "../../app/(site)/[slug]/page";

type NavLink = {
  title: string;
  href: string;
};

type HeaderProps = {
  logoDesktop: SanityImageSource;
  logoMobile: SanityImageSource;
  navigationLinks: NavLink[];
  backgroundColor?: SanityColor | null;
  textColor?: SanityColor | null;
  exploreText?: string;
};

export default function Header({
  logoDesktop,
  logoMobile,
  navigationLinks,
}: HeaderProps) {
  const desktopUrl = urlFor(logoDesktop).url();
  const mobileUrl = urlFor(logoMobile).url();

  return (
    <header className="header-container">
      <Link href="/">
        <Image
          src={desktopUrl}
          alt="Logo"
          width={200}
          height={50}
          className="desktop-only"
        />
        <Image
          src={mobileUrl}
          alt="Logo"
          width={60}
          height={60}
          className="mobile-only"
        />
      </Link>

      <Navbar navigationLinks={navigationLinks} />
    </header>
  );
}
