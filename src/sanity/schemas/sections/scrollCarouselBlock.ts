import { defineType, defineField } from "sanity";

export default defineType({
  name: "scrollCarouselBlock",
  title: "Scroll Carousel",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Titel som visas ovanför karusellen",
    }),
    defineField({
      name: "projectBlock",
      title: "Project Block",
      type: "reference",
      to: [{ type: "projectBlock" }], // refererar till befintligt projectBlock
      description: "Välj vilket projectBlock som ska visas i karusellen",
    }),
    defineField({
      name: "carouselSettings",
      title: "Carousel Settings",
      type: "object",
      fields: [
        defineField({
          name: "autoplay",
          title: "Autoplay",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "itemsToShow",
          title: "Items to show",
          type: "number",
          initialValue: 3,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      projectBlockTitle: "projectBlock.title",
    },
    prepare({ title, projectBlockTitle }) {
      return {
        title: `Scroll Carousel: ${title || ""}`,
        subtitle: projectBlockTitle ? `Projects: ${projectBlockTitle}` : "",
      };
    },
  },
});
