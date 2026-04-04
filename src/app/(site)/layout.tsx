import Header from "@/src/_components/header/Header";
import Footer from "@/src/_components/footer/Footer";
import { fetchSettings } from "@/src/sanity/lib/fetchSettings";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await fetchSettings();

  return (
    <>
      {settings?.header && <Header {...settings.header} />}

      <main>{children}</main>

      {settings?.footer && <Footer {...settings.footer} />}
    </>
  );
}
