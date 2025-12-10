import { defineType, defineField } from "sanity";

export default defineType({
  name: "projectBlock",
  title: "ProjectList",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title (Rubrik)",
      type: "string",
    }),
    defineField({
      name: "projects",
      title: "Project",
      type: "array",
      description: "Add projects",
      of: [
        {
          type: "reference",
          to: [{ type: "projectItem" }],
          title: "project",
        },
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

      // 2. CALCULATE THE LENGTH IN THE PREPARE FUNCTION
      const count = projectItems?.length || 0;

      return {
        title: title,
        // 3. Use the calculated count
        subtitle: `Projektlista (${count} projekt)`,
      };
    },
  },
});
