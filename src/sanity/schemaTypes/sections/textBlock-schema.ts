import { defineType, defineField } from "sanity";

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
      name: "ingress",
      title: "Ingress",
      type: "text",
    }),
  ],
});
