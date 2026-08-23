import { defineField, defineType } from "sanity";

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
      type: "text",
      rows: 4,
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
