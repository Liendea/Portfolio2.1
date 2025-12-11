import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { fetchSettings } from "../../sanity/lib/fetchSettings";

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
