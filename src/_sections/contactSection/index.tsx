export type contactItem = {
  displayText: string;
  url?: string;
};

export default function ContactSection({
  contactBlock: section,
}: {
  contactBlock: { title: string; contactItems: contactItem[] };
}) {
  return (
    <section className="contact-section">
      <div className="contact-block">
        <p className="contact-title">{section.title}</p>
        <div className="contact-fields">
          {section.contactItems?.map((item, i) =>
            item.url ? (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-field"
              >
                {item.displayText}
              </a>
            ) : (
              <p key={i} className="contact-field">
                {item.displayText}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
