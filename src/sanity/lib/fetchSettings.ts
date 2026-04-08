// lib/fetchSettings.ts
import { groq } from "next-sanity";
import { client } from "./client"; // din sanity client
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityColor } from "@/src/app/(site)/[slug]/page";

export type NavLink = { title: string; href: string };

export type HeaderSettings = {
  logoDesktop: SanityImageSource;
  logoMobile: SanityImageSource;
  navigationLinks: NavLink[];
  backgroundColor?: SanityColor;
  textColor?: SanityColor;
  exploreText?: string;
};

export type FooterSettings = {
  text?: string;
  links?: NavLink[];
  backgroundColor?: SanityColor;
  textColor?: SanityColor;
  logo?: SanityImageSource;
};

export type SiteSettings = {
  header: HeaderSettings;
  footer: FooterSettings;
};

export async function fetchSettings(): Promise<SiteSettings | null> {
  const query = groq`
    *[_type == "settings"][0]{
      "header": header {
    "logoDesktop": logoDesktop,
  "logoMobile": logoMobile,
        exploreText,
        navigationLinks,
        backgroundColor,
        textColor
      },
      "footer": footer {
        text,
        exploreLinks,
        socialLinks, 
        contactEmail,
        copyright,
        backgroundColor,
        textColor,
        logo
      }
    }
  `;
  return client.fetch(query);
}
