import Page from "./[slug]/page";

export default async function HomePage() {
  // Här kan du hämta en "home"-slug från Sanity, t.ex. "home"
  const slug = "home";

  return <Page params={{ slug }} />;
}
