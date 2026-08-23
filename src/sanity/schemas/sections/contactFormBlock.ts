import { defineType, defineField } from "sanity";

// Kontaktformulär (single-page, se ContactFormSection.tsx). Alla frågor
// och platshållartexter är redigerbara här - själva utskicket sköts av
// /api/contact-form (Resend), inte av Sanity.
export default defineType({
  name: "contactFormBlock",
  title: "Kontaktformulär",
  type: "object",
  fields: [
    defineField({
      name: "needsLabel",
      title: "Needs - rubrik",
      type: "string",
      initialValue: "1. Needs",
    }),
    defineField({
      name: "needsOptions",
      title: "Needs - alternativ (kryssrutor)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "I need a (new) website",
        "I need help with branding",
        "I need a mobile application",
        "I want to collaborate on a project",
        "Other",
      ],
    }),
    defineField({
      name: "businessNameLabel",
      title: "Business name - fråga",
      type: "string",
      initialValue: "2. What is your business or organisation's name?",
    }),
    defineField({
      name: "businessNamePlaceholder",
      title: "Business name - platshållare",
      type: "string",
      initialValue: "Business name",
    }),
    defineField({
      name: "budgetLabel",
      title: "Budget - fråga",
      type: "string",
      initialValue: "3. What is your Budget?",
    }),
    defineField({
      name: "budgetPlaceholder",
      title: "Budget - platshållare",
      type: "string",
      initialValue: "Budget",
    }),
    defineField({
      name: "locationLabel",
      title: "Location - fråga",
      type: "string",
      initialValue: "Location",
    }),
    defineField({
      name: "locationPlaceholder",
      title: "Location - platshållare",
      type: "string",
      initialValue: "Location",
    }),
    defineField({
      name: "messageLabel",
      title: "Message - fråga",
      type: "string",
      initialValue: "4. Message",
    }),
    defineField({
      name: "messagePlaceholder",
      title: "Message - platshållare",
      type: "string",
      initialValue: "Message",
    }),
    defineField({
      name: "nameLabel",
      title: "Name - fråga",
      type: "string",
      initialValue: "5. Name",
    }),
    defineField({
      name: "namePlaceholder",
      title: "Name - platshållare",
      type: "string",
      initialValue: "Name",
    }),
    defineField({
      name: "emailLabel",
      title: "Email - fråga",
      type: "string",
      initialValue: "6. Email",
    }),
    defineField({
      name: "emailPlaceholder",
      title: "Email - platshållare",
      type: "string",
      initialValue: "Email",
    }),
    defineField({
      name: "submitButtonText",
      title: "Skicka-knapp - text",
      type: "string",
      initialValue: "Send",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Kontaktformulär" };
    },
  },
});
