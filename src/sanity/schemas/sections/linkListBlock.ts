import { defineType, defineField } from "sanity";

export default defineType({
  name: "linkListBlock",
  title: "Länklista",
  type: "object",
  fields: [
    defineField({
      name: "columns",
      title: "Kolumner",
      description:
        "Varje kolumn har en egen rubrik + länkar och renderas sida vid sida i samma section (flexbox).",
      type: "array",
      of: [{ type: "linkColumn" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      columns: "columns",
    },
    prepare({ columns }) {
      return {
        title: "Länklista",
        subtitle: `${columns?.length ?? 0} kolumn(er)`,
      };
    },
  },
});
