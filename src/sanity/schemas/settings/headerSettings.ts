import { defineType, defineField } from "sanity";
import { colorSwatches } from "../../lib/defaultColors";

export default defineType({
  name: "headerSettings",
  title: "Header Settings",
  type: "object",
  fields: [
    defineField({
      name: "logoDesktop",
      title: "Logo Desktop",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoMobile",
      title: "Logo Mobile",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "exploreText",
      title: "Explore Button Text",
      type: "string",
      initialValue: "EXPLORE",
    }),
    defineField({
      name: "navigationLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          name: "navLink",
          title: "Navigation Link",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: "ange slug för sidan som ska länkas till",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      options: {
        colorList: colorSwatches,
        disableAlpha: false,
      },
    }),
    defineField({
      name: "textColor",
      title: "Text Color",
      type: "color",
      options: {
        colorList: colorSwatches,
        disableAlpha: false,
      },
    }),
  ],
  preview: {
    select: { logo: "logoDesktop" },
    prepare(selection) {
      return { title: "Header Settings", media: selection.logo || undefined };
    },
  },
});
