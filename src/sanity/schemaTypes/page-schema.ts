import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageBuilder",
      title: "Sections",
      type: "array",
      of: [
        { type: "textBlock" },
        { type: "techStackBlock" },
        { type: "statsBlock" },
        { type: "contactBlock" },
        { type: "projectBlock" },
        /*Lägg till fler sectioner här */
      ],
    }),
  ],
});
