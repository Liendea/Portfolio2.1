import { groq } from "next-sanity";
import { client } from "@/src/sanity/lib/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Hero from "@/src/_sections/heroSection/Index";
import ProjectSection from "@/src/_sections/projectSection/index";
import StatisticSection from "@/src/_sections/statisticSection/index";
import TechStackSection from "@/src/_sections/stackSection/index";
import ContactSection from "@/src/_sections/contactSection";
import IntroSection from "@/src/_sections/introSection/IntroSection";
import AboutParagraph from "@/src/_components/aboutParagraph";
import Spacer from "@/src/_components/spacer";
import Divider from "@/src/_components/divider";

export type SanityColor = {
  hex: string;
  alpha: number;
  hsl?: { h: number; s: number; l: number; a: number };
  hsv?: { h: number; s: number; v: number; a: number };
  rgb?: { r: number; g: number; b: number; a: number };
};

type PageBuilderSection =
  | {
      _type: "heroBlock";
      heading: string;
      subheading: string;
      backgroundType: "video" | "image" | "color";
      backgroundMedia?: string;
      backgroundColor?: SanityColor;
      exploreText?: string;
      headingColor: SanityColor;
      subheadingColor: SanityColor;
    }
  | {
      _type: "textBlock";
      pageTitle: string;
      ingress: string;
      pageTitleColor: SanityColor;
      ingressColor: SanityColor;
    }
  | { _type: "projectBlock"; title: string; projectItems: projectItem[] }
  | { _type: "techStackBlock"; title: string; techStackItems: techStackItem[] }
  | {
      _type: "statsBlock";
      sectionTitle: string;
      githubUsername: string;
      wakatimeUsername?: string;
    }
  | { _type: "contactBlock"; title: string; contactItems: contactItem[] }
  | { _type: "spacer"; size: "small" | "medium" | "large" }
  | {
      _type: "divider";
      layout: "full" | "centered";
      padding: "none" | "small" | "large";
    };

export type contactItem = {
  displayText: string;
  url?: string;
};

export type techStackItem = {
  title: string;
  icon: SanityImageSource;
};

export type projectItem = {
  _type: "projectItem";
  title: string;
  description: string;
  image: SanityImageSource;
  url: string;
};

type PageData = {
  _id: string;
  title: string;
  slug: string;
  pageBuilder: PageBuilderSection[];
};

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await props.params;
  const slug = rawSlug ? String(rawSlug).toLowerCase() : "home";

  const query = groq`
*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  pageBuilder[] {
    ...,
    _type == "heroBlock" => {
      heading,
      subheading,
      backgroundType,
    "backgroundMedia": coalesce(backgroundVideo.asset->url, backgroundImage.asset->url),
      backgroundColor,
      headingColor,
      subheadingColor,
    },
    _type == "textBlock" => { pageTitle, ingress, pageTitleColor, ingressColor },
    _type == "projectBlock" => { 
      title, 
      "projectItems": projects[] { 
        title, 
        description, 
        image, 
        url
      }
    },
    _type == "techStackBlock" => { 
      title, 
      "techStackItems": techStackItems[]{ 
        title, 
        icon, 
      } 
    },
    _type == "statsBlock" => { sectionTitle, githubUsername, wakatimeUsername },
    _type == "contactBlock" => { title, "contactItems": contactFields[] { displayText, url } },
    _type == "spacer" => {size},
  _type == "divider" => {
  layout,
  padding
},
  }
}
`;

  const page: PageData = await client.fetch(query, { slug: slug });

  if (!page) return <div>Page not found</div>;

  return (
    <div className="page-wrapper">
      {page.pageBuilder?.map((section, index) => {
        switch (section._type) {
          case "heroBlock":
            return (
              <Hero
                key={index}
                heading={section.heading}
                subheading={section.subheading}
                backgroundType={section.backgroundType}
                backgroundMedia={section.backgroundMedia}
                backgroundColor={section.backgroundColor}
                headingColor={section.headingColor}
                subheadingColor={section.subheadingColor}
              />
            );

          case "textBlock":
            if (slug === "about") {
              return (
                // ABOUT PAGE INTRO SECTION
                <AboutParagraph key={index} section={section} />
              );
            } else {
              return (
                // PAGE TITLE AND INGRESS
                <IntroSection key={index} section={section} />
              );
            }
          case "projectBlock":
            return (
              // PROJECT CAROUSEL
              <ProjectSection key={index} projectBlock={section} />
            );

          case "techStackBlock":
            return (
              // TECH STACK LIST SECTION
              <TechStackSection key={index} techStackBlock={section} />
            );

          case "statsBlock":
            return (
              // GIT HUB & WAKATIME STATS SECTION
              <StatisticSection key={index} statsBlock={section} />
            );

          case "contactBlock":
            // CONTACT SECTION
            return <ContactSection key={index} contactBlock={section} />;

          case "spacer":
            // SPACER SECTION
            return <Spacer key={index} size={section.size} />;

          case "divider":
            return (
              <Divider
                key={index}
                layout={section.layout}
                padding={section.padding}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
