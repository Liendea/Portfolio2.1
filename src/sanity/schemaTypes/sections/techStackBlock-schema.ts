import { defineType, defineField } from "sanity";

export default defineType({
  name: "techStackBlock",
  title: "Tech Stack List",
  type: "object",
  fields: [
    defineField({
      // NYTT FÄLT: Rubrik för sektionen
      name: "title",
      title: "Rubrik för sektionen",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "techStackItems",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "reference", to: [{ type: "techStackItem" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
