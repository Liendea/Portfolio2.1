"use client";

import { useState } from "react";
import AccordionItem from "../accordionItem/AccordionItem";
import styles from "../../Accordion.module.scss";

type AccordionListItem = {
  title: string;
  text?: string;
};

type AccordionListProps = {
  items: AccordionListItem[];
};

export default function AccordionList({ items }: AccordionListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.accordionList}>
      {items?.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          text={item.text}
          isOpen={openIndex === index}
          onToggle={() =>
            setOpenIndex((prev) => (prev === index ? null : index))
          }
        />
      ))}
    </div>
  );
}
