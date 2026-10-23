import { client } from "@/src/sanity/lib/client";
import { pageBySlugQuery } from "@/src/sanity/lib/queries";
import type { PageData } from "@/src/sanity/types/sanity";
import HeroSection from "@/src/_sections/heroSection/Index";
import ContactFormSection from "@/src/_sections/contactFormSection/Index";
import ShowCaseSection from "@/src/_sections/showCaseSection/Index";
import StatisticSection from "@/src/_sections/statisticSection/Index";
import TechStackSection from "@/src/_sections/techStackSection/Index";
import LinkListSection from "@/src/_sections/linkListSection/Index";
import IntroSection from "@/src/_sections/introSection/Index";
import Spacer from "@/src/_components/spacer/Spacer";
import Divider from "@/src/_components/divider/Divider";
import AccordionSection from "@/src/_sections/accordionSection/Index";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await props.params;
  const slug = rawSlug ? String(rawSlug).toLowerCase() : "home";

  const page = await client.fetch<PageData | null>(pageBySlugQuery, {
    slug,
  });

  if (!page) return <div>Page not found</div>;

  return (
    <div className="page-wrapper">
      {page.pageBuilder?.map((section, index) => {
        switch (section._type) {
          case "heroBlock":
            return (
              <HeroSection
                key={index}
                heading={section.heading}
                backgroundType={section.backgroundType}
                backgroundMedia={section.backgroundMedia}
                backgroundColor={section.backgroundColor}
                headingColor={section.headingColor}
              />
            );

          case "contactFormBlock":
            return (
              // KONTAKTFORMULÄR - skickar till /api/contact-form (Resend)
              <ContactFormSection
                key={index}
                needsLabel={section.needsLabel}
                needsOptions={section.needsOptions}
                businessNameLabel={section.businessNameLabel}
                businessNamePlaceholder={section.businessNamePlaceholder}
                budgetLabel={section.budgetLabel}
                budgetPlaceholder={section.budgetPlaceholder}
                locationLabel={section.locationLabel}
                locationPlaceholder={section.locationPlaceholder}
                messageLabel={section.messageLabel}
                messagePlaceholder={section.messagePlaceholder}
                nameLabel={section.nameLabel}
                namePlaceholder={section.namePlaceholder}
                emailLabel={section.emailLabel}
                emailPlaceholder={section.emailPlaceholder}
                submitButtonText={section.submitButtonText}
              />
            );

          case "textBlock":
            // PAGE TITLE AND INGRESS (about-sidan delar ingress i flera stycken)
            return <IntroSection key={index} section={section} />;
          case "projectBlock":
            return (
              // PROJECT LIST SECTION
              <ShowCaseSection
                key={index}
                projectBlock={section}
                kickerLabel={section.kickerLabel}
              />
            );

          case "techStackBlock":
            return (
              // TECH STACK LIST SECTION
              <TechStackSection key={index} techStackBlock={section} />
            );

          case "statsBlock":
            return (
              // GITHUB STATS SECTION
              <StatisticSection key={index} statsBlock={section} />
            );

          case "linkListBlock":
            // LINK LIST SECTION (contact info, CV-länk osv.)
            // Kolumnerna definieras i Sanity och renderas sida vid sida.
            return (
              <LinkListSection key={index} linkListBlocks={section.columns} />
            );

          case "spacer":
            // SPACER SECTION
            return <Spacer key={index} size={section.size} />;

          case "divider":
            return (
              <Divider
                key={index}
                layout={section.layout}
                padding={section.padding}
              />
            );

          case "accordionBlock":
            // KLASSISKT ACCORDION (t.ex. "Our Values" på about-sidan)
            return (
              <AccordionSection
                key={index}
                kickerLabel={section.kickerLabel}
                items={section.items}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
