import { defineType, defineField } from "sanity";
import { colorSwatches } from "../../lib/defaultColors";

export default defineType({
  name: "splashBlock",
  title: "Splash Screen",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Namn",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: 'Namnet som animeras in, t.ex. "Linda Bengtsson".',
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description:
        "Visas efter namnet (namnet sveper ut, taglinen sveper in på samma plats). Valfritt.",
    }),
    defineField({
      name: "textColor",
      title: "Textfärg",
      type: "color",
      description: "Gäller både namnet och taglinen.",
      options: {
        colorList: colorSwatches,
        disableAlpha: false,
      },
    }),
    defineField({
      name: "backgroundColor",
      title: "Bakgrundsfärg",
      type: "color",
      options: {
        colorList: colorSwatches,
        disableAlpha: false,
      },
    }),
  ],
  preview: {
    select: {
      name: "name",
    },
    prepare({ name }) {
      return {
        title: name ? `Splash Screen: ${name}` : "Splash Screen",
      };
    },
  },
});
