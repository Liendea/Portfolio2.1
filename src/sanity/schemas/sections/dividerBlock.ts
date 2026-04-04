import { defineField, defineType } from "sanity";

export default defineType({
  name: "divider", // Detta namn använder vi i GROQ och PageBuilder
  title: "Divider",
  type: "object",
  fields: [
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Full Width", value: "full" },
          { title: "Centered (Small)", value: "centered" },
        ],
        layout: "radio",
      },
      initialValue: "full",
    }),
    defineField({
      name: "padding",
      title: "Vertical Spacing",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Small", value: "small" },
          { title: "Large", value: "large" },
        ],
      },
      initialValue: "small",
    }),
  ],
  preview: {
    select: {
      layout: "layout",
    },
    prepare({ layout }) {
      return {
        title: `--- Divider (${layout}) ---`,
      };
    },
  },
});
