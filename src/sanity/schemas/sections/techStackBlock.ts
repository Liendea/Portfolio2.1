import { defineType, defineField } from "sanity";

export default defineType({
  name: "techStackBlock",
  title: "Tech Stack List",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik för sektionen",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "techStackItems",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "techStackItem" }], // direkt object istället för reference
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
