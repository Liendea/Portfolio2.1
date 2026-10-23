import Link from "next/link";
import type { LinkListColumn, LinkItem } from "@/src/sanity/types/sanity";
import styles from "../../LinkList.module.scss";

function resolveHref(item: LinkItem) {
  // Gamla rader saknar linkType → behandlas som url
  if (item.linkType === "file") return item.fileUrl;
  return item.url;
}

export default function LinkListBlock({
  linkListBlock,
}: {
  linkListBlock: LinkListColumn;
}) {
  return (
    <div className={styles.linkListBlock}>
      <p className={styles.linkListTitle}>{linkListBlock.title}</p>
      <div className={styles.linkListItems}>
        {linkListBlock.links?.map((item, i) => {
          const href = resolveHref(item);

          if (!href) {
            return (
              <p key={i} className={styles.linkListItem}>
                {item.displayText}
              </p>
            );
          }

          // Intern sida/section → client-side navigation
          if (href.startsWith("/") || href.startsWith("#")) {
            return (
              <Link key={i} href={href} className={styles.linkListItem}>
                {item.displayText}
              </Link>
            );
          }

          // mailto/tel ska inte öppna en tom flik
          const isProtocolLink = /^(mailto|tel):/.test(href);

          return (
            <a
              key={i}
              href={href}
              className={styles.linkListItem}
              {...(!isProtocolLink && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {item.displayText}
            </a>
          );
        })}
      </div>
    </div>
  );
}
