import TechStackList from "./stackList/StackList";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type techStackBlockType = {
  _type: "techStackBlock";
  title: string;
  techStackItems: techStackItem[];
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
    <section className="techstack-section">
      <TechStackList techStackItems={techStackBlock.techStackItems} />
    </section>
  );
}
