import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactBlock",
  title: "Contact Info",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title (Rubrik)",
      type: "string",
    }),
    defineField({
      name: "contactFields",
      title: "Contact Fields",
      type: "array",
      description: "Lägg till rad/rader",
      of: [
        {
          type: "contactLine",
        },
      ],
    }),
  ],
});
