import { defineType, defineField } from "sanity";
import { colorSwatches } from "../../lib/defaultColors";

export default defineType({
  name: "textBlock",
  title: "Text & Ingress",
  type: "object",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
    }),
    defineField({
      name: "pageTitleColor",
      title: "Page title Color",
      type: "color",
      options: {
        colorList: colorSwatches,
        disableAlpha: false, // Sätt till false om du vill ha transparency-val
      },
    }),
    defineField({
      name: "ingress",
      title: "Ingress",
      type: "text",
    }),
    defineField({
      name: "ingressColor",
      title: "Ingress Color",
      type: "color",
      options: {
        colorList: colorSwatches,
        disableAlpha: false, // Sätt till false om du vill ha transparency-val
      },
    }),
  ],
});
