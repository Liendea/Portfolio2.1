import { defineType, defineField } from "sanity";
import { colorSwatches } from "../../lib/defaultColors";

export default defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "object",
  fields: [
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
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: 'Visas som en egen "SAY HELLO / Send Email"-kolumn.',
    }),
    defineField({
      name: "columns",
      title: "Kolumner",
      type: "array",
      of: [{ type: "linkColumn" }],
      description:
        "Fria kolumner, t.ex. Location, Connect, Explore - samma struktur som länklistan på contact-sidan. Rader utan URL visas som vanlig text (t.ex. adressrader), rader med URL blir klickbara länkar.",
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
});
