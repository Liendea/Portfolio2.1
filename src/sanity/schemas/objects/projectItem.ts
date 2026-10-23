import { defineField, defineType } from "sanity";
import { richTextBlock } from "./shared/richTextBlock";

export default defineType({
  name: "projectItem",
  title: "Project Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
    }),
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
      type: "array",
      of: [richTextBlock],
    }),
    defineField({ name: "url", title: "Project URL", type: "url" }),
    defineField({
      name: "media",
      title: "Media",
      type: "string",
      options: {
        list: [
          { title: "Video", value: "video" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "video",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.media !== "video",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.media !== "image",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
