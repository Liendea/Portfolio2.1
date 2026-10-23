import LinklistBlock from "./components/linkBlock/LinkBlock";

import type { LinkListColumn } from "@/src/sanity/types/sanity";
import styles from "./LinkList.module.scss";

export default function LinkListSection({
  linkListBlocks,
}: {
  linkListBlocks: LinkListColumn[] | null;
}) {
  if (!linkListBlocks?.length) return null;

  return (
    <section className={styles.linkListSection}>
      {linkListBlocks.map((block, i) => (
        <LinklistBlock key={i} linkListBlock={block} />
      ))}
    </section>
  );
}
