import { type SchemaTypeDefinition } from "sanity";
import projectItem from "./sections/projectItem-schema";
import page from "./page-schema";
import techStackItem from "./sections/techStackItem-schema";
import techStackBlock from "./sections/techStackBlock-schema";
import textBlock from "./sections/textBlock-schema";
import statsBlock from "./sections/statsBlock-schema";
import contactBlock from "./sections/contactBlock-schema";
import projectBlock from "./sections/projectBlock-schema";
import contactLine from "./sections/contactLine-schema";

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
  ],
};
