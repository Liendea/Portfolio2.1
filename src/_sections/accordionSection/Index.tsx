import AccordionList from "./components/accordionList/AccordionList";
import styles from "./Accordion.module.scss";

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
    <section className={styles.accordionSection}>
      <p className={styles.accordionSectionKicker}>{kickerLabel}</p>
      <AccordionList items={items} />
    </section>
  );
}
