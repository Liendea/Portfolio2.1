import { defineType, defineField } from "sanity";

// Universell rad: text + valfri länk ELLER fil. Används för kontakt, CV, sociala länkar osv.
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
      name: "linkType",
      title: "Typ av länk",
      type: "string",
      options: {
        list: [
          { title: "Länk (sida, section eller URL)", value: "url" },
          { title: "Fil (PDF)", value: "file" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "url",
    }),
    defineField({
      name: "url",
      title: "Länk (Valfri)",
      type: "url",
      hidden: ({ parent }) => parent?.linkType === "file",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
          allowRelative: true,
        }),
      description:
        "Sida på siten: /about, /contact, /showcase. Section: /about#values. Extern länk: https://... Mejl/telefon: mailto:email@exempel.com eller tel:+46701234567.",
    }),
    defineField({
      name: "file",
      title: "Fil",
      type: "file",
      description: "PDF som öppnas i ny flik när man klickar på länken.",
      options: { accept: "application/pdf" },
      hidden: ({ parent }) => parent?.linkType !== "file",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === "file" && !value?.asset) {
            return "Välj en fil eller byt typ till Länk.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "displayText",
      url: "url",
      linkType: "linkType",
      fileName: "file.asset.originalFilename",
    },
    prepare({ title, url, linkType, fileName }) {
      return {
        title,
        subtitle: linkType === "file" ? `📄 ${fileName ?? "ingen fil vald"}` : url,
      };
    },
  },
});
