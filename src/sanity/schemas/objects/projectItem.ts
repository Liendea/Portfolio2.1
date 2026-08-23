import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectItem",
  title: "Project Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "stack",
      title: "Stack & Tools",
      type: "text",
    }),
    defineField({
      name: "jobDescription",
      title: "Job Description",
      type: "text",
    }),
    defineField({
      name: "projectDescription",
      title: "Project Description",
      type: "text",
    }),
    defineField({ name: "url", title: "Project URL", type: "url" }),
    defineField({ name: "image", title: "Image", type: "image" }),
  ],
});
