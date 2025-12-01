import { defineField, defineType } from "sanity";

export default defineType({
  name: "techStackItem",
  title: "Tech stack",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "IconImage",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
