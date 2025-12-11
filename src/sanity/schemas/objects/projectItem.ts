import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectItem",
  title: "Project Item",
  type: "object", // <--- ändrat från document
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "url", title: "Project URL", type: "url" }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
    }),
    defineField({ name: "image", title: "Image", type: "image" }),
  ],
});
