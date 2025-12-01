import { type SchemaTypeDefinition } from "sanity";
import project from "./project-schema";
import page from "./page-schema";
import techStackItem from "./sections/techStackItem-schema";
import techStackBlock from "./sections/techStackBlock-schema";
import textBlock from "./sections/textBlock-schema";
import statsBlock from "./sections/statsBlock-schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  // LÄGG TILL SKAPADE SCHEMAS HÄR
  types: [project, page, textBlock, techStackBlock, techStackItem, statsBlock],
};
