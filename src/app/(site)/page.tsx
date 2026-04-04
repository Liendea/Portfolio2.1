import Page from "./[slug]/page";

export default async function HomePage() {
  const slugValue = "home";
  const params = Promise.resolve({ slug: slugValue });
  return <Page params={params} />;
}
