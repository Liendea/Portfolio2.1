export type LinkItem = {
  displayText: string;
  url?: string;
};

export default function LinkListBlock({
  linkListBlock,
}: {
  linkListBlock: { title: string; links: LinkItem[] };
}) {
  return (
    <section className="link-list-section">
      <div className="link-list-block">
        <p className="link-list-title">{linkListBlock.title}</p>
        <div className="link-list-items">
          {linkListBlock.links?.map((item, i) =>
            item.url ? (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-list-item"
              >
                {item.displayText}
              </a>
            ) : (
              <p key={i} className="link-list-item">
                {item.displayText}
              </p>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
