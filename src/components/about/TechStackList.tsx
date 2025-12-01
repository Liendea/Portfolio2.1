import Image from "next/image";

type techStackBlockType = {
  _type: "techStackBlock";
  title: string;
  techStackItems: techStackItem[];
};

type techStackItem = {
  title: string;
  iconUrl: string;
};

type TechStackListProps = {
  section: techStackBlockType;
};

export default function TechStackList({ section }: TechStackListProps) {
  return (
    <>
      {" "}
      <h4>{section.title}</h4>
      <div className="tech-stack-list">
        {section.techStackItems?.map((stackItem: techStackItem) => (
          <div className="tech-stack-item" key={stackItem.title}>
            <Image
              className="stack-icon"
              src={stackItem.iconUrl}
              width="170"
              height="64"
              alt={stackItem.title}
            />
          </div>
        ))}
      </div>
    </>
  );
}
