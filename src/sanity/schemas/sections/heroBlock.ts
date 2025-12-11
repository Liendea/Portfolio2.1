import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroBlock",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
    }),
    defineField({
      name: "backgroundType",
      title: "Background Type",
      type: "string",
      options: {
        list: [
          { title: "Video", value: "video" },
          { title: "Image", value: "image" },
          { title: "Color", value: "color" },
        ],
        layout: "radio",
      },
      initialValue: "video",
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.backgroundType !== "video",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      hidden: ({ parent }) => parent?.backgroundType !== "image",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      hidden: ({ parent }) => parent?.backgroundType !== "color",
    }),
    defineField({
      name: "exploreText",
      title: "Explore Button Text",
      type: "string",
      initialValue: "EXPLORE",
    }),
  ],
});
