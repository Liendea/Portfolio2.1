import type { ProjectBlock } from "@/src/sanity/types/sanity";
import ShowCaseList from "./components/showCaseList/ShowCaseList";
import styles from "./Showcase.module.scss";

type projectSectionProps = {
  projectBlock: ProjectBlock;
  kickerLabel?: string;
};

// Denna komponent är ansvarig för att rendera projektsektionen på sidan.
// Den tar emot en projectBlock som innehåller information om projekten.

export default function ShowCaseSection({
  projectBlock,
  kickerLabel,
}: projectSectionProps) {
  return (
    <section className={styles.showcaseSection}>
      <p className={styles.kicker}>{kickerLabel}</p>
      <ShowCaseList projectItems={projectBlock.projectItems} />
    </section>
  );
}
