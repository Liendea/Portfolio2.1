"use client";

import type { projectItem } from "../../../app/(site)/[slug]/page";
import CaseItem from "@/src/_components/caseItem/CaseItem";

export default function ShowCaseList({
  projectItems,
}: {
  projectItems: projectItem[];
}) {
  return (
    <div className="showcase_list">
      {projectItems?.map((item: projectItem, index: number) => (
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
        />
      ))}
    </div>
  );
}
