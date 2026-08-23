import { type SchemaTypeDefinition } from "sanity";

import page from "./page-schema";
// SETTINGS
import headerSettings from "./settings/headerSettings";
import footerSettings from "./settings/footerSettings";
import settings from "./settings/settings";
// SECTIONS
import techStackBlock from "./sections/techStackBlock";
import statsBlock from "./sections/statsBlock";
import projectBlock from "./sections/projectBlock";
import heroBlock from "./sections/heroBlock";
import splashBlock from "./sections/splashBlock";
import contactFormBlock from "./sections/contactFormBlock";
import spacer from "./sections/spacer";
import divider from "./sections/divider";
import linkListBlock from "./sections/linkListBlock";
import textBlock from "./sections/textBlock";
import accordionBlock from "./sections/accordionBlock";
// DOKUMENT (fristående, återanvändbara - refereras från sections)
import techStackList from "./documents/techStackList";
// OBJEKTS
import linkLine from "./objects/linkLine";
import linkColumn from "./objects/linkColumn";
import projectItem from "./objects/projectItem";
import accordionItem from "./objects/accordionItem";

export const schema: { types: SchemaTypeDefinition[] } = {
  // LÄGG TILL SKAPADE SCHEMAS HÄR
  types: [
    page,
    techStackList,
    projectBlock,
    projectItem,
    textBlock,
    techStackBlock,
    statsBlock,
    linkListBlock,
    linkLine,
    linkColumn,
    settings,
    heroBlock,
    splashBlock,
    contactFormBlock,
    headerSettings,
    footerSettings,
    spacer,
    divider,
    accordionBlock,
    accordionItem,
  ],
};
