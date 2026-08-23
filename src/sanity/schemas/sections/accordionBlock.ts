import { defineField, defineType } from "sanity";

export default defineType({
  name: "accordionBlock", // Detta namn använder vi i GROQ och PageBuilder
  title: "Accordion",
  type: "object",
  fields: [
    defineField({
      name: "kickerLabel",
      title: "Liten rubrik ovanför (t.ex. OUR VALUES)",
      type: "string",
      initialValue: "OUR VALUES",
    }),
    defineField({
      name: "items",
      title: "Punkter",
      type: "array",
      of: [{ type: "accordionItem" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      kickerLabel: "kickerLabel",
      items: "items",
    },
    prepare({ kickerLabel, items }) {
      return {
        title: `Accordion – ${kickerLabel || "Untitled"}`,
        subtitle: `${items?.length || 0} punkter`,
      };
    },
  },
});
