import { defineType, defineField } from "sanity";

export default defineType({
  name: "statsBlock",
  title: "Statistik Modul",
  type: "object",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Rubrik för sektionen",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "githubUsername",
      title: "GitHub Username",
      type: "string",
      description: "Används för att hämta commit- och repostatistik.",
      validation: (Rule) => Rule.required(), // Denna rubrik är viktig
    }),
    defineField({
      name: "wakatimeUsername",
      title: "Wakatime Username",
      type: "string",
      description: "Används för att hämta kodningstid (WakaTime).",
    }),
  ],
  // Valfritt: Lägg till en preview för att se rubriken i Page Builder-listan
  preview: {
    select: {
      title: "sectionTitle",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: "Statistik (GitHub/WakaTime)",
      };
    },
  },
});
