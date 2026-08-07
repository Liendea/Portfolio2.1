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
import spacer from "./sections/spacer";
import divider from "./sections/divider";
import linkListBlock from "./sections/linkListBlock";
import textBlock from "./sections/textBlock";
// DOKUMENT (fristående, återanvändbara - refereras från sections)
import techStackList from "./documents/techStackList";
// OBJEKTS
import linkLine from "./objects/linkLine";
import projectItem from "./objects/projectItem";

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
    settings,
    heroBlock,
    headerSettings,
    footerSettings,
    spacer,
    divider,
  ],
};
