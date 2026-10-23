"use client";

import styles from "../../Accordion.module.scss";
import RichText from "@/src/_components/richText/RichText";
import type { PortableTextBlock } from "next-sanity";

type AccordionItemProps = {
  title: string;
  text?: PortableTextBlock[];
  isOpen: boolean;
  onToggle: () => void;
};

export default function AccordionItem({
  title,
  text,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div
      className={`${styles.accordionItem}${isOpen ? ` ${styles.accordionItemOpen}` : ""}`}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
    >
      <div className={styles.accordionItemRow}>
        <h4 className={styles.accordionItemTitle}>{title}</h4>
        <span className={styles.accordionItemIcon} aria-hidden="true">
          <span
            className={`${styles.accordionItemIconLine} ${styles.accordionItemIconLineVertical}`}
          />
          <span
            className={`${styles.accordionItemIconLine} ${styles.accordionItemIconLineHorizontal}`}
          />
        </span>
      </div>

      <div className={styles.accordionItemContent}>
        <RichText className={styles.accordionItemText} value={text} />
      </div>
    </div>
  );
}
