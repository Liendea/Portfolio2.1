import { defineType, defineField } from "sanity";

export default defineType({
  name: "projectBlock",
  title: "Project List",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title (Rubrik)",
      type: "string",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      description: "Add projects",
      of: [
        { type: "projectItem" }, // <-- ändrat från reference till object
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      projectItems: "projects",
    },
    prepare(selection) {
      const { title, projectItems } = selection;
      const count = projectItems?.length || 0;
      return {
        title: title,
        subtitle: `Projektlista (${count} projekt)`,
      };
    },
  },
});
