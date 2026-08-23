import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactFormPayload = {
  needs?: string[];
  businessName?: string;
  budget?: string;
  location?: string;
  message?: string;
  name?: string;
  email?: string;
};

export async function POST(request: Request) {
  let body: ContactFormPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ogiltig förfrågan." },
      { status: 400 },
    );
  }

  const { needs, businessName, budget, location, message, name, email } =
    body ?? {};

  if (!name || !email) {
    return NextResponse.json(
      { error: "Namn och e-post krävs." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_FORM_RECIPIENT_EMAIL;

  if (!apiKey || !recipient) {
    // Formuläret är inte konfigurerat än (saknar env-variabler) - se
    // README/chatten för vilka som behöver läggas till i .env.local.
    console.error(
      "Kontaktformuläret saknar RESEND_API_KEY och/eller CONTACT_FORM_RECIPIENT_EMAIL.",
    );
    return NextResponse.json(
      { error: "Formuläret är inte konfigurerat än." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const needsList =
    Array.isArray(needs) && needs.length > 0 ? needs.join(", ") : "-";

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FORM_FROM_EMAIL || "onboarding@resend.dev",
      to: recipient,
      replyTo: email,
      subject: `Nytt kontaktformulär${businessName ? ` – ${businessName}` : ""}`,
      text: [
        `Needs: ${needsList}`,
        `Business name: ${businessName || "-"}`,
        `Budget: ${budget || "-"}`,
        `Location: ${location || "-"}`,
        `Message: ${message || "-"}`,
        `Name: ${name}`,
        `Email: ${email}`,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend kunde inte skicka mailet:", error);
      return NextResponse.json(
        { error: "Kunde inte skicka meddelandet." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Kunde inte skicka kontaktformulär:", error);
    return NextResponse.json(
      { error: "Kunde inte skicka meddelandet." },
      { status: 500 },
    );
  }
}
