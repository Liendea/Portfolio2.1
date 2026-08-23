import { groq } from "next-sanity";
import { client } from "@/src/sanity/lib/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import HeroSection from "@/src/_sections/heroSection/Index";
import SplashSection from "@/src/_sections/splashSection/Index";
import ContactFormSection from "@/src/_sections/contactFormSection/Index";
import ShowCaseSection from "@/src/_sections/showCaseSection/Index";
import StatisticSection from "@/src/_sections/statisticSection/Index";
import TechStackSection from "@/src/_sections/techStackSection/Index";
import LinkListSection from "@/src/_sections/linkListSection/Index";
import IntroSection from "@/src/_sections/introSection/Index";
import Spacer from "@/src/_components/spacer/Spacer";
import Divider from "@/src/_components/divider/Divider";
import AccordionSection from "@/src/_sections/accordionSection/Index";

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
      backgroundType: "video" | "image" | "color";
      backgroundMedia?: string;
      backgroundColor?: SanityColor;
      exploreText?: string;
      headingColor: SanityColor;
    }
  | {
      _type: "splashBlock";
      name: string;
      tagline?: string;
      textColor?: SanityColor;
      backgroundColor?: SanityColor;
    }
  | {
      _type: "contactFormBlock";
      needsLabel?: string;
      needsOptions?: string[];
      businessNameLabel?: string;
      businessNamePlaceholder?: string;
      budgetLabel?: string;
      budgetPlaceholder?: string;
      locationLabel?: string;
      locationPlaceholder?: string;
      messageLabel?: string;
      messagePlaceholder?: string;
      nameLabel?: string;
      namePlaceholder?: string;
      emailLabel?: string;
      emailPlaceholder?: string;
      submitButtonText?: string;
    }
  | {
      _type: "textBlock";
      pageTitle: string;
      ingress: string;
      pageTitleColor: SanityColor;
      ingressColor: SanityColor;
    }
  | { _type: "projectBlock"; title: string; projectItems: projectItem[] }
  | {
      _type: "techStackBlock";
      title: string;
      techStackItems: techStackItem[];
      backgroundColor?: SanityColor;
    }
  | {
      _type: "statsBlock";
      sectionTitle: string;
      githubUsername: string;
    }
  | {
      _type: "linkListBlock";
      columns: { title: string; links: LinkItem[] }[];
    }
  | { _type: "spacer"; size: "small" | "medium" | "large" }
  | {
      _type: "divider";
      layout: "full" | "centered";
      padding: "none" | "small" | "large";
    }
  | {
      _type: "accordionBlock";
      kickerLabel?: string;
      items?: { title: string; text?: string }[];
    };

export type LinkItem = {
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
  jobDescription: string;
  projectDescription: string;
  stack: string;
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
      backgroundType,
    "backgroundMedia": coalesce(backgroundVideo.asset->url, backgroundImage.asset->url),
      backgroundColor,
      headingColor,
    },
    _type == "splashBlock" => {
      name,
      tagline,
      textColor,
      backgroundColor,
    },
    _type == "contactFormBlock" => {
      needsLabel,
      needsOptions,
      businessNameLabel,
      businessNamePlaceholder,
      budgetLabel,
      budgetPlaceholder,
      locationLabel,
      locationPlaceholder,
      messageLabel,
      messagePlaceholder,
      nameLabel,
      namePlaceholder,
      emailLabel,
      emailPlaceholder,
      submitButtonText,
    },
    _type == "textBlock" => { pageTitle, ingress, pageTitleColor, ingressColor },
    _type == "projectBlock" => {
      title,
      "projectItems": projects[] {
        title,
        jobDescription,
        projectDescription,
        stack,
        image,
        url
      }
    },
    _type == "techStackBlock" => {
      "title": techStackList->title,
      "techStackItems": techStackList->techStackItems[]{
        "title": string::split(asset->originalFilename, ".")[0],
        "icon": @
      },
      backgroundColor
    },
    _type == "statsBlock" => { sectionTitle, githubUsername },
    _type == "linkListBlock" => {
      "columns": coalesce(columns[] { title, links[] { displayText, url } }, [])
    },
    _type == "spacer" => {size},
  _type == "divider" => {
  layout,
  padding
},
    _type == "accordionBlock" => {
      kickerLabel,
      "items": coalesce(items[] { title, text }, [])
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
              <HeroSection
                key={index}
                heading={section.heading}
                backgroundType={section.backgroundType}
                backgroundMedia={section.backgroundMedia}
                backgroundColor={section.backgroundColor}
                headingColor={section.headingColor}
              />
            );

          case "splashBlock":
            // BRAND-MOMENT (namn + tagline), egen sektion i pageBuilder
            return (
              <SplashSection
                key={index}
                name={section.name}
                tagline={section.tagline}
                textColor={section.textColor}
                backgroundColor={section.backgroundColor}
              />
            );

          case "contactFormBlock":
            return (
              // KONTAKTFORMULÄR - skickar till /api/contact-form (Resend)
              <ContactFormSection
                key={index}
                needsLabel={section.needsLabel}
                needsOptions={section.needsOptions}
                businessNameLabel={section.businessNameLabel}
                businessNamePlaceholder={section.businessNamePlaceholder}
                budgetLabel={section.budgetLabel}
                budgetPlaceholder={section.budgetPlaceholder}
                locationLabel={section.locationLabel}
                locationPlaceholder={section.locationPlaceholder}
                messageLabel={section.messageLabel}
                messagePlaceholder={section.messagePlaceholder}
                nameLabel={section.nameLabel}
                namePlaceholder={section.namePlaceholder}
                emailLabel={section.emailLabel}
                emailPlaceholder={section.emailPlaceholder}
                submitButtonText={section.submitButtonText}
              />
            );

          case "textBlock":
            // PAGE TITLE AND INGRESS (about-sidan delar ingress i flera stycken)
            return <IntroSection key={index} section={section} />;
          case "projectBlock":
            return (
              // PROJECT LIST SECTION
              <ShowCaseSection key={index} projectBlock={section} />
            );

          case "techStackBlock":
            return (
              // TECH STACK LIST SECTION
              <TechStackSection key={index} techStackBlock={section} />
            );

          case "statsBlock":
            return (
              // GITHUB STATS SECTION
              <StatisticSection key={index} statsBlock={section} />
            );

          case "linkListBlock":
            // LINK LIST SECTION (contact info, CV-länk osv.)
            // Kolumnerna definieras i Sanity och renderas sida vid sida.
            return (
              <LinkListSection key={index} linkListBlocks={section.columns} />
            );

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

          case "accordionBlock":
            // KLASSISKT ACCORDION (t.ex. "Our Values" på about-sidan)
            return (
              <AccordionSection
                key={index}
                kickerLabel={section.kickerLabel}
                items={section.items}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
