import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import { unstable_noStore as noStore } from "next/cache"; // <-- NY IMPORT
import StatsRenderer from "@/src/components/about/StatsRenderer";
import TechStackList from "@/src/components/about/TechStackList";

type PageBuilderSection = textBlockType | techStackBlockType | statsBlockType;

type AboutPageData = {
  _id: string;
  title: string;
  slug: string;
  pageBuilder: PageBuilderSection[];
};

type textBlockType = {
  _type: "textBlock";
  pageTitle: string;
  ingress: string;
};

type techStackBlockType = {
  _type: "techStackBlock";
  title: string;
  techStackItems: techStackItem[];
};

type techStackItem = {
  title: string;
  iconUrl: string;
};

type statsBlockType = {
  _type: "statsBlock";
  sectionTitle: string;
  githubUsername: string;
  wakatimeUsername?: string;
};

export default async function About() {
  noStore(); // <-- FÖRHINDRA CACHNING

  const aboutQuery = groq`
*[_type == "page" && slug.current == "about"][0] { 
    _id, 
    title, 
    "slug": slug.current, 
    
    // Hämta hela Page Builder arrayen
    pageBuilder[] { ..., // Hämta alla syandardfält (inkl _key och _type)
    
    _type == "textBlock" => {
    pageTitle,
    ingress
    },
        // Specifik hantering för 'techStackBlock' (som innehåller en referensarray)
        _type == "techStackBlock" => {
        title,

            "techStackItems": techStackItems[]->{ 
                title, 
                "iconUrl": icon.asset->url,
            }
        },
        _type == "statsBlock" => {
            sectionTitle,       
            githubUsername,      
            WakatimeUsername    
        },
    }
}`;

  const about: AboutPageData | null = await client.fetch(aboutQuery);
  console.log(about);

  // Hantera fallet att sidan inte hittas
  if (!about) {
    return <div>Sidan /about hittades inte.</div>;
  }

  return (
    <section className="about-section">
      {about.pageBuilder?.map((section: PageBuilderSection, index: number) => {
        switch (section._type) {
          case "textBlock":
            return (
              <div className="about-content" key={index}>
                <h2 className="page-title">{section.pageTitle}</h2>
                <p className="body-text">{section.ingress}</p>
              </div>
            );

          case "techStackBlock":
            return (
              <section className="tech-stack-section" key={index}>
                <TechStackList section={section as techStackBlockType} />
              </section>
            );

          case "statsBlock":
            return (
              <section className="stats-section" key={index}>
                <StatsRenderer section={section as statsBlockType} />
              </section>
            );
          default:
            return null;
        }
      })}
    </section>
  );
}
