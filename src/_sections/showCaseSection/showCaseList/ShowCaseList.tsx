"use client";

import { useState } from "react";
import type { projectItem } from "../../../app/(site)/[slug]/page";
import CaseItem from "@/src/_components/caseItem/CaseItem";

export default function ShowCaseList({
  projectItems,
}: {
  projectItems: projectItem[];
}) {
  // Accordion: bara ett case-item öppet åt gången. null = alla stängda.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="showcase_list">
      {projectItems?.map((item: projectItem, index: number) => (
        <>
          <CaseItem
            key={index}
            title={item.title}
            projectDescription={item.projectDescription}
            jobDescription={item.jobDescription}
            stack={item.stack}
            imageObject={item.image}
            width={3000}
            height={2250}
            url={item.url}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((prev) => (prev === index ? null : index))
            }
          />
          <span className="accordion-item__icon" aria-hidden="true">
            <span className="accordion-item__icon-line accordion-item__icon-line--vertical" />
            <span className="accordion-item__icon-line accordion-item__icon-line--horizontal" />
          </span>
        </>
      ))}
    </div>
  );
}
