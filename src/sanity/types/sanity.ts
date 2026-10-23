import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Typer för det som queries i sanity/lib/queries.ts returnerar.

/* ================= Gemensamma ================= */

export type SanityColor = {
  hex: string;
  alpha: number;
  hsl?: { h: number; s: number; l: number; a: number };
  hsv?: { h: number; s: number; v: number; a: number };
  rgb?: { r: number; g: number; b: number; a: number };
};

/* ================= Sektioner (pageBuilder) ================= */

export type HeroBlock = {
  _type: "heroBlock";
  heading: string;
  backgroundType: "video" | "image" | "color";
  backgroundMedia?: string;
  backgroundColor?: SanityColor;
  exploreText?: string;
  headingColor: SanityColor;
};

export type ContactFormBlock = {
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
};

export type TextBlock = {
  _type: "textBlock";
  pageTitle: string;
  ingress: string;
  pageTitleColor: SanityColor;
  ingressColor: SanityColor;
};

export type ProjectItem = {
  title: string;
  jobDescription: string;
  projectDescription?: PortableTextBlock[];
  stack: string;
  image: SanityImageSource;
  // Färdig fil-URL, löst i GROQ
  video?: string;
  url: string;
};

export type ProjectBlock = {
  _type: "projectBlock";
  title: string;
  kickerLabel?: string;
  projectItems: ProjectItem[];
};

export type TechStackItem = {
  title: string;
  icon: SanityImageSource;
};

export type TechStackBlock = {
  _type: "techStackBlock";
  title: string;
  techStackItems: TechStackItem[];
  backgroundColor?: SanityColor;
};

export type StatsBlock = {
  _type: "statsBlock";
  sectionTitle: string;
  githubUsername: string;
};

export type LinkItem = {
  displayText: string;
  linkType?: "url" | "file";
  url?: string;
  fileUrl?: string;
};

export type LinkListColumn = {
  title: string;
  links: LinkItem[];
};

export type LinkListBlock = {
  _type: "linkListBlock";
  columns: LinkListColumn[];
};

export type SpacerBlock = {
  _type: "spacer";
  size: "small" | "medium" | "large";
};

export type DividerBlock = {
  _type: "divider";
  layout: "full" | "centered";
  padding: "none" | "small" | "large";
};

export type AccordionItem = {
  title: string;
  text?: PortableTextBlock[];
};

export type AccordionBlock = {
  _type: "accordionBlock";
  kickerLabel?: string;
  items?: AccordionItem[];
};

export type PageBuilderSection =
  | HeroBlock
  | ContactFormBlock
  | TextBlock
  | ProjectBlock
  | TechStackBlock
  | StatsBlock
  | LinkListBlock
  | SpacerBlock
  | DividerBlock
  | AccordionBlock;

export type PageData = {
  _id: string;
  title: string;
  slug: string;
  pageBuilder?: PageBuilderSection[];
};

/* ================= Inställningar (header/footer) ================= */

export type NavLink = { title: string; href: string };

export type HeaderSettings = {
  logoDesktop: SanityImageSource;
  logoMobile: SanityImageSource;
  navigationLinks: NavLink[];
  backgroundColor?: SanityColor;
  textColor?: SanityColor;
  exploreText?: string;
};

export type FooterLinkItem = {
  displayText: string;
  url?: string;
};

export type FooterColumn = {
  title?: string;
  links?: FooterLinkItem[];
};

export type FooterSettings = {
  contactEmail?: string;
  columns?: FooterColumn[];
  copyright?: string;
  backgroundColor?: SanityColor;
  textColor?: SanityColor;
  logo?: SanityImageSource;
};

export type SiteSettings = {
  header: HeaderSettings;
  footer: FooterSettings;
};
