import LinklistBlock from "./linkBlock/LinkBlock";

export type LinkItem = {
  displayText: string;
  url?: string;
};

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
    <section className="link-list-section">
      {linkListBlocks.map((block, i) => (
        <LinklistBlock key={i} linkListBlock={block} />
      ))}
    </section>
  );
}
