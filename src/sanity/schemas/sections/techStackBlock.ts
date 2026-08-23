import { defineType, defineField } from "sanity";

export default defineType({
  name: "techStackBlock",
  title: "Tech Stack List",
  type: "object",
  fields: [
    defineField({
      name: "techStackList",
      title: "Tech Stack-lista",
      description:
        "Välj en delad Tech Stack-lista. Samma lista kan användas på flera sidor - redigerar du den uppdateras alla.",
      type: "reference",
      to: [{ type: "techStackList" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      options: {
        disableAlpha: false,
      },
    }),
  ],
  preview: {
    select: { title: "techStackList.title" },
    prepare({ title }) {
      return { title: `Tech Stack: ${title || "(ingen lista vald)"}` };
    },
  },
});
