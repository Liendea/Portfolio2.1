import { groq } from "next-sanity";

// Alla GROQ-queries samlas här. Typerna för resultaten ligger i
// sanity/types/sanity.ts — ändras en projektion här måste typen följa med.

const heroBlockProjection = `
  heading,
  backgroundType,
  "backgroundMedia": coalesce(backgroundVideo.asset->url, backgroundImage.asset->url),
  backgroundColor,
  headingColor
`;

const contactFormBlockProjection = `
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
  submitButtonText
`;

// projectDescription är Portable Text — renderas av _components/richText.
const projectBlockProjection = `
  kickerLabel,
  "projectItems": projects[]{
    title,
    jobDescription,
    projectDescription,
    stack,
    image,
    "video": video.asset->url,
    url
  }
`;

// Teknikerna ligger i ett eget dokument (techStackList) som sektionen
// refererar till. Titeln på varje ikon tas från filnamnet.
const techStackBlockProjection = `
  "title": techStackList->title,
  "techStackItems": techStackList->techStackItems[]{
    "title": string::split(asset->originalFilename, ".")[0],
    "icon": @
  },
  backgroundColor
`;

const linkListBlockProjection = `
  "columns": coalesce(columns[]{
    title,
    links[]{
      displayText,
      linkType,
      url,
      "fileUrl": file.asset->url
    }
  }, [])
`;

const accordionBlockProjection = `
  kickerLabel,
  "items": coalesce(items[]{ title, text }, [])
`;

// Projektion för pageBuilder-arrayen. Varje sektionstyp får sin egen gren
// (`_type == "x" => {...}`) så att referenser och filer dereferens bara där
// de behövs.
const pageBuilderProjection = `
  ...,
  _type == "heroBlock" => { ${heroBlockProjection} },
  _type == "contactFormBlock" => { ${contactFormBlockProjection} },
  _type == "textBlock" => { pageTitle, ingress, pageTitleColor, ingressColor },
  _type == "projectBlock" => { ${projectBlockProjection} },
  _type == "techStackBlock" => { ${techStackBlockProjection} },
  _type == "statsBlock" => { sectionTitle, githubUsername },
  _type == "linkListBlock" => { ${linkListBlockProjection} },
  _type == "spacer" => { size },
  _type == "divider" => { layout, padding },
  _type == "accordionBlock" => { ${accordionBlockProjection} }
`;

export const pageBySlugQuery = groq`
*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  pageBuilder[]{ ${pageBuilderProjection} }
}
`;

export const siteSettingsQuery = groq`
*[_type == "settings"][0]{
  "header": header{
    logoDesktop,
    logoMobile,
    exploreText,
    navigationLinks,
    backgroundColor,
    textColor
  },
  "footer": footer{
    contactEmail,
    "columns": coalesce(columns[]{ title, links[]{ displayText, url } }, []),
    copyright,
    backgroundColor,
    textColor,
    logo
  }
}
`;
