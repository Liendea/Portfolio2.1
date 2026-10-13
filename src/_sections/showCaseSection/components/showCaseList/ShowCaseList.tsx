"use client";

import { useState } from "react";
import type { projectItem } from "@/src/app/(site)/[slug]/page";
import CaseItem from "../caseItem/CaseItem";
import styles from "../../Showcase.module.scss";

export default function ShowCaseList({
  projectItems,
}: {
  projectItems: projectItem[];
}) {
  // Accordion: bara ett case-item öppet åt gången. null = alla stängda.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.showcaseList}>
      {projectItems?.map((item: projectItem, index: number) => (
        <>
          <CaseItem
            key={index}
            title={item.title}
            projectDescription={item.projectDescription}
            jobDescription={item.jobDescription}
            stack={item.stack}
            imageObject={item.image}
            videoObject={item.video}
            width={3000}
            height={2250}
            url={item.url}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((prev) => (prev === index ? null : index))
            }
          />
          <span className={styles.accordionItemIcon} aria-hidden="true">
            <span
              className={`${styles.accordionItemIconLine} ${styles.accordionItemIconLineVertical}`}
            />
            <span
              className={`${styles.accordionItemIconLine} ${styles.accordionItemIconLineHorizontal}`}
            />
          </span>
        </>
      ))}
    </div>
  );
}
