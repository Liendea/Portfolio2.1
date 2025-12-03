import { defineType, defineField } from "sanity";

// 1. DEFINIERA DET REPETATIVA LÄNK-OBJEKTET
export default defineType({
  name: "contactLine",
  title: "Kontaktuppgift",
  type: "object",
  fields: [
    defineField({
      name: "displayText",
      title: "Visningstext (Required)",
      type: "string",
      description:
        'Texten som ska visas på sidan (t.ex. "mitt.namn@exempel.se").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Länk (Valfri)",
      type: "url",
      description:
        "Valfri länk (t.ex. mailto:email@exempel.com eller https://linkedin.com/in/...).",
    }),
  ],
  // Gör förhandsgranskningen i Studio snygg
  preview: {
    select: {
      title: "displayText",
      subtitle: "url",
    },
  },
});
