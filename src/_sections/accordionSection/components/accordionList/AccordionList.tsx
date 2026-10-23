"use client";

import { useState } from "react";
import AccordionItem from "../accordionItem/AccordionItem";
import type { AccordionItem as AccordionItemData } from "@/src/sanity/types/sanity";
import styles from "../../Accordion.module.scss";

type AccordionListProps = {
  items: AccordionItemData[];
};

export default function AccordionList({ items }: AccordionListProps) {
  // Accordion: bara ett case-item öppet åt gången. null = alla stängda.
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
