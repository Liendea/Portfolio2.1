import { defineField, defineType } from "sanity";

export default defineType({
  name: "spacer",
  title: "Spacer",
  type: "object",
  fields: [
    defineField({
      name: "size",
      title: "Storlek",
      type: "string",
      options: {
        list: [
          { title: "Small (32px)", value: "small" },
          { title: "Medium (64px)", value: "medium" },
          { title: "Large (128px)", value: "large" },
          { title: "X-Large (200px)", value: "xlarge" },
        ],
        layout: "radio", // Gör det enkelt att klicka i Sanity Studio
      },
      initialValue: "medium",
    }),
  ],
  preview: {
    select: {
      size: "size",
    },
    prepare({ size }) {
      return {
        title: `↔ Spacer: ${size.toUpperCase()}`,
        subtitle: "Tomt utrymme mellan block",
      };
    },
  },
});
