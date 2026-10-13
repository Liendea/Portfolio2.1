import { defineType, defineField } from "sanity";

// En kolumn i en länklista: rubrik + rader. Flera av dessa läggs i
// linkListBlock.columns för att renderas sida vid sida i samma section.
export default defineType({
  name: "linkColumn",
  title: "Länkkolumn",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title (Rubrik)",
      type: "string",
    }),
    defineField({
      name: "links",
      title: "Länkar",
      type: "array",
      description: "Lägg till rad/rader",
      of: [{ type: "linkLine" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links }) {
      return {
        title: title || "Länkkolumn",
        subtitle: `${links?.length ?? 0} länk(ar)`,
      };
    },
  },
});
