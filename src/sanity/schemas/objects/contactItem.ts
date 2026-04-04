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
      name: "Email",
      title: "E-post (Valfri)",
      type: "string",
      description: "Ange epost email@exempel.com",
    }),
    defineField({
      name: "url",
      title: "Länk (Valfri)",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"], // Tillåt mailto här!
        }),
      description: "Ange mailto:email@exempel.com eller en vanlig URL.",
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
