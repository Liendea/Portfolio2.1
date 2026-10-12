import { defineType, defineField } from "sanity";

// Universell rad: text + valfri länk. Används för kontakt, CV, sociala länkar osv.
export default defineType({
  name: "linkLine",
  title: "Länkrad",
  type: "object",
  fields: [
    defineField({
      name: "displayText",
      title: "Visningstext (Required)",
      type: "string",
      description:
        'Texten som ska visas på sidan (t.ex. "mitt.namn@exempel.se" eller "Ladda ner CV").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "Email",
      title: "E-post (Valfri)",
      type: "string",
      description: "Ange epost email@exempel.com.",
    }),
    defineField({
      name: "url",
      title: "Länk (Valfri)",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
          allowRelative: true,
        }),
      description:
        "Länk till en sida på siten: ange /about, /contact eller /showcase (navigerar direkt utan att ladda om sidan). För extern länk: en vanlig URL (https://...). För mejl/telefon: mailto:email@exempel.com eller tel:+46701234567.",
    }),
  ],
  preview: {
    select: {
      title: "displayText",
      subtitle: "url",
    },
  },
});
