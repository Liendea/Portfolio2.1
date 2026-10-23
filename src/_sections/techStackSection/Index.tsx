import TechStackList from "./stackList/StackList";
import type { TechStackBlock } from "@/src/sanity/types/sanity";
import styles from "./TechStack.module.scss";

type techStackProps = {
  techStackBlock: TechStackBlock;
};

export default function TechStackSection({ techStackBlock }: techStackProps) {
  return (
    <section
      className={styles.techstackSection}
      style={{
        backgroundColor: techStackBlock.backgroundColor?.hex,
        overflow: "hidden",
      }}
    >
      <TechStackList techStackItems={techStackBlock.techStackItems} />
    </section>
  );
}
