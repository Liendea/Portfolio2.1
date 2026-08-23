import { defineType, defineField } from "sanity";

// Fristående, återanvändbart dokument. Skapas en gång i Studio och kan
// refereras från techStackBlock på hur många sidor du vill - redigerar du
// den här listan uppdateras alla sidor som pekar på den.
export default defineType({
  name: "techStackList",
  title: "Tech Stack-lista",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik för sektionen",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "techStackItems",
      title: "Tech Stack",
      description:
        "Dra och släpp flera ikoner samtidigt här. Titeln hämtas automatiskt från filnamnet.",
      type: "array",
      of: [{ type: "image" }], // ren image, inte inlindad i ett object -> Studio stödjer bulk-drag-and-drop
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
