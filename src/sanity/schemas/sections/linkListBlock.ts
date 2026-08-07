import { defineType, defineField } from "sanity";

export default defineType({
  name: "linkListBlock",
  title: "Länklista",
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
      of: [
        {
          type: "linkLine",
        },
      ],
    }),
  ],
});
