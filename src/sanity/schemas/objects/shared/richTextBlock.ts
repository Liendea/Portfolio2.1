import { defineArrayMember, defineField } from "sanity";

// Snäv textredigerare: stycke, punktlista, fet och länk.
// Ändras något här måste _components/richText/RichText.tsx kunna rendera det.
export const richTextBlock = defineArrayMember({
  type: "block",
  styles: [{ title: "Normal", value: "normal" }],
  lists: [{ title: "Punktlista", value: "bullet" }],
  marks: {
    decorators: [{ title: "Fet", value: "strong" }],
    annotations: [
      {
        name: "link",
        title: "Länk",
        type: "object",
        fields: [
          defineField({
            name: "href",
            title: "Adress",
            type: "url",
            validation: (Rule) =>
              Rule.required().uri({
                allowRelative: true,
                scheme: ["http", "https", "mailto"],
              }),
          }),
        ],
      },
    ],
  },
});
