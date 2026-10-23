import { defineField, defineType } from "sanity";
import { richTextBlock } from "./shared/richTextBlock";

export default defineType({
  name: "accordionItem",
  title: "Accordion Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [richTextBlock],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Accordion item",
      };
    },
  },
});
