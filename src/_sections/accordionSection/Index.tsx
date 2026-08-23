import AccordionList from "./accordionList/AccordionList";

type AccordionItem = {
  title: string;
  text?: string;
};

type AccordionSectionProps = {
  kickerLabel?: string;
  items?: AccordionItem[];
};

export default function AccordionSection({
  kickerLabel = "OUR VALUES",
  items = [],
}: AccordionSectionProps) {
  return (
    <section className="accordion_section">
      <p className="accordion_section__kicker">{kickerLabel}</p>
      <AccordionList items={items} />
    </section>
  );
}
