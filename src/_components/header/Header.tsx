"use client";
import Image from "next/image";
import Link from "next/link";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../sanity/lib/image";
import Navbar from "../navbar";
import { useState } from "react";
import ExploreButton from "../buttons/ExploreButton";
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
  backgroundColor,
  textColor,
  exploreText = "EXPLORE",
}: HeaderProps) {
  const desktopUrl = urlFor(logoDesktop).url();
  const mobileUrl = urlFor(logoMobile).url();
  const [showNavbar, setShowNavbar] = useState(false);

  const onExploreClick = () => {
    setShowNavbar((prev) => !prev);
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  return (
    <header
      style={{
        backgroundColor: backgroundColor?.hex || "",
        color: textColor?.hex || "#000",
      }}
    >
      <div className="header-container">
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

        <div className="button-wrapper">
          <ExploreButton
            buttonText={exploreText}
            onExploreClick={onExploreClick}
          />
        </div>

        {showNavbar && (
          <Navbar
            showNavbar={showNavbar}
            navigationLinks={navigationLinks}
            closeNavbar={closeNavbar}
          />
        )}
      </div>
    </header>
  );
}
