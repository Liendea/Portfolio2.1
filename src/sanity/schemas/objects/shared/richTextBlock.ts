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
            description:
              'Extern adress med https:// (t.ex. "https://www.linkedin.com/in/…"), mailto: eller en sida på sajten som börjar med "/".',
            validation: (Rule) =>
              Rule.required()
                .uri({
                  allowRelative: true,
                  scheme: ["http", "https", "mailto"],
                })
                // allowRelative släpper igenom "www.linkedin.com/…", som
                // webbläsaren tolkar som en sökväg på den egna sajten.
                .custom((value) => {
                  if (!value) return true;
                  if (/^(https?:\/\/|mailto:|\/|#)/.test(value)) return true;
                  return 'Saknar https:// — skriv t.ex. "https://www.linkedin.com/…". Interna sidor börjar med "/".';
                }),
          }),
        ],
      },
    ],
  },
});
