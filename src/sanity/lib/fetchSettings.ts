// lib/fetchSettings.ts
import { groq } from "next-sanity";
import { client } from "./client"; // din sanity client
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type NavLink = { title: string; href: string };

export type HeaderSettings = {
  logo: SanityImageSource;
  navigationLinks: NavLink[];
  backgroundColor?: string;
  textColor?: string;
};

export type FooterSettings = {
  text?: string;
  links?: NavLink[];
  backgroundColor?: string;
  textColor?: string;
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
        logo,
        navigationLinks,
        backgroundColor,
        textColor
      },
      "footer": footer {
        text,
        links,
        backgroundColor,
        textColor,
        logo
      }
    }
  `;
  return client.fetch(query);
}
