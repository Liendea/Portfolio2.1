import LinklistBlock from "./components/linkBlock/LinkBlock";

import type { LinkItem } from "@/src/app/(site)/[slug]/page";
import styles from "./LinkList.module.scss";

export type LinkListBlockData = {
  title: string;
  links: LinkItem[];
};

export default function LinkListSection({
  linkListBlocks,
}: {
  linkListBlocks: LinkListBlockData[] | null;
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
