import { groq } from "next-sanity";
import { client } from "../../../sanity/lib/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Hero from "../../../components/landingpage/Hero";
import ScrollCarousel from "../../../components/projects/ScrollCarusel";
import GithubStats from "../../../components/about/GithubStatsRenderer";
import Wakatime from "../../../components/about/WakatimeStatsRenderer";
import TechStackList from "../../../components/about/TechStackList";
//import ProjectPreview from "../../components/landingpage/ProjectPreview";

type PageBuilderSection =
  | {
      _type: "heroBlock";
      heading: string;
      subheading: string;
      backgroundType: "video" | "image" | "color";
      backgroundMedia?: string;
      backgroundColor?: string;
      exploreText?: string;
    }
  | { _type: "textBlock"; pageTitle: string; ingress: string }
  | { _type: "projectBlock"; title: string; projectItems: projectItem[] }
  | { _type: "techStackBlock"; title: string; techStackItems: techStackItem[] }
  | {
      _type: "statsBlock";
      sectionTitle: string;
      githubUsername: string;
      wakatimeUsername?: string;
    }
  | { _type: "contactBlock"; title: string; contactItems: contactItem[] };

export type contactItem = {
  displayText: string;
  url?: string;
};

export type techStackItem = {
  title: string;
  iconUrl: string;
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
  console.log("rawslug är: ", rawSlug);
  console.log("hämtad slug från sanity", slug);

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
      exploreText
    },
    _type == "textBlock" => { pageTitle, ingress },
    _type == "projectBlock" => { 
      title, 
      "projectItems": projects[] -> { 
        title, 
        description, 
        image, 
        url 
      } 
    },
    _type == "techStackBlock" => { 
      title, 
      "techStackItems": techStackItems[]->{ 
        title, 
        "iconUrl": icon.asset->url 
      } 
    },
    _type == "statsBlock" => { sectionTitle, githubUsername, wakatimeUsername },
    _type == "contactBlock" => { title, "contactItems": contactFields[] { displayText, url } }
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
              />
            );

          case "textBlock":
            return (
              <div key={index}>
                <h2>{section.pageTitle}</h2>
                <p>{section.ingress}</p>
              </div>
            );

          case "projectBlock":
            return <ScrollCarousel key={index} projectBlock={section} />;

          case "techStackBlock":
            return <TechStackList key={index} section={section} />;

          case "statsBlock":
            return (
              <div key={index}>
                <GithubStats section={section} />
                {section.wakatimeUsername && <Wakatime />}
              </div>
            );

          case "contactBlock":
            return (
              <div key={index} className="contact-block">
                <p className="contact-title">{section.title}</p>
                <div className="contact-fields">
                  {section.contactItems?.map((item, i) =>
                    item.url ? (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-field"
                      >
                        {item.displayText}
                      </a>
                    ) : (
                      <p key={i} className="contact-field">
                        {item.displayText}
                      </p>
                    )
                  )}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
