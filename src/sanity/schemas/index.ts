import { type SchemaTypeDefinition } from "sanity";
import projectItem from "./objects/projectItem";
import page from "./page-schema";
import techStackItem from "./objects/techStackItem";
import techStackBlock from "./sections/techStackBlock";
import textBlock from "./sections/textBlock";
import statsBlock from "./sections/statsBlock";
import contactBlock from "./sections/contactBlock";
import projectBlock from "./sections/projectBlock";
import contactLine from "./objects/contactItem";
import headerSettings from "./settings/headerSettings";
import footerSettings from "./settings/footerSettings";
import settings from "./settings/settings";
import heroBlock from "./sections/heroBlock";

export const schema: { types: SchemaTypeDefinition[] } = {
  // LÄGG TILL SKAPADE SCHEMAS HÄR
  types: [
    page,
    projectBlock,
    projectItem,
    textBlock,
    techStackBlock,
    techStackItem,
    statsBlock,
    contactBlock,
    contactLine,
    settings,
    heroBlock,
    headerSettings,
    footerSettings,
  ],
};
