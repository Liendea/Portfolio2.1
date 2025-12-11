import { defineType, defineField } from "sanity";

export default defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "object",
  fields: [
    defineField({
      name: "exploreLinks",
      title: "Explore Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "href", title: "URL", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "href", title: "URL", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Footer Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
    }),
  ],
});
