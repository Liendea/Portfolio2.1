import TechStackList from "./stackList/StackList";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityColor } from "../../app/(site)/[slug]/page";
import styles from "./TechStack.module.scss";

type techStackBlockType = {
  _type: "techStackBlock";
  title: string;
  techStackItems: techStackItem[];
  backgroundColor?: SanityColor;
};

type techStackItem = {
  title: string;
  icon: SanityImageSource;
};

type techStackProps = {
  techStackBlock: techStackBlockType;
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
