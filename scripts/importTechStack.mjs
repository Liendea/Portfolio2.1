// Engångsscript: laddar upp alla ikoner i public/icons/tech och skapar/uppdaterar
// EN delad techStackList-dokument i Sanity, i ett enda anrop.
//
// Körs så: node --env-file=.env.local scripts/importTechStack.mjs
//
// Krav innan du kör:
// 1. Lägg till SANITY_API_WRITE_TOKEN=... i .env.local
//    (skapas på sanity.io/manage -> ditt projekt -> API -> Tokens -> Add token,
//    permission "Editor". Detta token ska ALDRIG ha NEXT_PUBLIC_-prefix.)
//
// Efter att scriptet körts: gå in i Studio, öppna vilken sida du vill, lägg
// till ett "Tech Stack List"-block i pageBuilder och välj den här listan som
// referens. Samma lista kan väljas på flera sidor - redigerar du listan
// (t.ex. kör scriptet igen) uppdateras alla sidor som pekar på den.

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

// Fast _id gör att scriptet kan köras om utan att skapa dubbletter -
// createOrReplace skriver bara över samma dokument igen.
const LIST_ID = "techStackList-main";
const LIST_TITLE = "Tech Stack";
const ICONS_DIR = path.resolve("public/icons/tech");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN saknas. Lägg till den i .env.local innan du kör scriptet.",
    );
  }

  const files = fs
    .readdirSync(ICONS_DIR)
    .filter((f) => !f.startsWith(".") && /\.(svg|png|jpg|jpeg|webp)$/i.test(f));

  console.log(`Hittade ${files.length} ikoner i ${ICONS_DIR}`);

  const items = [];
  for (const file of files) {
    console.log(`Laddar upp: ${file}`);
    const asset = await client.assets.upload(
      "image",
      fs.createReadStream(path.join(ICONS_DIR, file)),
      { filename: file },
    );

    // Titeln behövs inte här - GROQ-queryn läser den från
    // asset->originalFilename automatiskt vid hämtning.
    items.push({
      _type: "image",
      _key: randomUUID(),
      asset: { _type: "reference", _ref: asset._id },
    });
  }

  await client.createOrReplace({
    _id: LIST_ID,
    _type: "techStackList",
    title: LIST_TITLE,
    techStackItems: items,
  });

  console.log(
    `Klart! techStackList (_id: ${LIST_ID}) har nu ${items.length} items.`,
  );
  console.log(
    `Nästa steg: lägg till ett "Tech Stack List"-block på valfri sida i Studio och välj "${LIST_TITLE}" som referens.`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
