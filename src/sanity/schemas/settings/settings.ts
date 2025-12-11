import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // HEADER GROUP
    defineField({
      name: "header",
      title: "Header Settings",
      type: "headerSettings",
      group: "header",
    }),

    // FOOTER GROUP
    defineField({
      name: "footer",
      title: "Footer Settings",
      type: "footerSettings",
      group: "footer",
    }),
  ],
  preview: {
    select: { headerLogo: "header.logo" },
    prepare({ headerLogo }) {
      return {
        title: "Site Settings",
        media: headerLogo,
      };
    },
  },
});
